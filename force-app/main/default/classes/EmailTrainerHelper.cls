public with sharing class EmailTrainerHelper {
    public static void ETrainer(List<PH_Assessment__c> phAList) {
        System.debug(phAList);
        List<ID> cIDList = new List<ID>();
        // 
        for (PH_Assessment__c phA : phAList) {
            cIDList.add(phA.Contact__c);
        }
        List<Contact> cList = [SELECT Name FROM Contact where ID IN :cIDList];
        system.debug(cList);
    List<ph_trainingassignment__c> phTList = [SELECT PH_Training__r.ownerID
                                            FROM ph_trainingassignment__c
                                            WHERE Contact__c IN :cIDList];
    system.debug(phTList);


    string [] toaddress= New string[]{[SELECT email FROM user WHERE id = :phTList[0].PH_Training__r.ownerID][0].email};
    system.debug([SELECT email FROM user WHERE id = :phTList[0].PH_Training__r.ownerID][0].email);
    
    for (Contact c : cList) {
    Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
    email.setSubject('Candidate has taken their panel.');

    String sCandidate = 'Candidate has taken their panel.\n';
        sCandidate += c.Name + '\n';
   
    email.setPlainTextBody(sCandidate);
    email.setToAddresses(toaddress);
    Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
    }
     }

}
