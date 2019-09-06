@isTest
public class createTimestampControllerTest {
	@TestSetup
    public static void setup(){
        Contact contact = new Contact(LastName='contact1');
        PH_Assessment__c assessment = new PH_Assessment__c(Panelist__c=contact.id);
        PH_TrainingTrack__c trainingTrack = new PH_TrainingTrack__c(Name='Training Track 1'); // must create trainingTrack as it is the parent of panelCategory
        insert trainingTrack;
        
        PanelCategory__c panelCategory = new PanelCategory__c(Name='Panel Category 1', PH_TrainingTrack__c=trainingTrack.Id );
        insert contact;
        insert assessment;
       // insert trainingTrack;
        insert panelCategory;
    }
    
    @isTest
    public static void saveTimestampTest(){
        Integer initialNumTimestamps = [SELECT Count() FROM Time_Stamp__c]; //inital number of saved timestamps
        PH_Assessment__c assessment = [SELECT Id FROM PH_Assessment__c LIMIT 1];
        PanelCategory__c panelCategory = [SELECT Id FROM PanelCategory__c LIMIT 1]; 
        createTimestampController.saveTimestamp(assessment.Id, panelCategory.Id); //create and save timestamp
        Integer finalNumTimestamps = [SELECT Count() FROM Time_Stamp__c]; //final number of saved timestamps
        System.assertEquals(initialNumTimestamps+1, finalNumTimestamps);
        
    }
}