({
    callReturnAssessments : function(component, contactId, assessment) {
        //grabs the method from AssessmentController
        var getReturnAssessments = component.get("c.returnAssessments");
        
        //Takes a contact Id and the current assessment as a parameter
        getReturnAssessments.setParams({
            contactId : contactId,
            assessment : assessment
        });
        getReturnAssessments.setCallback(this, function(response){
            
            var state = response.getState();
            if(state === "SUCCESS"){
                //Sets the failed panel categories to the component
                component.set("v.failedPanels", response.getReturnValue());
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
        
        $A.enqueueAction(getReturnAssessments);
        
    },
})