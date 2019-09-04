({
    helperMethod : function() {
    },
    
    
    
    makeANewAssessmentRecord : function(component) {
        // calling apexMakeNewAssessementRecord
        var action = component.get("c.apexMakeNewAssessementRecord");
        // set parameters
        //  debug
        var contactId = component.get("v.recordId");
        console.log("recordID is " + contactId);
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
                // debug
                console.log("results is " + results);
                component.set("v.AssessmentId", results);
                // reload data on page
                component.find("AssessmentLoader").reloadRecord(true);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // enqueue action
        $A.enqueueAction(action);
        // reload data on page
        component.find("AssessmentLoader").reloadRecord(true);
    },
    
    
    
    saveAssessment : function(component) {       
        component.find("AssessmentLoader").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS") {
                console.log("Success... Saved");
            } else {
                console.log("NOT able to saved...");
            }
        }));
        // reload data on page
        component.find("AssessmentLoader").reloadRecord(true);
    },
    
    
    
})