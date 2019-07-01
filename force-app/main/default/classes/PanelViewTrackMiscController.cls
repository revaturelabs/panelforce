public with sharing class PanelViewTrackMiscController {

@AuraEnabled
public static List<PH_Assessment__c> fetchAssessments(PH_Assessment__c ass) {

        // Query records from PH_Assessment__c and return query.
        return [SELECT Id, Interview_Date__c, Interview_Start__c, Total_Score__c, OverallPass__c
                FROM PH_Assessment__c
                WHERE Contact__c = :ass.Contact__c];
    }

    public static Id fetchRecordTypeId() {
            return [SELECT Id FROM RecordType WHERE name = 'Panel'][0].Id;
    }
}