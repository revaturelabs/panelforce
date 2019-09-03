({
    doInit : function(component, event, helper) {
        //gets recordId from hasRecordId page
        var contactId = "0033i000005ES39AAG"; //component.get("v.recordId");
        helper.callReturnAssessments(component, contactId);
    },
})