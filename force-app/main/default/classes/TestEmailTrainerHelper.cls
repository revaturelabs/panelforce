@isTest
public class TestEmailTrainerHelper {
    @testSetup
    public static void setup(){
        PH_Assessment__c tempRecord1 = new PH_Assessment__c();
        insert tempRecord1;
        PH_Assessment__c tempRecord2 = new PH_Assessment__c();
        insert tempRecord2;
        PH_Assessment__c tempRecord3 = new PH_Assessment__c();
        insert tempRecord3;
        contact c = new contact();
        c.lastName = 'Joe';
        insert c;
    }
    
    @isTest
    Public static void testETrainer () {
        List<PH_Assessment__c> myList = new List<PH_Assessment__c>();
        myList = [SELECT Id, recordTypeID FROM PH_Assessment__c];    
        
        EmailTrainerHelper.ETrainer(myList); {
            
        }
    }
}