@isTest
public class AssessmentLineItemControllerTest{
    @TestSetup
    static void setup(){
        PanelForceDataCreator.CreateData();
        Id PC = [SELECT Id FROM PanelCategory__c LIMIT 1].Id;
        
        Contact c = [SELECT Id FROM Contact LIMIT 1];
        
        PH_Assessment__c Assessment = new PH_Assessment__c (Contact__c=c.Id);
        
        insert Assessment;
        
        AssessmentLineItem__c ALI = new AssessmentLineItem__c(PanelCategory__c = PC, PH_Assessment__c = Assessment.Id, score__c=10, comment__c ='nice job', interviewed__c = false);
        
        
        insert ALI;
    }
    
    @isTest static void testSaveALI(){
        //AssessmentLineItemController ALIC = new AssessmentLineItemController();
        AssessmentLineItem__c ALI = [SELECT Id, score__c, comment__c, interviewed__c FROM AssessmentLineItem__c];
        
        Id ALIId = ALI.Id;
        
        AssessmentLineItemController.saveALI(ALIId, 5, 'Blah', true);
        //System.assertEquals([SELECT Id, score__c, comment__c, interviewed__c FROM AssessmentLineItem__c] );
        ALI = [SELECT Id, score__c, comment__c, interviewed__c FROM AssessmentLineItem__c WHERE Id =: ALIId];
        System.assertEquals(5, ALI.Score__c);
        System.assertEquals('Blah', ALI.comment__c);
        System.assertEquals(false, ALI.interviewed__c);
        
    }
    
}