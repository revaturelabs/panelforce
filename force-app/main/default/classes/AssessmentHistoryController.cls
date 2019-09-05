public class AssessmentHistoryController {
	@AuraEnabled
	public static List<PH_Assessment__c> getAssessments(Id contactId)
    {
        Contact retrievedContact = [SELECT Name, (SELECT Id, Attempts__c, Interview_Date__c, Panelist__c, OverallStatus__c
                                                  FROM PH_Assessments__r ORDER BY Name DESC)
                                    FROM Contact 
                                    WHERE Id =: contactId ];
        return retrievedContact.PH_Assessments__r;
    }
}