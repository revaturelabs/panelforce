public with sharing class PanelCategories {
    @AuraEnabled
    public static void saveAssessment(List<	AssessmentLineItem__c> aLIList, PH_Assessment__c assessment){
        upsert aLIList;
        upsert assessment;
    }

    @AuraEnabled
    public static String getTrack(ID contactID){
        return [SELECT PH_TrainingTrack__r.Name
        FROM PH_Training__c
        WHERE ID IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactID)][0].PH_TrainingTrack__r.Name;
    }

    @AuraEnabled
    public static Integer getNumberofTries(ID contactID){
        return (Integer)[SELECT Contact__c, COUNT(ID) c 
        FROM PH_Assessment__c
        WHERE Contact__c = :contactID
        GROUP BY Contact__c][0].get('c');
    }
}