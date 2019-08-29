({
	doInit : function(component, event, helper) {
		
		// Step1- Get a reference to server-side controller method
		var getAssesments = component.get("c.getAssesments");
		var assessmentInfo = component.get("c.assessmentInfo");

		// Step2- Optionally set parameters
		getAssesments.getParam({
			"contactId" : contactId
		}); // Pass Contact Id  as param

		assessmentInfo.getParam({
			"assessmentId" : getAssesments
		}); // Pass Assessment Id as param
		
		// Step3- Set the function to execute when the server gives a response (callback)
		assessmentInfo.setCallback(this, function(response) {
			var state = response.getState();

			if(state === "SUCCESS") {
				component.set("v.assessment".getReturnValue()); 
			} else if (state === "ERROR") {
				console.log("Error");
			}
		});

		getAssesments.setCallback(this, function(response) {
			var state = response.getState();

			if(state === "SUCCESS") {
				component.set("v.contact".getReturnValue()); 
			} else if (state === "ERROR") {
				console.log("Error");
			}
		});

		 // Step4- Tell SF to execute this action when the resources become available
		 $A.enqueueAction(assessmentInfo);
		 $A.enqueueAction(getAssessments);

	},
})