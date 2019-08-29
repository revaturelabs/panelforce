public class AssessmentHistoryController {
	//Retrieves fields to display for a single assessment by an Id.
	//Fields to display: AutoNumber-Name, Date Of Assessment, Panellist(person doing the panel/currently logged in), Overall Feedback.
	@AuraEnabled
	public static List<PH_Assessment__c> getAssessments(Id ContactId)
    {
        Contact retrievedContact = [SELECT Name, (SELECT Id FROM PH_Assessments__r) FROM Contact WHERE Id =: ContactId];
        return retrievedContact.PH_Assessments__r;
    }
	@AuraEnabled
	public static List<String> assessmentInfo(List<Id> AssessmentIds)
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
    }
}