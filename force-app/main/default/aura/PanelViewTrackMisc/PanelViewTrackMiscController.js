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

        cmp.set("v.pass", true);
        cmp.set("v.fail", false);
    },

    // Fail button functionality.
    handleFail: function (cmp, event, helper) {
        let passButton = cmp.find("pass");
        let failButton = cmp.find("fail");

        passButton.set("v.variant", "neutral");
        $A.util.removeClass(passButton, 'white');

        failButton.set("v.variant", "destructive");

        cmp.set("v.pass", false);
        cmp.set("v.fail", true);
    },

    // Componenet event that saves data from this component and sends it to the component with the save button.
    updateAssessment: function (cmp, event, helper) {

        // Get the component event by using the name value from aura:registerEvent.
        var updateAssessmentEvent = cmp.getEvent("updateAssessmentEvent");

        //References Custom Field names that may not exist. 
        var assessment = {
            "sobjectType": "Assessment",
            "Types_of_Associates": cmp.get("v.options"),
            "Overall_Comment": cmp.get("v.comment"),
            "Pass": cmp.get("v.pass"),
            "Fail": cmp.get("v.fail"),
        };

        //Updates assessment field with variables and values from component.
        updateAssessmentEvent.setParams({
            updateAssessment: assessment
        });

        updateAssessmentEvent.fire();
    },

    // Handle Assessment Event from other component to get Assessment Id.
    // Need assessment Id for application to work.
    handleAssessment: function (cmp, event, helper) {
    }
});