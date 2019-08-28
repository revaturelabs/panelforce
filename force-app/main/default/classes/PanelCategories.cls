public without sharing class PanelCategories {
    // Saving the assessment
    @AuraEnabled
    public static void saveAssessment(List<AssessmentLineItem__c> aLIList, PH_Assessment__c assessment){
        System.debug('aLIList: ' + aLIList);
        System.debug('assessment: ' + assessment);
        insert aLIList;
        insert assessment;
    }

    // Retrieve the track that a candidate is on
    // Question: there are multiple tracks per candidate why do we only select the first one
    @AuraEnabled
    public static String getTrack(ID contactID){
        return [SELECT PH_TrainingTrack__r.Name
        FROM PH_Training__c
        WHERE ID IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactID)][0].PH_TrainingTrack__r.Name;
    }

    // Retrieving the number of panels that was taken by the candidate
    @AuraEnabled
    public static Integer getNumberofTries(ID contactID){
        return (Integer)[SELECT Contact__c, COUNT(ID) c 
        FROM PH_Assessment__c
        WHERE Contact__c = :contactID
        GROUP BY Contact__c][0].get('c');
    }
}