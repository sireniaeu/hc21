//My test flow
Fields["tree_sln_explorer"].highlight();
Fields["tree_sln_explorer"].click();
Wait.forMilliseconds(2000);
Debug.ger(Fields["tree_sln_explorer"].inspect({ reflectionDepth: 2 }));
