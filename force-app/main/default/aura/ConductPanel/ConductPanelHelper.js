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
        // debug
        console.log (varTimeDifference);
        // if varLastSaveTime difference is more than 60 seconds, then change timer and lastTimerTime
        if (varTimeDifference > 60000) {
            var varTimerStartTime = component.get("v.timerStartTime");
            var varTimerRunningTime = varCurrentTime-varTimerStartTime;
            // debug
            console.log(varTimerRunningTime);
            component.set("v.timerLastCheckTime", varCurrentTime);
            component.set("v.timerRunningTime", Math.floor(varTimerRunningTime/60000));
        }
        if(component.get("v.timerStopTime") == null){
        setTimeout($A.getCallback(() => this.updateTimer(component)), 10000);
        }
    },
    
     setNewStopTimeForAssessment : function(component) {      
        // call apex to update assessment with current time
        var action = component.get("c.setNewStopTimeForAssessment");
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
        var varEndTime = Date.now();
        //component.set("v.timerStopClick", varEndTime);
       // component.set("v.timerLastCheckTime", varCurrentTime);
       component.set("v.timerStopTime", varEndTime);
        console.log(component.get("v.timerStopTime"));
        //component.set("v.timerRunningTime", "0");
        this.updateTimer(component);
    },
    
    
    
})