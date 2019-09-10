@isTest
public class AssessmentControllerTest 
{
 
	@isTest
    public static void testReturnAssesments()
    {
        //create new assessment for testing 
        PH_Assessment__c newAssessment = new PH_Assessment__c();
 		//create new contact for testing
        Contact panelist = new Contact();
        //call assessment controller with test contact and assessment 
        List <AssessmentLineItem__c> returnedAssessments = AssessmentController.returnAssessments(panelist.Id,newAssessment);
        //loop through returned list 
		for(AssessmentLineItem__c lineItem : returnedAssessments)
        {
            //validate ids are equal
            System.assertEquals(newAssessment.Id, lineItem.Id);
            //make sure status is false: panelist failed
            System.assertEquals(lineItem.Interviewed__c, false);
            //validate that the contact passed in is the same contact for the assessment
            System.assertEquals(lineItem.PH_Assessment__r.Contact__c, panelist.Id);
        }
    }
  	@isTest
    public static void testFailedReturnAssesments()
    {
		
        
        PH_TrainingTrack__c newTrack = new PH_TrainingTrack__c(Name = 'Track1');
        insert newTrack;
        PanelCategory__c category = new PanelCategory__c(PH_TrainingTrack__c = newTrack.Id);
        insert category;
        PH_Assessment__c assessments = new PH_Assessment__c();
        insert assessments;
        
        AssessmentLineItem__c assessmentLineItems = new AssessmentLineItem__c(PanelCategory__c=category.Id,PH_Assessment__c=assessments.Id,Interviewed__c=TRUE);
        List<AssessmentLineItem__c> passedAssessments = new List <AssessmentLineItem__c>();
        passedAssessments.add(assessmentLineItems);
		insert passedAssessments;        
    		//create passed assessment case for failing test
            for(AssessmentLineItem__c assessment : passedAssessments)
            {

            //make sure status is false: panelist failed
            System.assertEquals(false, assessment.Interviewed__c);
    
            }
        }
    
}