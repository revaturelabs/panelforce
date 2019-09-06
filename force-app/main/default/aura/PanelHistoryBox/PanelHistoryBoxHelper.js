({
	getAssessmentHelper : function(component, IdComponent) {
        
        let listOfAssessments = []; 
        
        // Get a reference to server-side controller method
        var getAssessments = component.get("c.getAssessments");
        
        // set parameters
        getAssessments.setParams({
            "contactId" : component.get("v.contactId")
        }); // Pass Contact Id  as param 
        
        // Set the function to execute when the server gives a response (callback)
        getAssessments.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS") {
                listOfAssessments = response.getReturnValue();
                component.set("v.panels", listOfAssessments);
                var firstPanel = listOfAssessments[0];
                component.set("v.firstPanel", firstPanel);           
            } else if (state === "ERROR") {
                console.log("Error");
            }
        }); 
        
        // Tell SF to execute this action when the resources become available
        $A.enqueueAction(getAssessments);
	}, 
})