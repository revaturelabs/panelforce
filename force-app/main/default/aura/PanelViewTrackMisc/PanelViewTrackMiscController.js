({
    // Initialize component variables.
    init: function (cmp) {
        cmp.set('v.editState', true);
        cmp.set('v.readState', false);
        cmp.set('v.comment', "Panel Comment");

    },

    // Pass button functionality.
    handlePass: function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    },

    // Fail button functionality.
    handleFail: function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    },

    // Componenet event that saves data from this component and sends it to the component with the save button.
    updateAssessment: function (cmp, event, helper) {

        // Get the component event by using the name value from aura:registerEvent.
        var updateAssessmentEvent = cmp.getEvent("updateAssessmentEvent");

        //References Custom Field names that may not exist. 
        var assessment = {
            sobjectType: "assessment__c",
            Types_of_Associates: cmp.get("v.options"),
            Overall_Comment: cmp.get("v.comment"),
            Pass: cmp.get("v.pass"),
            Fail: cmp.get("v.fail"),
        };

        //Updates update assessment field with variables and values from component.
        updateAssessmentEvent.setParams({
            updateAssessment: assessment
        });

        updateAssessmentEvent.fire();
    },
});
