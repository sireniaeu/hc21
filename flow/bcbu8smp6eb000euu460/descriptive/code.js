




//open tools menu
Window.sendKeys("%t");
//select options
Window.sendKeys("o");

//Select Env/Keyboard
Fields["tree_options_tree"].select("Environment/Quick*", {expand:true});
//List select Options
Fields["list_list"].select("Options");
//Cleanup
//Fields["tree_options_tree"].select("Env*");