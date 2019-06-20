({
    myAction : function(component, event, helper) {

    },

    cancel : function(cmp, event, handler) {
        event.cancel;
        window.close();
    },

    start : function(cmp, event) {
        // open interview window
        window.open("InterviewApp");
    },
    
    getTrack : function(cmp, event) {
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

    getContact : function(cmp, event) {      
        var action = component.get("c.getContact");
        action.setParams({"contact": component.get("v.recordId")});
        console.log(component.get("v.recordId") + ' ' + "c.getContact");
        console.log(action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.contact", response.getReturnValue());
            } else {
                console.log('Problem getting contact name, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    doInit : function(component, event, helper) {        
                var action = component.get("c.getAccount");
                action.setParams({"accountId": component.get("v.recordId")});
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if(state === "SUCCESS") {
                        component.set("v.account", response.getReturnValue());
                    } else {
                        console.log('Problem getting account, response state: ' + state);
                    }
                });
                $A.enqueueAction(action);
            },
        
            handleSaveContact: function(component, event, helper) {
                if(helper.validateContactForm(component)) {
                    // Prepare the action to create the new contact
                    var saveContactAction = component.get("c.saveContactWithAccount");
                    saveContactAction.setParams({
                        "contact": component.get("v.newContact"),
                        "accountId": component.get("v.recordId")
                    });
        
                    saveContactAction.setCallback(this, function(response) {
                        var state = response.getState();
                        if(state === "SUCCESS") {
                            var resultsToast = $A.get("e.force:showToast");
                            resultsToast.setParams({
                                "title": "Contact Saved",
                                "message": "The new contact was created."
                            });
        
                            $A.get("e.force:closeQuickAction").fire();
                            resultsToast.fire();
                            $A.get("e.force:refreshView").fire();
                        }
                        else if (state === "ERROR") {
                            console.log('Problem saving contact, response state: ' + state);
                        }
                        else {
                            console.log('Unknown problem, response state: ' + state);
                        }
                    });

                    $A.enqueueAction(saveContactAction);
                }
            },
        
            handleCancel: function(component, event, helper) {
                $A.get("e.force:closeQuickAction").fire();
            }
})