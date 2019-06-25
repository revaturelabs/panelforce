({
    // Initialize component variables.
    init: function (cmp) {
        cmp.set('v.comment', null);

        //call apex class method
        console.log("fetchAssessments");
        var action = cmp.get('c.fetchAssessments');
        console.log(action);

        console.log("get response");
        action.setCallback(this, function (response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                //set response value in ListOfAssessments attribute on component.
                cmp.set('v.ListOfAssessments', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    // Pass button functionality.
    handlePass: function (cmp, event, helper) {
        let passButton = cmp.find("pass");
        let failButton = cmp.find("fail");

        passButton.set("v.variant", "success");
        $A.util.addClass(passButton, 'white');

        failButton.set("v.variant", "neutral");

        cmp.set("v.pass", true);
    },

    // Fail button functionality.
    handleFail: function (cmp, event, helper) {
        let passButton = cmp.find("pass");
        let failButton = cmp.find("fail");

        passButton.set("v.variant", "neutral");
        $A.util.removeClass(passButton, 'white');

        failButton.set("v.variant", "destructive");

        cmp.set("v.pass", false);
    },

    // Handle Assessment Event from other component to get Assessment Id.
    // Need assessment Id for application to work.
    handleAssessment: function (cmp, event, helper) {
        let assessment = event.getParam("updateAssessment");
        cmp.set("v.assessmentId", assessment.id);
    },

    // Componenet event that saves data from this component and sends it to the component with the save button.
    updateAssessment: function (cmp, event, helper) {
        // Get the component event by using the name value from aura:registerEvent.
        let updateAssessmentEvent = cmp.getEvent("updateAssessmentEvent");

        //References Custom Field names that may not exist. 
        let assessment = {
            sobjectType: "PH_Assessment__c",
            id: cmp.get("v.assessmentId"),
            Types_of_Associates: cmp.get("v.typeOfAssociate"),
            Overall_Comment: cmp.get("v.comment"),
            Overall_Pass: cmp.get("v.pass")
        };

        //Updates assessment object with fields and values from assessment variable.
        updateAssessmentEvent.setParams({
            "updateAssessment": assessment
        });

        updateAssessmentEvent.fire();
    }
});
