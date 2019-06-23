({
    myAction : function(component, event, helper) {

    },

    cancel : function(component, event) {
        this.fireTheEvent();
        event.cancel;
        window.close();
    },

    start : function(component, event) {
        // create Assessment and AssessmentLineItems
        var action = component.get("c.createData");
        action.setParams({"contactId" : component.get("v.recordId")});
        console.log(action);
        action.setCallback(this, function(response) {
            var state = response.getState();
             if(state === "SUCCESS") {
                console.log('success with Assessment record creation.');
                var loli = response.getReturnValue();

                let sendAssessmentEvent = $A.get("e.c:PanelViewTrackMiscEvent");
                sendAssessmentEvent.setParams({
                    updateAssessment : {
                        "sobjectType" : "PH_Assessment__c",
                        "Id" : loli[0].PH_Assessment__c
                    }
                });
                //console.log(sendAssessmentEvent);
                sendAssessmentEvent.fire();
                console.log("event fired");

                // open interview window
                //window.open("InterviewApp");
                let compEvent = $A.get("e.c:InterviewAppStateEvent");
                compEvent.setParams({
                    state : 1,
                    categories : loli
                });
                console.log(compEvent);
                compEvent.fire();
                console.log("event fired");

            } else {
                console.log('Problem getting Assessment Name, response state: ' + state);
            }
        });
        $A.enqueueAction(action);

        // open interview window
        //window.open("InterviewApp");
        //let compEvent = $A.get("e.c:InterviewAppStateEvent");
        //compEvent.setParams({
        //     state : 1
        // });
        // console.log(compEvent);
        // compEvent.fire();
        // console.log("event fired");
    },

//    fireTheEvent : function(component, event) {
//        var cmpEvent = component.getEvent("cmpEvent");
//        cmpEvent.setParams({
//            "message" : "The message: The component has fired."
//        });
//        cmpEvent.fire();
//    },

    getTrack : function(component, event) {
        var action = component.get("c.getTrack");
        action.setParams({"trackInput" : component.get("v.trackName")});
        console.log(action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.trackName", response.getReturnValue());
            } else {
                console.log('Problem getting track name, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    getContact : function(component, event) {
        var action = component.get("c.getContact");
        action.setParams({"contact": component.get("v.recordId")});
        console.log(component.get("v.recordId") + ' ' + "c.getContact");
        console.log(action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.contact", response.getReturnValue());
            } else {
                fireTheEvent();
                console.log('Problem getting contact name, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

//    doInit : function(component, event, helper) {        
//        var action = component.get("c.getTrack");
//        action.setParams({"contactId" : component.get("v.recordId")});
//        console.log(action);
//        action.setCallback(this, function(response) {
//            var state = response.getState();
//            if(state === "SUCCESS") {
//                component.set("v.trackName", response.getReturnValue());
//            } else {
//                console.log('Problem getting track name, response state: ' + state);
//            }
//        });
//        $A.enqueueAction(action);
//        },
//        
//            handleSaveContact: function(component, event, helper) {
//                if(helper.validateContactForm(component)) {
//                    // Prepare the action to create the new contact
//                    var saveContactAction = component.get("c.saveContactWithAccount");
//                    saveContactAction.setParams({
//                        "contact": component.get("v.newContact"),
//                        "accountId": component.get("v.recordId")
//                    });
//        
//                    saveContactAction.setCallback(this, function(response) {
//                        var state = response.getState();
//                        if(state === "SUCCESS") {
//                            var resultsToast = $A.get("e.force:showToast");
//                            resultsToast.setParams({
//                                "title": "Contact Saved",
//                                "message": "The new contact was created."
//                            });
//        
//                            $A.get("e.force:closeQuickAction").fire();
//                            resultsToast.fire();
//                            $A.get("e.force:refreshView").fire();
//                        }
//                        else if (state === "ERROR") {
//                            console.log('Problem saving contact, response state: ' + state);
//                        }
//                        else {
//                            console.log('Unknown problem, response state: ' + state);
//                        }
//                    });
//
//                    $A.enqueueAction(saveContactAction);
//                }
//            },
//        
//            handleCancel: function(component, event, helper) {
//                $A.get("e.force:closeQuickAction").fire();
//            }
})