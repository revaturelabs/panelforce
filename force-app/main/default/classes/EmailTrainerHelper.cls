public without sharing class EmailTrainerHelper {
    public static void ETrainer(List<PH_Assessment__c> assessmentList) {
        
        List<Id> listOfContactIds = new List<Id>();
        
        ID panelRecordTypeId = [SELECT Id FROM RecordType WHERE Name = 'Panel'][0].Id;
        
        // Get a list of the Associate IDs using the Assessments that are Panels; not QC.
        for (PH_Assessment__c assessment : assessmentList) {
            if (assessment.recordTypeID == panelRecordTypeId)
                listOfContactIds.add(assessment.Contact__c);
        }
        
        // List of Associates
        List<Contact> contactList = new List<Contact>();
        for (Contact associate : [SELECT Name FROM Contact where Id IN :listOfContactIds]) {
            contactList.add(associate);
        }
        
        // List of Training Assignments given the above list of Associates
        List<PH_TrainingAssignment__c> associateTrainingAssignments = new List<PH_TrainingAssignment__c>();
        for (PH_TrainingAssignment__c trainingAssignment : [SELECT Contact__c, PH_Training__r.ownerID
                                                            FROM PH_TrainingAssignment__c
                                                            WHERE Contact__c IN :listOfContactIds]) {
            associateTrainingAssignments.add(trainingAssignment);
        }
        
        List<Id> trainerIds = new List<Id>();
        for (PH_TrainingAssignment__c trainingAssignment : associateTrainingAssignments ) {
            trainerIds.add(trainingAssignment.PH_Training__r.ownerId);
        }
        List<User> userList = new List<User>();
        for (User trainer : [SELECT Id, Email FROM User WHERE Id in :trainerIds]) {
            userList.add(trainer);
        }
    

        for (Contact associate : contactList) {
            String [] toaddress;
            for (PH_TrainingAssignment__c trainingAssignment : associateTrainingAssignments) {
                if (trainingAssignment.Contact__c == associate.id) {
                    for (User trainer : userList) {
                        if (trainer.Id == trainingAssignment.PH_Training__r.ownerId)
                            toaddress = new String[]{trainer.email}; 
                    }
                }
            }
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setSubject('Candidate has taken their panel.');

            String sCandidate = 'Candidate has taken their panel.\n' + associate.Name;
   
            email.setPlainTextBody(sCandidate);
            email.setToAddresses(toaddress);
            // Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
        }
    }
}