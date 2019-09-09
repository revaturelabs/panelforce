// Test for the start assessment button and cancel button
@isTest
public class TestConductPanelApexController {
    
    
    
    @testSetup
    public static void createTestData() {
        PanelForceTestDataCreator.createData();
    }
    
    
    
    @isTest
    public static void testApexMakeNewAssessementRecord() {
        // get 1 contact Id
        Id testContactId = [SELECT Id FROM Contact LIMIT 1][0].id;
        // send to menthod being tested
        ConductPanelApexController.apexMakeNewAssessementRecord(testContactId);
        // verify that the contact Id is in the new assessment record 
        List<PH_Assessment__c> testResultAssessmentList = [SELECT Id, Contact__c FROM PH_Assessment__c ORDER BY CreatedDate DESC LIMIT 1];
        System.assertEquals(testContactId, testResultAssessmentList[0].Contact__c);
    }
    
    
    
    @isTest
    public static void testApexDeleteAssessement() {
        
        // part 1 is to make a new PH_Assessment__c
        // get 1 contact Id
        Id testContactId = [SELECT Id FROM Contact LIMIT 1][0].id;
        // send to menthod being tested
        ConductPanelApexController.apexMakeNewAssessementRecord(testContactId);
        // verify that the contact Id is in the new assessment record 
        List<PH_Assessment__c> testResultAssessmentList = [SELECT Id, Contact__c FROM PH_Assessment__c ORDER BY CreatedDate DESC LIMIT 1];
        System.assertEquals(testContactId, testResultAssessmentList[0].Contact__c);
        
        // part 2 is to delete the newly created PH_Assessment__c
        Id testAssessmentId = testResultAssessmentList[0].id;
        ConductPanelApexController.apexDeleteAssessement(testAssessmentId);
        List<PH_Assessment__c> resultAssessmentList = [SELECT Id FROM PH_Assessment__c WHERE Id = :testAssessmentId];
        System.assertEquals(0, resultAssessmentList.size());
    }
    
}