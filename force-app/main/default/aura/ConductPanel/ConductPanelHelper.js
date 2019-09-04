({
    helperMethod : function() {
    },
    
    
    
    makeANewAssessmentRecord : function(component) {
        // calling apexMakeNewAssessementRecord
        var action = component.get("c.apexMakeNewAssessementRecord");
        // set parameters
        var contactId = component.get("v.recordId");
        action.setParams({
            "associateId" : contactId,
        });
        // set callback to handle response
        action.setCallback(this, function(responseFromApexController){
            // get the response state
            var state = responseFromApexController.getState();
            if(state == 'SUCCESS') {
                // set component value
                var results = responseFromApexController.getReturnValue();
                component.set("v.AssessmentId", results);
                console.log("Success: " + results);
                // reload data on page
                component.find("AssessmentLoader").reloadRecord(true);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // enqueue action
        $A.enqueueAction(action);
    },
    
    
    
    saveAssessment : function(component) {       
        component.find("AssessmentLoader").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS") {
                console.log("Success... Saved");
            } else {
                console.log("NOT able to saved...");
            }
        }));
    },
    
    
    
    setNewTimeForAssessment : function(component) {      
        // call apex to update assessment with current time
        var action = component.get("c.apexSetNewStartTime");
        // set parameters
        var assessmentId = component.get("v.AssessmentId");
        // debug
        console.log(assessmentId);
        action.setParams({
            "assessmentId" : assessmentId,
        });
        // set callback to handle response
        action.setCallback(this, function(responseFromApexController){
            // get the response state
            var state = responseFromApexController.getState();
            if(state == 'SUCCESS') {
                // set component value
                var results = responseFromApexController.getReturnValue();
                console.log("Success: " + results);
                // reload data on page
                component.find("AssessmentLoader").reloadRecord(true);
                console.log("Success: " + results);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // enqueue action
        $A.enqueueAction(action);    
    },   
    
    
})