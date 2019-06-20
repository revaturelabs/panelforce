({
    doInit: function (component, event, helper) {
        var contactID = component.get("v.recordId");

        var action = component.get("c.getTrack");
        action.setParams({ "contactID": contactID });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.track", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            }
            else if (state === "ERROR") {
                console.log(response.getError()[0].message);
            }
        });
        $A.enqueueAction(action);

        var action2 = component.get("c.getNumberofTries");
        action2.setParams({ "contactID": contactID });
        action2.setCallback(this, function (response2) {
            var state = response2.getState();
            if (state === "SUCCESS") {
                component.set("v.numberofTries", response2.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            }
            else if (state === "ERROR") {
                console.log(response2.getError()[0].message);
            }
        });
        $A.enqueueAction(action2);
    },

    handlePanelTrackEvent: function (cmp, event) {
        var panelTrack = event.getParam("updateTrack");
        cmp.set("v.trackFromEvent", panelTrack);
        var tEvent = cmp.get("v.trackFromEvent");
    },

    handlePanelCategoriesEvent: function (cmp, event) {
        var listOfCategories = event.getParam("updateCategories");
        cmp.set("v.listFromEvent", listOfCategories);
    },

    handleInterviewAppStateEvent: function (cmp, event) {
        var interviewAppState = event.getParam("state");
        cmp.set("v.appState", interviewAppState);
    },

    save: function (component, event, helper) {
        var lEventCategories = component.get("v.listFromEvent");
        var assessment = component.get("v.trackFromEvent");

        var sCategories = component.get("c.saveAssessment");
        sCategories.setParams({
            "pcList": lEventCategories,
            "assessment": assessment
        });
        sCategories.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("The save was successful.");
            }
            else if (state === "INCOMPLETE") {
                console.log("Incomplete");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(sCategories);
    }
})