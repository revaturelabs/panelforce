public with sharing class ProgressBarController {
    
    @AuraEnabled
    public static List<CategoryLineItem__c> getCategories(){
        return [SELECT Name, Status__c, Interviewed__c FROM CategoryLineItem__c];
    }
}
