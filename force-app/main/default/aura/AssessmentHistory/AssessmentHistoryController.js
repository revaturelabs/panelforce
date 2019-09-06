({
    doInit : function(component, event, helper) {
        /**
         * Sets the columns for the data table that is displayed in each box.
         */
        component.set('v.columns', [
            {label: 'Attempt', type: 'button', initialWidth: 100, typeAttributes: { label: {fieldName: 'Attempts__c'}, name: 'view_details', }},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'Date'},
            {label: 'Panelist', fieldName: 'Panelist__c', type: 'text'},
            {label: 'Status', fieldName: 'OverallStatus__c', type: 'text'},
            
        ]);
            //fills the data table with the current assessment. Only populates
            //the table with one assessment.
            component.set("v.data", component.get("v.assessment"));
                  
     },
    /**
     * This method is used to navigate to the Assessment Line Item record page.
     * The event being fired navigates to the record page.
     */
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