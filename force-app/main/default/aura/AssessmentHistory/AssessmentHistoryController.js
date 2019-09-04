({
    doInit : function(component, event, helper) {
        // grabbing the attribute from the cmp
        var IdComponent = component.get("v.IdComponent");
        // calling and setting params for the helper
        let assessments = helper.getAssessmentHelper(component, IdComponent);
        //let assessmentss = helper.getAssessmentInfoHelper(component, IdComponent);  
        
        component.set('v.columns', [
            {label: 'Assessment Name', fieldName: 'Name', type: 'text'},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'Date'},
            {label: 'Panelist', fieldName: 'Panelist__c', type: 'text'},
            {label: 'Status', fieldName: 'OverallPass__c', type: 'text'},
            
        ]);
                  
     },
            
})