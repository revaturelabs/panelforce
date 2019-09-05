({
	getAssessmentHelper : function(component, IdComponent) {
        
        let listOfAssessments = []; 
        
        // Get a reference to server-side controller method
        var getAssessments = component.get("c.getAssessments");  
        
        // set parameters
        getAssessments.setParams({
            "contactId" : "0033i000004MKRSAA4" // component.get("v.recordId")
        }); // Pass Contact Id  as param 
        
        // Set the function to execute when the server gives a response (callback)
        getAssessments.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS") {
                console.log('Assessments from response: ' + response.getReturnValue());
                console.log('Assessments from response: ' + JSON.stringify(response.getReturnValue()));
                listOfAssessments = response.getReturnValue();
                component.set("v.panels", listOfAssessments);
                var firstPanel = listOfAssessments[0];
                console.log("First panel: " + JSON.stringify(firstPanel));
                component.set("v.firstPanel", firstPanel);
            } else if (state === "ERROR") {
                console.log("Error");
            }
        }); 
        
        // Tell SF to execute this action when the resources become available
        $A.enqueueAction(getAssessments);
	}, 
})