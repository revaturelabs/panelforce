public class AssessmentController {
    /*
     * Parameters:
     * 		contactId = The id of the contact record page that the user is on
     * 		assessment = The current Assessment that is going to be displayed in the box
     * Returns:
     * 		All Assessment Line Items that have been failed.
     */
    @AuraEnabled
    public static List<AssessmentLineItem__c> returnAssessments(Id contactId, PH_Assessment__c assessment){
        return [SELECT PanelCategory__r.Name, Status__c 
                FROM AssessmentLineItem__c 
                WHERE (PH_Assessment__c =: assessment.Id AND Status__c = false)];

    }
}