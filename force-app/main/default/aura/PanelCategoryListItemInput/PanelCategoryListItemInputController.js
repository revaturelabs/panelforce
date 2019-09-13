({
    SaveALI : function(component, event, helper) {
        var action = component.get("c.saveALI");
        var isChecked = component.find("alirepanel").get("v.value");
     
        action.setParams({
            "ALIId" : component.get("v.category").Id,
            "score" : component.get("v.score"), 
            "repanel" : isChecked, 
            "comments" : component.get("v.comments")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                console.log('success');
            }
            else if (state === "INCOMPLETE") {
                console.log('incomplete');
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        $A.enqueueAction(action);
        
    },
})