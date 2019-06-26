({
    // Initialize component variables.
    init: function (cmp) {
        cmp.set('v.comment', null);

    },

    // Pass button functionality.
    handlePass: function (cmp, event, helper) {
        let passButton = cmp.find("pass");
        let failButton = cmp.find("fail");

        passButton.set("v.variant", "success");
        $A.util.addClass(passButton, 'white');

        failButton.set("v.variant", "neutral");

        cmp.set("v.result", true);
    },

    // Fail button functionality.
    handleFail: function (cmp, event, helper) {
        let passButton = cmp.find("pass");
        let failButton = cmp.find("fail");

        passButton.set("v.variant", "neutral");
        $A.util.removeClass(passButton, 'white');

        failButton.set("v.variant", "destructive");

        cmp.set("v.result", false);
    },

    // Soft Skills Pass button functionality.
    softPass: function (cmp, event, helper) {
        let passButton = cmp.find("softPass");
        let failButton = cmp.find("softFail");

        passButton.set("v.variant", "success");
        $A.util.addClass(passButton, 'white');

        failButton.set("v.variant", "neutral");

        cmp.set("v.softSkillsPass", true);
    },

    // Soft Skills Fail button functionality.
    softFail: function (cmp, event, helper) {
        let passButton = cmp.find("softPass");
        let failButton = cmp.find("softFail");

        passButton.set("v.variant", "neutral");
        $A.util.removeClass(passButton, 'white');

        failButton.set("v.variant", "destructive");

        cmp.set("v.softSkillsPass", false);
    },

    // Handle Assessment Event from other component to get Assessment Id.
    // Need assessment Id for application to work.
    handleAssessment: function (cmp, event, helper) {
        let assessment = event.getParam("updateAssessment");
        cmp.set("v.assessmentId", assessment.id);

        PanelViewTrackMiscController.fetchAssessments(assessment);

        //call apex class method
        console.log("fetchAssessments");
        var action = cmp.get('c.fetchAssessments');
        console.log(action);

        console.log("get response");
        action.setCallback(this, function (response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                //set response value in Assessment attribute on component.
                cmp.set('v.Assessment', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);

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
            Comment: cmp.get("v.comment"),
            OverallPass: cmp.get("v.result")
        };

        //Updates assessment object with fields and values from assessment variable.
        updateAssessmentEvent.setParams({
            "updateAssessment": assessment
        });

        updateAssessmentEvent.fire();
    }
});
