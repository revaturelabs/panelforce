({
    doInit : function(component, event, helper) {
        var contactId = component.get("v.contactId");
        var assessment = component.get("v.assessment");
        //Passes in the contact Id of the contact which on the current record page.
        //Passes in the assessment which is being loaded for the box.
        helper.callReturnAssessments(component, contactId, assessment);
    },
    
})