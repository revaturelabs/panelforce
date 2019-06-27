public class InterviewMainController {
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> getUpdatedCategories(List<AssessmentLineItem__c> oldRecs){
        List<AssessmentLineItem__c> newRecs = [SELECT Id, Name, Score__c, maxScore__c, Status__c, Interviewed__c, Comment__c 
                                               FROM AssessmentLineItem__c WHERE Id IN :oldRecs];
        /*for(Integer n = 0; n < newRecs.size(); n++){
            AssessmentLineItem__c newCat = newRecs[n];
            AssessmentLineItem__c oldCat = oldRecs[n];


        }*/

        return newRecs;
    }

}