({
	doInit : function(component, event, helper) {
        console.log('init');
		var action = component.get("c.getAssessmentLineItems");
        
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
	}
})