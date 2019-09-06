({
	doInit : function(component, event, helper) {
        console.log('init');
        var contact = component.get("v.ContactId");
        var assessment = component.get("v.AssessmentId");
        console.log('contact Id :' + contact);
        console.log('assessment id: ' + assessment)
		var action = component.get("c.getAssessmentLineItems");
        action.setParams({
            "contactId" : contact,
            "createdAssessment" : assessment,
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('ali: ' + response.getReturnValue());
                component.set("v.categories", response.getReturnValue());
            } else {
                console.log('Error getting Assessment Line Item.');
            }
        });
        
        $A.enqueueAction(action);
	},
    
    doSomething : function(component, event, helper) {
        console.log('Actual assessmentId: ' + component.get("v.AssessmentId"));
    },
})