public class AssessmentHistoryController {
	//Retrieves fields to display for a single assessment by an Id.
	//Fields to display: AutoNumber-Name, Date Of Assessment, Panellist(person doing the panel/currently logged in), Overall Feedback.
	@AuraEnabled
	public static List<PH_Assessment__c> getAssessments(Id contactId)
    {
        Contact retrievedContact = [SELECT Name, (SELECT Id, Comment__c, Interview_Date__c FROM PH_Assessments__r) FROM Contact WHERE Id =: ContactId];
        System.debug('retrievedContact' + retrievedContact);
        return retrievedContact.PH_Assessments__r;        
    }
}