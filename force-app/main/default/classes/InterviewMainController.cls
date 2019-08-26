public without sharing class InterviewMainController {
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> getUpdatedCategories(List<AssessmentLineItem__c> oldRecs){
        List<AssessmentLineItem__c> newRecs = [SELECT Id, Name, Score__c, maxScore__c, Status__c, Interviewed__c, Comment__c 
                                               FROM AssessmentLineItem__c WHERE Id IN :oldRecs];

        return newRecs;
    }

}