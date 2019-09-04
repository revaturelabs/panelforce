({
    doInit : function(component, event, helper) {
        //gets recordId from hasRecordId page
        var contactId = "0033i000005ES39AAG"; //component.get("v.recordId");
        var assessment = component.get("v.assessment");
        helper.callReturnAssessments(component, contactId, assessment);
    },
})