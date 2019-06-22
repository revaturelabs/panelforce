({
    // Initialize component variables.
    init: function (cmp) {
        cmp.set('v.comment', null);

    },

    // Pass button functionality.
    handlePass: function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
        let passClick = event.getSource();
        let changeFail = cmp.get("v.fail");

        passClick.iconName = "utility:success";
        passClick.iconPosition = "right";

        changeFail.removeAttribute("iconName");
        changeFail.removeAttribute("iconPosition");

    },

    // Fail button functionality.
    handleFail: function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
        let failClick = event.getSource();
        let changePass = cmp.get("v.pass");

        failClick.iconName = "utility:clear";
        failClick.iconPosition = "right";

        changePass.removeAttribute("iconName");
        changePass.removeAttribute("iconPosition");

    },

    // Componenet event that saves data from this component and sends it to the component with the save button.
    updateAssessment: function (cmp, event, helper) {
        // Get the component event by using the name value from aura:registerEvent.
        let updateAssessmentEvent = cmp.getEvent("updateAssessmentEvent");

        //References Custom Field names that may not exist. 
        let assessment = {
            sobjectType: "PH_Assessment__c",
            id: "",
            Types_of_Associates: cmp.get("v.options"),
            Overall_Comment: cmp.get("v.comment"),
            Pass: cmp.get("v.pass"),
            Fail: cmp.get("v.fail"),
        };

        //Updates assessment object with fields and values from assessment variable.
        updateAssessmentEvent.setParams({
            "Assessment": assessment
        });

        updateAssessmentEvent.fire();
    },
<<<<<<< HEAD

    // Handle Assessment Event from other component to get Assessment Id.
    // Need assessment Id for application to work.
    handleAssessment: function (cmp, event, helper) {

    }
});
=======
});
>>>>>>> Dwayne
