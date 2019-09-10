({
    myAction : function(component, event, helper) {
    },
    
    
    
    doInit : function(component, event, helper) {
        helper.makeANewAssessmentRecord(component);
    },
    
    
    
    handleSave : function(component, event, helper) {
        helper.saveAssessment(component);
    },
    
    
    
    handlePass : function(component, event, helper) {
        console.log("before setting: " + component.get("v.Assessment.OverallPass__c"));
                helper.saveAssessment(component);
        component.set("v.Assessment.OverallPass__c", True);
        // debug
        console.log("after setting: " + component.get("v.Assessment.OverallPass__c"));
        helper.saveAssessment(component);
    },
    
    
    
    handleFail : function(component, event, helper) {
                console.log("before setting: " + component.get("v.Assessment.OverallPass__c"));
                helper.saveAssessment(component);
        component.set("v.Assessment.OverallPass__c", False);
        // debug
        console.log("after setting: " + component.get("v.Assessment.OverallPass__c"));
        helper.saveAssessment(component);
    },
    
    
    
    handleConsentedToRecording : function(component, event, helper) {
        component.set("v.Assessment.RecordingConsent__c", component.get("v.ConsentedToRecording"));
        // debug
        console.log(component.get("v.Assessment.RecordingConsent__c"));
        helper.saveAssessment(component);
    },
    
    
    
})