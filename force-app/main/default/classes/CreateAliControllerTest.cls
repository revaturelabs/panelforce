@isTest
public class CreateAliControllerTest {

    @TestSetup
    public static void setup(){
        PanelForceDataCreator.createData();  // associates panelcategories trainings  training tracks
      
    }
    
    @isTest
    public static void getAssessmentLineItemsTest(){
        Id associateId = [SELECT id FROM Contact LIMIT 1].id;
        PH_Assessment__c assessment = new PH_Assessment__c(Contact__c=associateId);
        insert assessment;
        List<AssessmentLineItem__c> assessmentLineItems = createALIController.getAssessmentLineItems(associateId, assessment.id);
        Integer totalNumLineItems = assessmentLineItems.size();
        System.assertNotEquals(0, totalNumLineItems); //there should be some lineItems
        
        // set all to a pass initially
        for(AssessmentLineItem__c ali : assessmentLineItems){
            ali.interviewed__c = true;
        }
        
        AssessmentLineItem__c failedALI1 = assessmentLineItems[0];
        AssessmentLineItem__c failedALI2 = assessmentLineItems[assessmentLineItems.size()-1];
        failedALI1.interviewed__c = false; //failure!
        failedALI2.interviewed__c = false;
        
        update assessmentLineItems;
        // insert new assessment 
        PH_Assessment__c assessment2 = new PH_Assessment__c(Contact__c=associateId);
        insert assessment2;
        
        assessmentLineItems = createALIController.getAssessmentLineItems(associateId, assessment2.id); //this list should only contained the failed ALIs
        System.assertEquals(2, assessmentLineItems.size());
        
    }
}