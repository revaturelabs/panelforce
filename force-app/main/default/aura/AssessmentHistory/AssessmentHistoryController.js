({
    doInit : function(component, event, helper) {
        // grabbing the attribute from the cmp
        //var IdComponent = component.get("v.IdComponent");
        // calling and setting params for the helper
        //let assessments = helper.getAssessmentHelper(component, IdComponent);
        //let assessmentss = helper.getAssessmentInfoHelper(component, IdComponent);  

        component.set("v.data", component.get("v.assessment"));
        
        component.set('v.columns', [
            {label: 'Attempt', type: 'button', initialWidth: 100, typeAttributes: { label: {fieldName: 'Attempts__c'}, name: 'view_details', }},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'Date'},
            {label: 'Panelist', fieldName: 'Panelist__c', type: 'text'},
            {label: 'Status', fieldName: 'OverallPass__c', type: 'text'},
            
        ]);
                  
     },
        handleRowAction : function (component, event, helper) {
        var assessment = component.get("v.assessment");
        var action = event.getParam('action');
        if (action.name == 'view_details'){
            var link = "https://panelforcesebp3-dev-ed.lightning.force.com/lightning/r/PH_Assessment__c/" + assessment.Id + "/view";
            window.open(link,'_blank');
        }
    },
            
})