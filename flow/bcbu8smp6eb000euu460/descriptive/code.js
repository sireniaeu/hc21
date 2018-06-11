




//open tools menu
Window.sendKeys("%t");
//select options
Window.sendKeys("o");
Wait.forMilliseconds(1000);
//Select Env/Keyboard
Fields["tree_options_tree"].select("Environment/Quick*", {expand:true});
//List select Options
Fields["list_list"].select("Options");
// Deselect option ""
Window.sendKeys("-");
//Cleanup
//Fields["tree_options_tree"].select("Env*");