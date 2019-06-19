public with sharing class PanelCategories {
@AuraEnabled
public static void saveAssessment(List<PanelCategory__c> pcList, PH_Assessment__c track){
upsert pcList;
upsert track;
}

@AuraEnabled
public static String getTrack(ID contactID){
// String trackName = 
return [SELECT PH_TrainingTrack__r.Name
FROM PH_Training__c
WHERE ID IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactID)][0].PH_TrainingTrack__r.Name;
// return trackName;
}

@AuraEnabled
public static Integer getNumberofTries(ID contactID){
// String trackName = 
return (Integer)[SELECT Contact__c, COUNT(ID) c 
FROM PH_Assessment__c
WHERE Contact__c = :contactID
GROUP BY Contact__c][0].get('c');
// return trackName;
}
}