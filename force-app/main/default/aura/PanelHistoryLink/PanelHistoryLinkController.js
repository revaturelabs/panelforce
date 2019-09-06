({
	
    
    createRecord : function (component, event, helper) {
        console.log("in");
        var assessmentLI = component.get("v.AssessmentLineItem");
        console.log("Assessment Line Item: " + JSON.stringify(assessmentLI));
    	var navEvt = $A.get("e.force:navigateToSObject");
    	navEvt.setParams({
     	 	"recordId": assessmentLI.Id,
      		"slideDevName": "related"
    	});
    	return navEvt.fire();
	},
})