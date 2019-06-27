public with sharing class EmailTrainerHelper {
    public static void ETrainer(List<PH_Assessment__c> phAList) {
        List<ID> cIDList = new List<ID>();
        ID rID = [SELECT id FROM recordtype WHERE name = 'Panel'][0].id;
        for (PH_Assessment__c phA : phAList) {
            if (phA.recordtypeID == rID) cIDList.add(phA.Contact__c);
        }
        List<Contact> cList = new List<Contact>();
        for (Contact c : [SELECT Name FROM Contact where ID IN :cIDList]) {
            cList.add(c);
        }
        List<ph_trainingassignment__c> phTList = new List<ph_trainingassignment__c>();
        for (ph_trainingassignment__c phT : [SELECT contact__c, PH_Training__r.ownerID
                                                FROM ph_trainingassignment__c
                                                WHERE Contact__c IN :cIDList]) {
            phTList.add(phT);
        }
        List<ID> phTIDList = new List<ID>();
        for (Ph_TrainingAssignment__c phT : phTList) {
            phTIDList.add(phT.PH_Training__r.ownerID);
        }
        List<User> uList = new List<User>();
        for (User u : [SELECT id, email FROM user WHERE id in :phTIDList]) {
            uList.add(u);
        }
    

        for (Contact c : cList) {
            string [] toaddress;
            for (ph_trainingassignment__c phT : phTList) {
                if (phT.contact__c == c.id) {
                    for (User u : uList) {
                        if (u.id == phT.PH_Training__r.ownerID) toaddress= new String[]{u.email}; 
                    }
                }
            }
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setSubject('Candidate has taken their panel.');

            String sCandidate = 'Candidate has taken their panel.\n' + c.Name;
   
            email.setPlainTextBody(sCandidate);
            email.setToAddresses(toaddress);
            // Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
        }
    }
}
