var args = {ref_no: Date.now(), add_to_address: true, remarks: (String('Something here. ') + String(Date.now())), items: [{name: 'One of these', amount: 1, price: 100}, {name: 'Two of these', amount: 2, price: 50}, {name: 'Some of those', amount: 1337, price: 33}]}, sendKeys = function(key) {
  Window['sendKeys'](key);
};
sendKeys('+^o');
Fields["btn_create_po"].click({});
sendKeys('{TAB}');
for (var i = 0, item = null; i < args.length; ) {
  item = args.items[i];
  sendKeys('{TAB}');
  sendKeys(null);
  sendKeys('{TAB}');
  sendKeys('{TAB 3}');
}
