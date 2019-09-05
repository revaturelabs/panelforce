({
    
    myAction : function(component, event, helper) {
        var compEvent = component.getEvent("GetContactId");
        compEvent.fire('v.tempContactId');
    }
})