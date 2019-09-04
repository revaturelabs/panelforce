({
    myAction : function(component, event, helper) {
    },
    
    
    
    doInit : function(component, event, helper) {
        helper.makeANewAssessmentRecord(component);
    },
    
    
    
    handleSave : function(component, event, helper) {
        helper.saveAssessment(component);
    },
    
    
    
    handleAutoSave : function(component, event, helper) {
        // check last time saved
        var varLastSaveTime = component.get("v.lastSaveTime");
        var varCurrentTime = Date.now();
        // if varLastSaveTime is null or if difference is more than 2 seconds, then save
        if (varLastSaveTime == null || ((varCurrentTime - varLastSaveTime) > 2000)) {
            component.set("v.lastSaveTime", varCurrentTime);
            helper.saveAssessment(component);
        }
    },
    
    
    
    handleOverallPass : function(component, event, helper) {
        var varOverallPassTrue = true;
        console.log("after setting: " + varOverallPassTrue);
        component.set("v.Assessment.OverallPass__c", varOverallPassTrue);
        component.set("v.overallRepanel", "");
        component.set("v.overallPass", "Overall passed");
        // debug
        console.log("after setting: " + varOverallPassTrue);
        console.log("after setting: " + component.get("v.Assessment.OverallPass__c"));
        helper.saveAssessment(component);
        
    },
    
    
    
    handleRepanel : function(component, event, helper) {
        var varOverallPassTrue = false;
        console.log("after setting: " + varOverallPassTrue);
        component.set("v.Assessment.OverallPass__c", varOverallPassTrue);
        component.set("v.overallRepanel", "Needs to re-panel");
        component.set("v.overallPass", "");
        // debug
        console.log("after setting: " + varOverallPassTrue);
        console.log("after setting: " + component.get("v.Assessment.OverallPass__c"));
        helper.saveAssessment(component);
        
    },
    
    
    
    handleConsentedToRecording : function(component, event, helper) {
        var varConsentedToRecording = true;
        console.log("after setting: " + varConsentedToRecording);
        component.set("v.Assessment.RecordingConsent__c", varConsentedToRecording);
        // debug
        console.log("after setting: " + varConsentedToRecording);
        console.log("after setting: " + component.get("v.Assessment.RecordingConsent__c"));
        helper.saveAssessment(component);
    },
    
    
    
    handleNotConsentedToRecording : function(component, event, helper) {
        var varConsentedToRecording = false;
        console.log("after setting: " + varConsentedToRecording);
        component.set("v.Assessment.RecordingConsent__c", varConsentedToRecording);
        // debug
        console.log("after setting: " + varConsentedToRecording);
        console.log("after setting: " + component.get("v.Assessment.RecordingConsent__c"));
        helper.saveAssessment(component);
    },
    
    
    
})