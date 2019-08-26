@isTest(seeAllData=true)
public class InterviewMainScoreApexControllerTests {
	@isTest
    static void testAll() {
        InterviewMainScoreApexController.updateCategories([SELECT Id, Name FROM AssessmentLineItem__c LIMIT 1]);
    }
}