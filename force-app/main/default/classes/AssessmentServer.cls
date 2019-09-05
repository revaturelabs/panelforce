public class AssessmentServer 
{
	@auraEnabled
    public static List<AssessmentLineItem__c> returnAssesments(PH_Assessment__c assessment)
    {
        //grab assessment line items where assessment = id
        List<AssessmentLineItem__c> assessments = new List <AssessmentLineItem__c>();
        
        List<AssessmentLineItem__c> assessmentLineItem = [SELECT Status__c FROM AssessmentLineItem__c WHERE PH_Assessment__c =: assessment.Id];

        for(AssessmentLineItem__c lineItem : assessmentLineItem)
        {
            if(lineItem.Status__c == False)
            {
				assessments.add(lineItem);
            }
        }
        return assessments;
    }
    @auraEnabled
    public static List<PH_Assessment__c> getAssessmentId(Id contactId)
    {
Contact retrievedContact = [SELECT Name, (SELECT Id FROM PH_Assessments__r) FROM Contact WHERE Id =: ContactId];
        return retrievedContact.PH_Assessments__r;    
    }
}