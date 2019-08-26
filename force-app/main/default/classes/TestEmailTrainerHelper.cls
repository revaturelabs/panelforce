@isTest(seeAllData=true)
public class TestEmailTrainerHelper {

    @isTest
    static void testEmailTrainer() {
        EmailTrainerHelper.ETrainer(new List<PH_Assessment__c>{[SELECT Contact__c, RecordTypeId FROM PH_Assessment__c WHERE Contact__c = '0032K00002HY4jbQAD' LIMIT 1]});
    }
}