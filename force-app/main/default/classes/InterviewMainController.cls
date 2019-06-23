public class InterviewMainController {
    
    @AuraEnabled
    public static PH_Assessment__c getTrainAssign(String recId){
        system.debug(recId);
        
        //recId = 'a014P00001qxYo7QAE';
        
        //Get the assignment from the recId
        // PH_Assessment__c assignment = [SELECT Id, Name, Contact__c
        //                                FROM PH_Assessment__c WHERE Id = :recId LIMIT 1];
        
        
        PH_Assessment__c assignment = [SELECT Id, Name, Contact__c
                                       FROM PH_Assessment__c LIMIT 1];
        
        return assignment;
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> getCategories(String recId){
        system.debug(recId);
        
        //recId = 'a014P00001qxYo7QAE';
        
        //Get the related categories from the recId
        // List<AssessmentLineItem__c> categories = [SELECT Id, PanelCategory__c, Name, Score__c, Interviewed__c, Status__c
        //                                           FROM AssessmentLineItem__c WHERE PH_Assessment__c = :recId];
        
        PH_Assessment__c assignment = [SELECT Id, Name, Contact__c
                                       FROM PH_Assessment__c LIMIT 1];
        recId = assignment.Id;
        
        List<AssessmentLineItem__c> categories = [SELECT Id, PanelCategory__c, Name, Score__c, Interviewed__c, Status__c
                                                  FROM AssessmentLineItem__c WHERE PH_Assessment__c = :recId];
        
        return categories;
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> getUpdatedCategories(List<AssessmentLineItem__c> oldRecs){
        List<AssessmentLineItem__c> newRecs = [SELECT Id, Score__c, maxScore__c, Status__c, Interviewed__c, Comment__c 
                                               FROM AssessmentLineItem__c WHERE Id IN :oldRecs];
        /*for(Integer n = 0; n < newRecs.size(); n++){
AssessmentLineItem__c newCat = newRecs[n];
AssessmentLineItem__c oldCat = oldRecs[n];


}*/
        
        return newRecs;
    }
    
}