@isTest
public class TrackControllerTests {
    
    @testSetup
    static void testSetup()
    {
        PanelForceTestDataCreator.createData();
    }
    
	@isTest
    static void testAll() 
    {
        /*
        TrackController.getAccount('0012K00001ahcKnQAI');
        TrackController.getContact('0032K00002HY4jbQAD');
        PH_TrainingTrack__c testTrackAssignment = TrackController.getTrack('0032K00002HY4jbQAD');
        TrackController.createData('0032K00002HY4jbQAD', 'a032K00000St5EaQAJ');
		*/
        Contact testContact = [SELECT Id, LastName FROM Contact LIMIT 1]; //Grabs one of the newly created Contacts from TestSetup, their Id and their Last Name.
        Test.startTest();
            try {
                    
                	
                
                	String lastName = TrackController.getAssociateLastName(testContact.id);
                	System.assert(lastName.equals(testContact.LastName)); //Shows that getAssociateName successfully passes back the associates last name.
                
                	PH_TrainingTrack__c retrievedTrack = TrackController.getTrack(testContact.id);
                	System.assert((retrievedTrack.Name).equals('Salesforce')); //Shows that the Track was successfully retrieved from a Contact Id.
                } catch (Exception e) 
                {
                    
                }
        Test.stopTest();
       }
}