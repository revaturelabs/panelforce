public with sharing class TrackController {
    // class for passing information back to InterviewInitial component.
    @AuraEnabled
    public static Account getAccount(Id accountId) {
        // may be needed later
        return [SELECT Id, Name  FROM Account LIMIT 1];
    }

    @AuraEnabled
    public static String getContact(Id contactId) {
        // method to get the Contact record for InterviewInitial component.
        List<Contact> cl = new List<Contact>();
        String lastName;

        cl = [SELECT Id, Lastname, Firstname FROM Contact WHERE Id = :contactId];
        for (Contact c : cl) {
                System.debug(c.Lastname);
                if (c.Id == contactId) {
                    System.debug(c.Id + ' ' + c.Lastname);
                    lastName = c.Lastname;
                }
        }
        return lastName;
    }

    @AuraEnabled
    Public Static String getTrack(Id contactId) {
        // method to get the Track Name for the InterviewInitial component.
        String trackName;
        trackName = [SELECT PH_TrainingTrack__r.Name FROM PH_Training__c WHERE Id IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId)][0].PH_TrainingTrack__r.Name;
        return trackName;
    }

    // There's no direct relationship in the data model
    // hence the SOQL statement below.
    //public cody() {
    //    [SELECT PH_TrainingTrack__r.Name FROM PH_Training__c
    //    WHERE Id IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId)][0].PH_TrainingTrack__r.Name;
    //}

    public TrackController() {

    }
}