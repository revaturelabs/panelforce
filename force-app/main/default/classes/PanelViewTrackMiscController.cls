public with sharing class PanelViewTrackMiscController {

@AuraEnabled
public static List<PH_Assessment__c> fetchAssessments() {

        // Query records from PH_Assessment__c and return query.
        return [SELECT Id, Name
                FROM PH_Assessment__c];
    }
}
