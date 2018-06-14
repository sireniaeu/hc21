var j;


var args = {ref_no: Date.now(), add_to_address: true, remarks: (String('Something here. ') + String(Date.now())), items: [{name: 'One of these', amount: 1, price: 100}, {name: 'Two of these', amount: 2, price: 50}, {name: 'Some of those', amount: 1337, price: 33}]}, sendKeys = function(key) {
  Window['sendKeys'](key);
};
sendKeys('+^o');
Fields["btn_create_po"].click({});
sendKeys('{TAB}');
var j_list = [];
for (var j_index in j_list) {
  j = j_list[j_index];
}
