@isTest(seeAllData=true)
public class InterviewMainControllerTests {
	@isTest
    static void testGetUpdatedCategories() {
        InterviewMainController.getUpdatedCategories([SELECT Id, Name, Score__c, maxScore__c, Status__c, Interviewed__c, Comment__c 
                                               FROM AssessmentLineItem__c]);
    }
}