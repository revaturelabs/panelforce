({
    myAction : function(component, event, helper) {

    },

    cancel : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },

    start : function(cmp, event) {
        // open interview window
        //window.open("InterviewApp");
        let compEvent = $A.get("e.c:InterviewAppStateEvent");
        compEvent.setParams({
            state : 1
        });
        console.log(compEvent);
        compEvent.fire();
        console.log("event fired");
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