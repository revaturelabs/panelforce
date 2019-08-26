public without sharing class TrackController {
    // class for passing information back to InterviewInitial component.
    @AuraEnabled
    public static Account getAccount(Id accountId) {
        // may be needed later
        return [SELECT Id, Name  FROM Account LIMIT 1];
    }

    @AuraEnabled
    Public Static String getContact(Id contactId) {
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
    Public Static PH_TrainingTrack__c getTrack(Id contactId) {
        // method to get the Track Name for the InterviewInitial component.
        Id trackId = [SELECT PH_TrainingTrack__r.Name FROM PH_Training__c WHERE Id IN (SELECT PH_Training__c FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId)][0].PH_TrainingTrack__r.Id;
        return [SELECT Id, Name FROM PH_TrainingTrack__c WHERE Id = :trackId];
    }

    @AuraEnabled
    Public Static List<AssessmentLineItem__c> createData(Id contactId, Id trackId) {
        PH_Assessment__c a = new PH_Assessment__c();
        // populate Name and Contact__c
        
        a.Name = 'Panel';
        a.Contact__c = contactId;
        insert a;

        // should really put SELECT into List
        // List<PanelCategory__c> pcl = new List<PanelCategory__c>();

        List<AssessmentLineItem__c> loali = new List<AssessmentLineItem__c>();
        // create LineItems (one item per PanelCategory__c)
        List<PanelCategory__c> allpcs = [SELECT Name, Id, maxScore__c FROM PanelCategory__c WHERE PH_TrainingTrack__c = :trackId];
        for (PanelCategory__c pc : allpcs) {
            AssessmentLineItem__c li = new AssessmentLineItem__c();
            System.debug(pc.Id);
            li.PH_Assessment__c = a.Id;
            li.PanelCategory__c = pc.Id;
            li.Name = pc.Name;
            li.maxScore__c = pc.maxScore__c;
            li.Score__c = pc.maxScore__c;
            li.Interviewed__c = false;
            li.Status__c = false;
            li.Comment__c = '';
            loali.add(li);
        }
        insert loali;
        return loali;
    }
    public TrackController() {

    }
}