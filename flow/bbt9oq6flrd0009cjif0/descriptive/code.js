var reply = Http.post(
  "http://localhost:9009/v1/ContextAction/Perform/hello.hello.hello",
  "{'[eu.sirenia]Action.In.PsykAR.Cpr': '012345-176x'}", {
    headers: {
      'Authorization': "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwc3lrYXIiLCJleHAiOjEwMDAxNTI1NDI3Nzc2LCJpYXQiOjE1MjU0Mjc3NzcsImlzcyI6IkpvbmF0aGFuIC8gU2lyZW5pYSIsIm5hbWUiOiJGcmVkZHlzIHRva2VuIiwiZXB0cyI6WyJDb250ZXh0QWN0aW9uL1BlcmZvcm0vKiJdfQ.K49J5NM7d7hplizAyp60BkOdBBdqNoNeztQSPQSbA8hOJ8Cmr_na_blvG5iTB1QV8B6I0_gmSE1jhKLt6Edmlg"
    },
    contenttype: "application/json",
    timeout: 2000
  });
