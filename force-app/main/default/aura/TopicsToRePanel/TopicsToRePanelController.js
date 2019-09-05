({
    doInit : function(component, event, helper) {
        //gets recordId from hasRecordId page
        var contactId = "0033i000005ES39AAG"; //component.get("v.recordId");
        var assessment = component.get("v.assessment");
        console.log('assessment doInit: ' + assessment);
        console.log("topics to test: " + JSON.stringify(assessment));
        helper.callReturnAssessments(component, contactId, assessment);
    },
})