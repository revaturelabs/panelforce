({
    doInit : function(component, event, helper) {
        
        component.set('v.columns', [
            {label: 'Attempt', type: 'button', initialWidth: 100, typeAttributes: { label: {fieldName: 'Attempts__c'}, name: 'view_details', }},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'Date'},
            {label: 'Panelist', fieldName: 'Panelist__c', type: 'text'},
            {label: 'Status', fieldName: 'OverallStatus__c', type: 'text'},
            
        ]);
            
            component.set("v.data", component.get("v.assessment"));
                  
     },
        createRecord : function (component, event, helper) {
            var assessment = component.get("v.assessment");
    		var navEvt = $A.get("e.force:navigateToSObject");
    		navEvt.setParams({
     		 	"recordId": assessment.Id,
      			"slideDevName": "related"
    		});
    		navEvt.fire();
		}
            
})