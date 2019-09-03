({
    callReturnAssessments : function(component, contactId) {
            var getReturnAssessments = component.get("c.returnAssessments");
            
            getReturnAssessments.setParams({
                contactId : contactId
            });
            getReturnAssessments.setCallback(this, function(response){
                
                var state = response.getState();
                console.log("Response: " + JSON.stringify(response.getReturnValue()));
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