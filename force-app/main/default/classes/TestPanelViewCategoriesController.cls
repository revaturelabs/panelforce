@isTest
public class TestPanelViewCategoriesController {
    
    @testSetup
    public static void setup() {
        PH_TrainingTrack__c testRecordPH_TrainingTrack = new PH_TrainingTrack__c();
        testRecordPH_TrainingTrack.Name = 'testRecordPH_TrainingTrack';
        insert testRecordPH_TrainingTrack;
        
        PanelCategory__c testRecordPanelCategory = new PanelCategory__c();
        testRecordPanelCategory.Name = 'testRecordPanelCategory';
        testRecordPanelCategory.PH_TrainingTrack__c = testRecordPH_TrainingTrack.id;
        insert testRecordPanelCategory;
        
        
        PH_Assessment__c testRecordPH_Assessment = new PH_Assessment__c();
        testRecordPH_Assessment.Name = 'testRecordtestRecordPH_Assessment';
        insert testRecordPH_Assessment;
        
        AssessmentLineItem__c testRecordAssessmentLineItem = new AssessmentLineItem__c();
        testRecordAssessmentLineItem.Name = 'testRecordAssessmentLineItem';
        testRecordAssessmentLineItem.PanelCategory__c = testRecordPanelCategory.Id;
        testRecordAssessmentLineItem.PH_Assessment__c = testRecordPH_Assessment.Id;    
        insert testRecordAssessmentLineItem;
    }
    
    @isTest
    public static void testFetchLineItems() {
        PH_Assessment__c testRecordPH_AssessmentId = [SELECT Id, Name FROM PH_Assessment__c WHERE Name = 'testRecordtestRecordPH_Assessment' LIMIT 1];
        List<AssessmentLineItem__c> testResultList = PanelViewCategoriesController.fetchLineItems(testRecordPH_AssessmentId.Id );
        System.assertEquals('testRecordAssessmentLineItem', testResultList[0].name);
    }
    
}