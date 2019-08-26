({
    doInit: function(component, event, helper) {
        console.log("In PanelViewMain init function, categories: " + component.get("v.categories"));
        var contactID = component.get("v.recordId");
        var action = component.get("c.getTrack");
        action.setParams({ "contactID": contactID });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.track", response.getReturnValue());
            } else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            } else if (state === "ERROR") {
                console.log(response.getError()[0].message);
            }
        });
        $A.enqueueAction(action);
        
        var action2 = component.get("c.getNumberofTries");
        action2.setParams({ "contactID": contactID });
        action2.setCallback(this, function(response2) {
            console.log(response2.getReturnValue());
            var state = response2.getState();
            if (state === "SUCCESS") {
                component.set("v.numberofTries", response2.getReturnValue());
            } else if (state === "INCOMPLETE") {
                console.log("Incomplete.");
            } else if (state === "ERROR") {
                console.log(response2.getError()[0].message);
            }
        });
        $A.enqueueAction(action2);
    },
    
    handlePanelAssessmentEvent: function (cmp, event) {
        var panelAssessment = event.getParam("updateAssessment");
        cmp.set("v.assessment", panelAssessment);
    },    
    
    handlePanelCategoriesEvent : function(cmp, event) {
        var listOfCategories = event.getParam("updateCategories");
        cmp.set("v.categories", listOfCategories);
    },
    
    save: function (component, event, helper) {
        console.log('saving getting called');
        var lEventCategories = component.get("v.categories");
        console.log('lEventCategories: ' + lEventCategories);
        var lEventassessment = component.get("v.assessment");
        console.log('lEventassessment: ' + lEventassessment);
        var sCategories = component.get("c.saveAssessment");
        sCategories.setParams({"pcList" : lEventCategories,
                               "assessment" : lEventassessment});
        sCategories.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("The save was successful.");
            } else if (state === "INCOMPLETE") {
                console.log("Incomplete");
            } else if (state === "ERROR") {
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