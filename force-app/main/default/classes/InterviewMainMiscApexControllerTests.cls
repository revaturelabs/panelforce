@isTest(seeAllData=true)
public class InterviewMainMiscApexControllerTests {
	@isTest
    static void testAll() {
        InterviewMainMiscApexController.insertTimeStamp(new List<Integer>{1,4,5}, [SELECT Id FROM PH_Assessment__c WHERE Id = 'a012K000020Jb4IQAS']);
        InterviewMainMiscApexController.totalTimeDiff(5, [SELECT Id FROM PH_Assessment__c WHERE Id = 'a012K000020Jb4IQAS' LIMIT 1]);
        InterviewMainMiscApexController.updateCategory([SELECT Id FROM AssessmentLineItem__c WHERE Id = 'a002K00000qPd8RQAS' LIMIT 1]);
    }
}