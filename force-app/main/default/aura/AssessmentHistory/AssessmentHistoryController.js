({
    doInit : function(component, event, helper) {
        
        component.set('v.columns', [
            {label: 'Attempts', fieldName: 'Attempts__c', type: 'Integer'},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'date'},
            {label: 'Panelist', fieldName: 'Panelist__c', type: 'text'},
            {label: 'Status', fieldName: 'OverallStatus__c', type: 'text'},
            
        ]);
            
            
                        
            let actualAssessment = component.get("v.assessment");
            component.set("v.data", actualAssessment);  
            },
            
            })