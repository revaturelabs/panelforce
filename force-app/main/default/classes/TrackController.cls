public with sharing class TrackController {
    @AuraEnabled
    public static Account getAccount(Id accountId) {
        // perform isAccessible here
        return [SELECT Id, Name  FROM Account LIMIT 1];
    }

    @AuraEnabled
    public static String getContact(Id contactId) {
        // perform isAccessible here
        // Contact c = new Contact();
        List<Contact> cl = new List<Contact>();
        //Contact returnContact = new Contact();
        String lastName;

        cl = [SELECT Id, Lastname, Firstname FROM Contact WHERE Id = :contactId];
        for (Contact c : cl) {
                System.debug(c.Lastname);
                if (c.Id == contactId) {
                    System.debug('yippi' + c.Id + ' ' + c.Lastname);
                    lastName = c.Lastname;
                    System.debug(lastName);
                }
        }
        return lastName;
        // return [SELECT Id, Lastname, Firstname FROM Contact WHERE Id = :accountId];
    }

    @AuraEnabled
    Public Static String getTrack(Id contactId) {
        String trackName;
        //List<PH_TrainingTrack__c> tl = new List<PH_TrainingTrack__c>();
        //for (PH_TrainingTrack__c t : tl) {
        //    if (t.Name == trackId.Name) {
        //        System.debug(t.Name);
        //        trackName = t.Name;
        //    }
        //}
        // trackName = [SELECT PH_TrainingTrack__r.Name FROM PH_Training__c WHERE Id IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId)][0].PH_TrainingTrack__r.Name;
        return 'trackName';
    }

    //public cody() {
    //    [SELECT PH_TrainingTrack__r.Name FROM PH_Training__c
    //    WHERE Id IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId)][0].PH_TrainingTrack__r.Name;
    //}

    public TrackController() {

    }
}