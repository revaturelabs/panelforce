({
	getAssessmentHelper : function(component, IdComponent) {
        
        let listOfAssessments = []; 
        
        // Get a reference to server-side controller method
        var getAssessments = component.get("c.getAssessments");
        console.log("Assessments: " + getAssessments);   
        
        // set parameters
        getAssessments.setParams({
            "contactId" : "0033i000004MKRSAA4"
        }); // Pass Contact Id  as param 
        
        // Set the function to execute when the server gives a response (callback)
        getAssessments.setCallback(this, function(response) {
            var state = response.getState();
            
            if(state === "SUCCESS") {
                listOfAssessments = response.getReturnValue();
                console.log('Assessments from response: ' + response.getReturnValue());
                console.log('Assessments from response: ' + JSON.stringify(response.getReturnValue()));
                component.set("v.assessments", listOfAssessments);        
                return component.get("v.assessments");
            } else if (state === "ERROR") {
                console.log("Error");
            }
        });
        
        // Tell SF to execute this action when the resources become available
        $A.enqueueAction(getAssessments);
	},
    
    getAssessmentInfoHelper : function(component) {

        var getMapOfAssessmentToInfoMap = component.get(c.getMapOfAssessmentToInfoMap);

        getMapOfAssessmentToInfoMap.setParams({
            "contactId" : "0033i000004MKRSAA4" // this is not right
        });

        getMapOfAssessmentToInfoMap.setCallback(this, function(response) {
            var state = response.getState();

            if(state === "SUCCESS") {
                component.set(_____.getReturnValue); // need to see where im going to pass the value returned 
            } else if (state === "ERROR") {
                console.log("ERROR");
            } 

        });

        $A.enqueueAction(getMapOfAssessmentToInfoMap);
    
	},
})