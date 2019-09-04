@isTest
public class AssessmentControllerTest 
{
    @testSetup
    public static void setupData()
    {
        PH_TrainingTrack__c newTrack = new PH_TrainingTrack__c(Name = 'Track1');
        insert newTrack;
        PanelCategory__c category = new PanelCategory__c(PH_TrainingTrack__c = newTrack.Id);
        insert category;
        PH_Assessment__c assessments = new PH_Assessment__c();
        insert assessments;
         AssessmentLineItem__c assessmentLineItems = new AssessmentLineItem__c(PanelCategory__c=category.Id,PH_Assessment__c=assessments.Id);
		insert assessmentLineItems;
        
    }
	@isTest
    public static void testReturnAssesments()
    {
        List<AssessmentLineItem__c> assessments = new List <AssessmentLineItem__c>();
         List<AssessmentLineItem__c> assessmentLineItem = [SELECT PH_Assessment__c,Status__c FROM AssessmentLineItem__c];
		 List<PH_Assessment__c> relatedAssessments = [SELECT Id From PH_Assessment__c];

     
         for(PH_Assessment__c assessment :relatedAssessments)
        {
            //for(PH_Assessment__c assessment :relatedAssessments)
            for(AssessmentLineItem__c lineItem : assessmentLineItem)
            {
                System.assertEquals(lineItem.PH_Assessment__c, assessment.Id);
                if(lineItem.Status__c == false)
                {
                    assessments.add(lineItem);
                    System.assertEquals(1, assessments.size());
                }
            }
        }
    }
}