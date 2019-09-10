@isTest
public class createTimestampControllerTest {
    @TestSetup
    public static void setup(){
        Contact contact = new Contact(LastName='contact1');
        PH_Assessment__c assessment = new PH_Assessment__c(Panelist__c=contact.id);
   
        
  
        insert contact;
        insert assessment;
 
    }
    
    @isTest
    public static void saveTimestampTest(){
        Integer initialNumTimestamps = [SELECT Count() FROM Time_Stamp__c]; //inital number of saved timestamps
        PH_Assessment__c assessment = [SELECT Id FROM PH_Assessment__c LIMIT 1]; 
        createTimestampController.saveTimestamp(assessment.Id, 'panel category'); //create and save timestamp
        Integer finalNumTimestamps = [SELECT Count() FROM Time_Stamp__c]; //final number of saved timestamps
        System.assertEquals(initialNumTimestamps+1, finalNumTimestamps);
        
    }
}