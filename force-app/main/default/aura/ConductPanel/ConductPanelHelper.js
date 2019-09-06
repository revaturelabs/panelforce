({
    helperMethod : function() {
    },
    
    
    
    makeANewAssessmentRecord : function(component) {
        // check to see if assessment is already made
        console.log("assessmentId = " + component.get("v.AssessmentId"));
        if (component.get("v.AssessmentId") == null) {
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
                    // reload data on page
                    component.find("AssessmentLoader").reloadRecord(true);
                    console.log("Success: " + results);
                }
                else {
                    console.log("Failed: " + state);
                }
            });
            // enqueue action
            $A.enqueueAction(action);
        }
    },
    
    
    
    deleteAssessment : function(component) {
        component.find("AssessmentLoader").deleteRecord($A.getCallback(function(ResultFromCallback) {
            if (ResultFromCallback.state === "SUCCESS" || ResultFromCallback.state === "DRAFT") {
                // set assessmentId to null
                component.set("v.assessmentId", null);
                component.find("AssessmentLoader").reloadRecord(true);
                console.log("Record is deleted.");
               // try redirecting to contact detail page
                var recordId = component.get("v.recordId");
                var url = '/lightning/?id=' + recordId;
                window.open(url, '_self');
            } else if (ResultFromCallback.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (ResultFromCallback.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(ResultFromCallback.error));
            } else {
                console.log('Unknown problem, state: ' + ResultFromCallback.state + ', error: ' + JSON.stringify(ResultFromCallback.error));
            }
        }));
    },
    
    
    
    saveAssessment : function(component) {       
        component.find("AssessmentLoader").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS") {
                console.log("Success, saved");
            } else {
                console.log("NOT able to save!");
            }
        }));
    },
    
    
    
    setNewTimeForAssessment : function(component) {     
        // check to see if start time already exists
        if (component.get("v.timerStartTime") != null) {
            // call apex to update assessment with current time
            var action = component.get("c.apexSetNewStartTime");
            // set parameters
            var assessmentId = component.get("v.AssessmentId");
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
                    // reload data on page
                    component.find("AssessmentLoader").reloadRecord(true);
                    console.log("Success: " + results);
                }
                else {
                    console.log("Failed: " + state);
                }
            });
            // enqueue action
            $A.enqueueAction(action);    
        }
    },   
    
    
    
    startTimer : function(component) {       
        var varCurrentTime = Date.now();
        component.set("v.timerStartTime", varCurrentTime);
        component.set("v.timerLastCheckTime", varCurrentTime);
        component.set("v.timerRunningTime", "0");
        this.updateTimer(component);
    },
    
    
    
    updateTimer : function(component) {
        var varCurrentTime = Date.now();
        var varTimerLastCheckTime = component.get("v.timerLastCheckTime");
        var varTimeDifference = varCurrentTime - varTimerLastCheckTime;
        // if varLastSaveTime difference is more than 60 seconds, then change timer and lastTimerTime
        if (varTimeDifference > 60000) {
            var varTimerStartTime = component.get("v.timerStartTime");
            var varTimerRunningTime = varCurrentTime-varTimerStartTime;
            component.set("v.timerLastCheckTime", varCurrentTime);
            component.set("v.timerRunningTime", Math.floor(varTimerRunningTime/60000));
        }
        // periodic save
        this.saveAssessment(component);
        console.log("trying to save.");
        // setTimeout
        if(component.get("v.timerStopTime") == null){
            setTimeout($A.getCallback(() => this.updateTimer(component)), 5000);
        }
    },
    
    
    
    setNewStopTimeForAssessment : function(component) {
        // call apex to update assessment with current time
        var action = component.get("c.apexSetNewStopTimeForAssessment");
        // set parameters
        var assessmentId = component.get("v.AssessmentId");
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
                // reload data on page
                component.find("AssessmentLoader").reloadRecord(true);
                console.log("Success: " + results);
            }
            else {
                console.log("Failed: " + state);
            }
        });
        // enqueue action
        $A.enqueueAction(action);
    },
    
    
    
    stopTimer : function(component) {
        if(component.get("v.timerStopTime") == null){
            var varEndTime = Date.now();
            component.set("v.timerStopTime", varEndTime);  
        }
    },
    
    
    
})