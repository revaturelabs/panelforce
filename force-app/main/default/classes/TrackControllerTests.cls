@isTest
public class TrackControllerTests {

    @TestSetup
    static void makeData(){
        // Creating test Contact records
        Contact newContact = new Contact(FirstName = 'Patrick', LastName = 'Star');
        insert newContact;
        // Creating test TrainingTrack records
        PH_TrainingTrack__c newTrainingTrack = new PH_TrainingTrack__c(Name = 'Salesforce');
        insert newTrainingTrack;
    }

    @isTest
    static void testcreateData() {
        Contact c = [SELECT Id FROM Contact];
        PH_TrainingTrack__c t = [SELECT Id FROM PH_TrainingTrack__c];
        TrackController.createData(c.Id,t.Id);
    }
}
