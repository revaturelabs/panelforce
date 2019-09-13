public class AssessmentHistoryController {
    @AuraEnabled
    public static List<PH_Assessment__c> getAssessments(Id contactId)
    {
        // Use SOQL to retrieve necessary record information for Assessments
        Contact retrievedContact = [SELECT Name, (SELECT Id, PanelRound__c, Interview_Date__c, PanelistName__c, OverallStatus__c
                                                  FROM PH_Assessments__r ORDER BY Name DESC)
                                    FROM Contact 
                                    WHERE Id =: contactId ];
        return retrievedContact.PH_Assessments__r;
    }
}