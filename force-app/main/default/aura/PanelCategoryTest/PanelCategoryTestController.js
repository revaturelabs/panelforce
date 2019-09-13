({
    SaveALI : function(component, event, helper) {
        console.log('saveali');
        var action = component.get("c.saveALI");
        console.log('Its the v.repanel');
        var isChecked = component.find("alirepanel").get("v.value");
        console.log('saveALI' + component.get("v.category"));
        console.log('saveALI' + component.get("v.score"));
        console.log('saveALI repanel' + component.get("v.repanel"));
        console.log('saveALI' + component.get("v.comments"));
        //action.setStorable();
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