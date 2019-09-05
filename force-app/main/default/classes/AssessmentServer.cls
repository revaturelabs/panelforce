public class AssessmentServer 
{
    @AuraEnabled
    public static List<AssessmentLineItem__c> returnAssessments(PH_Assessment__c assessment)
    {
        //grab assessment line items where assessment = id
        List<AssessmentLineItem__c> assessments = new List <AssessmentLineItem__c>();
        
<<<<<<< HEAD
        List<AssessmentLineItem__c> assesmentLineItem = [SELECT Status__c FROM AssessmentLineItem__c WHERE PH_Assessment__c =: assessment.Id];
        
        for(AssessmentLineItem__c lineItem : assesmentLineItem)
=======
        List<AssessmentLineItem__c> assessmentLineItem = [SELECT Status__c FROM AssessmentLineItem__c WHERE PH_Assessment__c =: assessment.Id];

        for(AssessmentLineItem__c lineItem : assessmentLineItem)
>>>>>>> derejeAbiel
        {
            if(lineItem.Status__c == False)
            {
                assessments.add(lineItem);
            }
        }
        return assessments;
    }
    @AuraEnabled
    public static List<PH_Assessment__c> getAssessmentId(Id contactId)
    {
        Contact retrievedContact = [SELECT (SELECT Id FROM PH_Assessments__r) FROM Contact WHERE Id =: ContactId];
        return retrievedContact.PH_Assessments__r;
    }
}