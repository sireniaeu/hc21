var task = Http.getAsync("http://sirenia.eu", {});
Debug.showDialog("Task done? "+task.done);
if(task.wait(10000)) {
  Debug.showDialog("Task done? "+task.done + " - "+task.result.status);
} else {
  Debug.showDialog("Task !done");
}