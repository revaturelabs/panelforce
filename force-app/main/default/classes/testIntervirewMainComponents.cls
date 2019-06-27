@isTest(seeAllData=true)
public with sharing class testIntervirewMainComponents {
    
    @isTest static void TestScore() {
        AssessmentLineItem__c assLI = [SELECT Id, Comment__c FROM AssessmentLineItem__c LIMIT 1];
        assLI.Comment__c = 'TestComm';

        AssessmentLineItem__c res = InterviewMainScoreApexController.updateCategories(assLI);
        System.assertEquals('TestComm', [SELECT Id, Comment__c FROM AssessmentLineItem__c WHERE Id = :assLI.Id LIMIT 1].Comment__c);        
    }
}
