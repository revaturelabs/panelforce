({
    myAction : function(component, event, helper) {

    },

    cancel : function(component, event, helper) {
        // cancel button for InterviewInitial window.
        $A.get("e.force:closeQuickAction").fire();
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

    getTrackToo : function(component, event) {
        // auto populate the Track Name field
        // console.log("in getTrack .");
        var action = component.get("c.getTrack");
        action.setParams({"contactId" : component.get("v.recordId")});
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
        // get the Contact record
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
})