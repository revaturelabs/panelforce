public without sharing class InterviewMainScoreApexController {
    @AuraEnabled
   public static  AssessmentLineItem__c updateCategories(AssessmentLineItem__c item){
       update item;
       return item;
   }


}