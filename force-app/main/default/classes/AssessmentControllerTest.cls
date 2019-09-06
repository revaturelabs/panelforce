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
            System.assertEquals(lineItem.Status__c, false);
            //validate that the contact passed in is the same contact for the assessment
            System.assertEquals(lineItem.PH_Assessment__r.Contact__c, panelist.Id);
        }
    }
  
}