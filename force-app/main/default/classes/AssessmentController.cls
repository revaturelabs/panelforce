public class AssessmentController {
    @AuraEnabled
    public static List<AssessmentLineItem__c> returnAssessments(Id contactId, PH_Assessment__c assessment){
      	//return failed assessments from contacts passed in
        return [SELECT PanelCategory__r.Name, Status__c FROM AssessmentLineItem__c WHERE (PH_Assessment__c =: assessment.Id AND Status__c = false)];

    }
}