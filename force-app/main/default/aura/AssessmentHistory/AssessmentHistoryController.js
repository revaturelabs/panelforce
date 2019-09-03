({
    doInit : function(component, event, helper) {
        // grabbing the attribute from the cmp
        var IdComponent = component.get("v.IdComponent");
        // calling and setting params for the helper
        let assessments = helper.getAssessmentHelper(component, IdComponent);
        
        //helper.getAssessmentInfoHelper(component);  
        
        component.set('v.columns', [
            {label: 'Assessment Name', fieldName: 'Name', type: 'text'},
            {label: 'Date', fieldName: 'Interview_Date__c', type: 'Date'},
            {label: 'Panelist', fieldName: 'CreatedById', type: 'text'},
            {label: 'Overall-feedback', fieldName: 'Comment__c', type: 'text'},
        ])
     },
            
})


/*
public static List<String> assessmentInfo(List<Id> assessmentIds)
{
List<String> infoOnAssessments = new List<String>();
//
PH_Assessment__c currentAssessment = [SELECT Id, Name, Interview_Date__c, CreatedById, Comment__c FROM PH_Assessment__c WHERE Id=: AssessmentIds[0] LIMIT 1];
String AssessmentInfo = (currentAssessment.Name + ' ' + currentAssessment.Interview_Date__c + ' ');
Contact Panellist = [SELECT Id, firstName, lastName FROM Contact WHERE Id=: currentAssessment.CreatedById LIMIT 1];
AssessmentInfo += (Panellist.firstName + ' ' + Panellist.lastName + ' ' + currentAssessment.Comment__c);
//
infoOnAssessments.add(AssessmentInfo);
return infoOnAssessments;
} */