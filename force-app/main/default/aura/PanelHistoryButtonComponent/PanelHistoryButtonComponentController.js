({
    doInit : function(component, event, helper) {
        //gets recordId from hasRecordId page
        var contactId = component.get("v.contactId");
        var assessment = component.get("v.assessment");
        helper.callReturnAssessments(component, contactId, assessment);
    },
})