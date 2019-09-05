@isTest
public class TrackControllerTests {
    
    @testSetup
    static void testSetup(){
        PanelForceTestDataCreator.createData();
    }
    
    @isTest
    static void testGetAssociateLastName() {
        //Grabs one of the newly created Contacts from TestSetup, their Id and their Last Name.
        Contact testContact = [SELECT Id, LastName FROM Contact LIMIT 1];
        
        Test.startTest();
        
        String lastName = TrackController.getAssociateLastName(testContact.id);
        //Shows that getAssociateName successfully passes back the associates last name.
        System.assert(lastName.equals(testContact.LastName)); 
        
        Test.stopTest();
    }
    
    @isTest
    static void testGetTrack() {
        //Grabs one of the newly created Contacts from TestSetup, their Id and their Last Name.
        Contact testContact = [SELECT Id, LastName FROM Contact LIMIT 1]; 
        
        Test.startTest();
     
        PH_TrainingTrack__c retrievedTrack = TrackController.getTrack(testContact.id);
        //Shows that the Track was successfully retrieved from a Contact Id.
        System.assert((retrievedTrack.Name).equals('Salesforce')); 
        
        Test.stopTest();
    }
}