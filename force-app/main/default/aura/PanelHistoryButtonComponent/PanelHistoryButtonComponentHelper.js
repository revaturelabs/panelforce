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
            else if (state === "ERROR"){
                console.log("ERROR");
            }
        });
        
        $A.enqueueAction(getReturnAssessments);
        
    },
})