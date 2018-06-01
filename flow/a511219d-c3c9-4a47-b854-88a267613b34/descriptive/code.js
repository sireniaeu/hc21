var da = new Date();
var d = da.getDate();
var m = da.getMonth() + 1;
var y = da.getFullYear() - 2000;

Dialog.info('header',y, { 'timeout': 10 });
// d + " " + m + " " + 