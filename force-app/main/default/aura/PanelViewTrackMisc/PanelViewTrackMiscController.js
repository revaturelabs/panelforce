({
    // Initialize with records for Panel History section.
    init: function (cmp) {

        cmp.set('v.recordingLink', null);

        var action = cmp.get('c.fetchAssessments');

        action.setParams({
            "ass": cmp.get('v.currentAssessment')
        })

        console.log("Set Params was successful");

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
        cmp.set("v.currentAssessment", assessment);
    },

    // Componenet event that saves data from this component and sends it to the component with the save button.
    updateAssessment: function (cmp, event, helper) {
        // Get the component event by using the name value from aura:registerEvent.
        let updateAssessmentEvent = cmp.getEvent("updateAssessmentEvent");
        //set action to call fetchRecordTypeId method from Server-side controller
        var action = component.get("c.fetchRecordTypeId");

        action.setCallback(this, function (a) {
            if (a.getState() === "SUCCESS") {
            let RTId = a.getReturnValue();

                // References Custom Field names that may not exist. 
                // Sets values of object fields and sends them to PanelViewMain component. 
                let assessment = {
                    sobjectType: "PH_Assessment__c",
                    id: cmp.get("v.currentAssessment".id),
                    RecordTypeID: RTId,
                    Total_Score__c: cmp.get("v.totalScore"),
                    Comment__c: cmp.get("v.comment"),
                    OverallPass__c: cmp.get("v.result"),
                    Soft_Skills_Pass__c: cmp.get("v.softSkillsPass"),
                    Types_of_Associates__c: cmp.get("v.typeOfAssociate"),
                    Recording_Type__c: cmp.get("v.recordingType"),
                    Recording_Consent__c: cmp.get("v.recordingConsent"),
                    Recording_Link__c: cmp.get("v.recordingLink"),
                    Interview_Date__c: cmp.get("v.interviewDate"),
                    Interview_Start__c: cmp.get("v.interviewStart"),
                    Interview_Duration__c: cmp.get("v.interviewDuration"),
                    Interview_Mode__c: cmp.get("v.interviewMode"),
                    Internet_Connectivity__c: cmp.get("v.internetConnectivity")
                };

                // Updates assessment object of the event parameter to equal the object assessment from above.
                updateAssessmentEvent.setParams({
                    "updateAssessment": assessment
                });

                updateAssessmentEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
});