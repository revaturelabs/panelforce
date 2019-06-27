@isTest
public with sharing class testInterviewMainController {
    
    @isTest static void TestgetUpdatedCategories() {
        List<AssessmentLineItem__c> assLI = [SELECT Id FROM AssessmentLineItem__c LIMIT 2];
        for (AssessmentLineItem__c ass : assLI) {
            ass.Score__c = 2;
        }
        update assLI;

         List<AssessmentLineItem__c> res = InterviewMainController.getUpdatedCategories(assLI);
         for (AssessmentLineItem__c ass : res) {
             System.assertEquals(2, ass.Score__c);
         }
    }
}
