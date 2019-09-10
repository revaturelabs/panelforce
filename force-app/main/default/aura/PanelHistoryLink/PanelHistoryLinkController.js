({
    /**
     * This method is used to navigate to the Assessment Line Item record page.
     * The event being fired navigates to the record page.
     */
    createRecord : function (component, event, helper) {
        var assessmentLI = component.get("v.AssessmentLineItem");
    	var navEvt = $A.get("e.force:navigateToSObject");
    	navEvt.setParams({
     	 	"recordId": assessmentLI.Id,
      		"slideDevName": "related"
    	});
    	return navEvt.fire();
	},
})