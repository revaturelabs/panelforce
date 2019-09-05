({
    myAction : function(component, event, helper) {
    },
    
    
    
    doInit : function(component, event, helper) {
        helper.makeANewAssessmentRecord(component);
    },
    
    
    
    handleStartPanelButton : function(component, event, helper) {
        helper.setNewTimeForAssessment(component);
        helper.saveAssessment(component);
    },
    
    
    
    handleSaveButton : function(component, event, helper) {
        helper.saveAssessment(component);
    },
    
    
    
    handleAutoSave : function(component, event, helper) {
        // check last time saved
        var varLastSaveTime = component.get("v.lastSaveTime");
        var varCurrentTime = Date.now();
        // if varLastSaveTime is null or if difference is more than 2 seconds, then save
        if (varLastSaveTime == null || ((varCurrentTime - varLastSaveTime) > 1000)) {
            component.set("v.lastSaveTime", varCurrentTime);
            helper.saveAssessment(component);
        }
    },
    
    
    
    handlePassButton : function(component, event, helper) {
        var varOverallPassTrue = true;
        component.set("v.Assessment.OverallPass__c", varOverallPassTrue);
        component.set("v.overallRepanel", "");
        component.set("v.overallPass", "Overall passed");
        helper.saveAssessment(component);
    },
    
    
    
    handleRepanelButton : function(component, event, helper) {
        var varOverallPassTrue = false;
        component.set("v.Assessment.OverallPass__c", varOverallPassTrue);
        component.set("v.overallRepanel", "Needs to re-panel");
        component.set("v.overallPass", "");
        helper.saveAssessment(component);
    },
    
    
    
    handleConsentedToRecordingOption : function(component, event, helper) {
        var varConsentedToRecording = true;
        component.set("v.Assessment.RecordingConsent__c", varConsentedToRecording);
        helper.saveAssessment(component);
    },
    
    
    
    handleNotConsentedToRecordingOption : function(component, event, helper) {
        var varConsentedToRecording = false;
        component.set("v.Assessment.RecordingConsent__c", varConsentedToRecording);
        helper.saveAssessment(component);
    },
    
    
    
    handleAdequateConnection : function(component, event, helper) {
        var varAdequateConnection = "Adequate";
        console.log("after setting: " + varAdequateConnection);
        component.set("v.Assessment.InternetConnectivity__c", varAdequateConnection);
        helper.saveAssessment(component);
    },
    
    
    
    handleWeakConnection : function(component, event, helper) {
        var varAdequateConnection = "Weak";
        console.log("after setting: " + varAdequateConnection);
        component.set("v.Assessment.InternetConnectivity__c", varAdequateConnection);
        helper.saveAssessment(component);
    },
    
    
    
})