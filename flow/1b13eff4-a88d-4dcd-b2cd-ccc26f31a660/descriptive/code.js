var count = App.session().read('counter');
Debug.showDialog(count);
App.session().write('counter', 1);
