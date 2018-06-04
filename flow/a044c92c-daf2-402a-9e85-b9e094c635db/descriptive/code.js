// Wrap in self-calling thunk to prevent memory leakage in global vars
(function() {

  var outputDirectory = "Z:\\Desktop";
  var baseFilePath = 'Z:\\Downloads\\Tradit 2017';
  var dirs = Fs.ls(baseFilePath + '\\*.xlsx', {
    deepMatch: true
  });

  function isPatientBeddedInSheet(sheet) {
    return sheet[0][0].indexOf('indlagt') >= 0;
  }

  function isPatientBedded(fileContents) {
    return isPatientBeddedInSheet(fileContents['Skema A3']);
  }

  var files = [];
  var orgsByName = {};
  var orgs = [];
  var rawDataDump = [];
  var specialQuestions = []; // 'Kongeindikator' - identify by text match
  var specialQuestionRegex = /.*god klinisk praksis.*/;

  // Group paths by organization (support multiple org folder levels)
  var pathRegex = /\\(.*)\\[^\\]+\.xlsx$/;

  function createFileObj(path) {
    pathRegex.lastIndex = 0;
    var match = path.substr(baseFilePath.length).match(pathRegex);
    if (match && match.length > 1) {
      var org = match[1];
      if (!orgsByName[org]) {
        orgsByName[org] = {
          files: [],
          name: org,
          questions: []
        };
        orgs.push(orgsByName[org]);
      }

      var contents = Excel.load(path, {});
      var file = {
        path: path,
        org: org,
        contents: contents,
        bedded: isPatientBedded(contents)
      };
      orgsByName[org].files.push(file);
      return file;
    }
    Notification.show('Error', 'Error', 'Failed to parse path ' + path, {});
    return null;
  }

  Notification.show('Info', 'Info', 'Indlæser ' + dirs.length + ' regneark. Dette kan tage noget tid...', {
    timeout: 60
  });

  var questions = [];

  var patientHeaderCol = 6;
  var patientSubjectCol = 6;
  var patientQuestionTextCol = patientHeaderCol + 1;
  var patientAnswerCol = patientQuestionTextCol + 1;
  var clinicalHeaderCol = 0;
  var clinicalSubjectCol = 0;
  var clinicalQuestionTextCol = clinicalHeaderCol + 1;
  var clinicalAnswerCol = clinicalQuestionTextCol + 1;

  function isHeaderRow(row) {
    // When there's only text on col 0 and 6, it's a header row
    for (var i = 0; i < row.length; i++) {
      if (i !== patientHeaderCol && i !== clinicalHeaderCol && row[i]) {
        return false;
      }
    }
    return row[patientHeaderCol] && row[clinicalHeaderCol];
  }

  function resetTotalCountsOnObject(obj) {
    obj.negativeAnswers = 0;
    obj.partialAnswers = 0;
    obj.positiveAnswers = 0;
    obj.irrelevantAnswers = 0;
    obj.totalAnswers = 0;
  }

  function addToTotalCounts(target, source) {
    target.negativeAnswers += source.negativeAnswers;
    target.partialAnswers += source.partialAnswers;
    target.positiveAnswers += source.positiveAnswers;
    target.irrelevantAnswers += source.irrelevantAnswers;
    target.totalAnswers += source.totalAnswers;
  }

  function addQuestion(question) {
    resetTotalCountsOnObject(question);
    questions.push(question);
  }

  function addQuestionFromRow(row, rowIdx, answerCol, questionTextCol, questionType, theme, isBedded, subject) {
    var question = {
      row: rowIdx,
      col: answerCol,
      descr: row[questionTextCol],
      type: questionType,
      theme: theme,
      bedded: isBedded,
      subject: subject
    };
    addQuestion(question);
    // Get hold of the 'kongeindikator'
    if (specialQuestionRegex.test(question.descr)) {
      specialQuestions.push({
        question: question,
        commentAnswers: []
      });
    }
  }
  
  function getQuestionsFromSheet(sheet, isBedded) {
    var currentIdx = 11; // This is where the questions start
    var lastIdx = isBedded ? 49 : 39; // This is where the questions stop
    // Rows which only contain text in columns 0 and 6 are header rows
    var lastClinicalHeader = '';
    var lastPatientHeader = '';
    var lastClinicalSubject = '';
    var lastPatientSubject = '';
    var questions = [];
    for (var idx = 11; idx < sheet.length && idx <= lastIdx; idx++) {
      var row = sheet[idx];
      if (isHeaderRow(row)) {
        lastClinicalHeader = sheet[idx][clinicalHeaderCol];
        lastPatientHeader = sheet[idx][patientHeaderCol];
        lastPatientSubject = lastPatientHeader;
        lastClinicalSubject = lastClinicalHeader;
      } else {
        // Try to parse out the questions
        if (row[clinicalSubjectCol]) {
          lastClinicalSubject = row[clinicalSubjectCol];
        }
        if (row[patientSubjectCol]) {
          lastPatientSubject = row[patientSubjectCol];
        }
        if (row[clinicalQuestionTextCol]) {
          addQuestionFromRow(row, idx, clinicalAnswerCol, clinicalQuestionTextCol, 'clinical', lastClinicalHeader, isBedded, lastClinicalSubject);
        }
        if (row[patientQuestionTextCol]) {
          addQuestionFromRow(row, idx, patientAnswerCol, patientQuestionTextCol, 'patient', lastPatientHeader, isBedded, lastPatientSubject);
        }
      }
    }
    return questions;
  }

  var beddedQuestionsFound = false;
  var nonBeddedQuestionsFound = false;

  for (var i = 0; i < dirs.length; i++) {
    var fileObj = createFileObj(dirs[i]);
    if (fileObj) {
      files.push(fileObj);
      // Get questions
      if (!beddedQuestionsFound && fileObj.bedded) {
        questions = questions.concat(getQuestionsFromSheet(fileObj.contents['Skema A3'], true));
        beddedQuestionsFound = true;
      }
      if (!nonBeddedQuestionsFound && !fileObj.bedded) {
        questions = questions.concat(getQuestionsFromSheet(fileObj.contents['Skema A3'], false));
        nonBeddedQuestionsFound = true;
      }
    }
  }
  if (!files || files.length == 0) {
    throw "No spreadsheet files (*.xlsx) found in " + baseFilePath + "!";
  }
  
  Notification.show('Info', 'Info', 'Fandt ' + questions.length + ' spørgsmål', {
    timeout: 5
  });

  /////////////////////////////////////
  ///////////////////////////////////// Gather answers for each question
  /////////////////////////////////////

  var warnings = []; // We collect warnings when we're not sure we collected an answer to the question in question
  function getAnswerForQuestionFromSheet(sheet, question, file) {
    if (sheet[question.row]) {
      var answerText = sheet[question.row][question.col];
      var questionText = sheet[question.row][question.col - 1];
      if (questionText.replace(/\?/g, '') !== question.descr.replace(/\?/g, '')) {
        warnings.push({
          message: 'Found unexpected question text',
          row: question.row,
          path: file.path,
          question: question.descr,
          fileQuestion: questionText,
          bedded: question.bedded
        });
        return;
      }
      var commentText = sheet[question.row][question.col + 1];
      if (answerText || commentText) {
        return {
          text: answerText,
          comment: commentText,
          file: file
        };
      }
    }
  }

  function getAnswerForQuestion(file, question) {
    return getAnswerForQuestionFromSheet(file.contents['Skema A3'], question, file) ||
      getAnswerForQuestionFromSheet(file.contents['Skema A4'], question, file);
  }

  function countAnswers(answers, text) {
    return answers.filter(function(a) {
      return a.text === text;
    }).length;
  }

  function getAnswersFromFiles(question, files) {
    var answers = [];
    for (var f = 0; f < files.length; f++) {
      var file = files[f];
      if (file.bedded === question.bedded) {
        var answer = getAnswerForQuestion(file, question) || null;
        if (answer) {
          answers.push(answer);
        }
      }
    }
    return answers;
  }

  Notification.show('Info', 'Info', 'Associerer spørgsmål med all deres svar', {
    timeout: 5
  });

  var totalCounts = {};
  resetTotalCountsOnObject(totalCounts);

  // Gather answers to questions per organization and do per organization counts
  for (var o = 0; o < orgs.length; o++) {
    var org = orgs[o];
    resetTotalCountsOnObject(org);
    org.answeredQuestions = questions.map(function(question) {
      var answers = getAnswersFromFiles(question, org.files);
      rawDataDump = rawDataDump.concat(answers.map(function(a) {
        return {
          org: org,
          question: question,
          answer: a
        };
      }));
      var answeredQuestion = {
        answers: answers,
        question: question,
        commentAnswers: answers.filter(function(a) {
          return a.comment;
        }),
        negativeAnswers: countAnswers(answers, "Ikke opfyldt"),
        partialAnswers: countAnswers(answers, "Delvist opfyldt"),
        positiveAnswers: countAnswers(answers, "Helt opfyldt"),
        irrelevantAnswers: countAnswers(answers, "Ikke relevant")
      };
      answeredQuestion.totalAnswers = answeredQuestion.negativeAnswers + answeredQuestion.partialAnswers + answeredQuestion.positiveAnswers;
      specialQuestions.filter(function(sq) {
        return sq.question === question;
      }).forEach(function(sq) {
        sq.commentAnswers = sq.commentAnswers.concat(answeredQuestion.commentAnswers);
      });
      addToTotalCounts(org, answeredQuestion);
      addToTotalCounts(question, answeredQuestion);
      return answeredQuestion;
    });
  }

  /////////////////////////////////////
  ///////////////////////////////////// Write to out.xlsx
  /////////////////////////////////////

  function printBedded(bedded) {
    return bedded ? "Indlagt" : "Ambulant";
  }

  function formatRawAnswerDump() {
    return [
      ["Tema", "Emne", "Indlagt?", "Spørgsmål", "Type", "Svar", "Afdeling", "Kommentar"]
    ].concat(rawDataDump.map(function(d) {
      return [d.question.theme, d.question.subject, printBedded(d.question.bedded), d.question.descr, d.question.type, d.answer.text, d.org.name, d.answer.comment];
    }));
  }

  function formatOutputQuestions(questions) {
    return [
      ["Tema", "Emne", "Indlagt?", "Spørgsmål", "Type", "Antal svar", "Negativ", "Partiel", "Positiv", "Irrelevant"]
    ].concat(questions.map(function(question) {
      return [question.theme, question.subject, printBedded(question.bedded), question.descr, question.type, question.totalAnswers, question.negativeAnswers, question.partialAnswers, question.positiveAnswers, question.irrelevantAnswers];
    }));
  }

  function formatOutputQuestionsForOrg(answeredQuestions) {
    return [
      ["Tema", "Emne", "Indlagt?", "Spørgsmål", "Type", "Antal svar", "Negativ", "Partiel", "Positiv", "Irrelevant"]
    ].concat(answeredQuestions.map(function(aq) {
      return [aq.question.theme, aq.question.subject, printBedded(aq.question.bedded), aq.question.descr, aq.question.type, aq.totalAnswers, aq.negativeAnswers, aq.partialAnswers, aq.positiveAnswers, aq.irrelevantAnswers];
    }));
  }

  function formatWarnings(warnings) {
    return [
      ["Besked", "Fil", "Række", "Forv. spm", "Spørgsmål", "Indlægning?"]
    ].concat(warnings.map(function(w) {
      return [w.message, w.path, w.row, w.question, w.fileQuestion, printBedded(w.bedded)];
    }));
  }

  function flattenArrays(arrays) {
    return [].concat.apply([], arrays);
  }

  function formatSpecialQuestionAnswers(specialQuestions) {
    return [
      ["Kommentar", "Svar", "Afdeling", "Indlagt?", "Spørgsmål"]
    ].concat(flattenArrays(specialQuestions.map(function(sq) {
      return sq.commentAnswers.map(function(ca) {
        return [ca.comment, ca.text, ca.file.org, printBedded(sq.question.bedded), sq.question.descr];
      });
    })));
  }

  function formatComments() {
    var commentAnswers = flattenArrays(orgs.map(function(o) {
      return flattenArrays(o.answeredQuestions.map(function(aq) {
        return aq.commentAnswers.map(function(a) {
          return {
            descr: aq.question.descr,
            answerText: a.text,
            path: a.file.path,
            org: o.name,
            comment: a.comment
          };
        });
      }));
    }));
    return [
      ["Spørgsmål", "Svar", "Kommentar", "Afdeling", "Fil"]
    ].concat(commentAnswers.map(function(ca) {
      return [ca.descr, ca.answerText, ca.comment, ca.org, ca.path];
    }));
  }

  var outputFile = outputDirectory + "\\results-" + Guid.get() + ".xlsx";
  // Write to the output
  Excel.updateCells(outputFile, "Alle svar", "A1", formatRawAnswerDump());
  Excel.updateCells(outputFile, "Alle afd", "A1", formatOutputQuestions(questions));
  Excel.updateCells(outputFile, "Konge", "A1", formatSpecialQuestionAnswers(specialQuestions));
  Excel.updateCells(outputFile, "Kommentarer", "A1", formatComments());
  Excel.updateCells(outputFile, "Advarsler", "A1", formatWarnings(warnings));
  for (var o = 0; o < orgs.length; o++) {
    var org = orgs[o];
    Excel.updateCells(outputFile, org.name, "A1", formatOutputQuestionsForOrg(org.answeredQuestions));
  }

  if (warnings.length > 0) {
    Notification.show('Warn', 'Warn', 'Advarsler blev skrevet til "Advarsler" arket', {});
  }

  Notification.show('Info', 'Info', 'Skrev til ' + outputFile, {
    timeout: 5
  });

  /////////////////////////////////////
  ///////////////////////////////////// Html output functionality
  /////////////////////////////////////

  function groupByProperty(things, propertyName) {
    var groups = {};
    for (var i = 0; i < things.length; i++) {
      var thing = things[i];
      var propVal = thing[propertyName];
      if (!groups[propVal]) {
        groups[propVal] = [];
      }
      groups[propVal].push(thing);
    }
  }

  function generateQuestionHtml() {

  }

  function generateSubjectHtml() {

  }

  function generateThemeHtml(themeName, questions) {
    var markup = "<div class='theme'><h2>" + themeName + "</h2><div class=''>SUBJECTS</div></div>";
    var subjectsMarkup = "";

    return markup.replace("SUBJECTS", subjectsMarkup);
  }

  function generateSectionHtml(questions, headerText) {
    var markup = "<section><h1>" + headerText + "</h1><div class='themes'>THEMES</div></section>";
    var questionsByTheme = groupByProperty(questions, "theme");

    var themesMarkup = "";
    for (var themeName in questionsByTheme) {
      themesMarkup += generateThemeHtml(themeName, questionsByTheme[themeName]);
    }
    return markup.replace("THEMES", themesMarkup);
  }

})();
