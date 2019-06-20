public with sharing class PanelViewCategoriesController {
    @AuraEnabled
    public static List<AssessmentLineItem__c> fetchLineItems(string PanelId){
        List<AssessmentLineItem__c> lineItems = [SELECT Id, Name, Score__c, status__c FROM AssessmentLineItem__c WHERE PH_Assessment__c =  :PanelId];
        System.debug(lineItems);
        return lineItems;
    }
    // public PanelViewCategoriesController() {

    // }
}