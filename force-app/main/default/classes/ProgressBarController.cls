public without sharing class ProgressBarController {
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> getCategories(){
        return [SELECT Name, Status__c, Interviewed__c FROM AssessmentLineItem__c];
    }
}