({
    doInit : function(component, event, helper) {
        console.log('firing event');
        var compEvent = $A.get("e.c:GetContactIdEvent");
        var contact  = compEvent.setParams({
            "contactId" : component.get("v.recordId")
        });
        compEvent.fire();
        console.log('event fired');
    },
    
    registerContactId : function(component, event, helper) {
        
    }
})