@isTest(seeAllData=true)
public class InterviewMainMiscApexControllerTests {

/**
    @TestSetup
    static void makeData(){
        Contact c = new Contact(LastName='Joe');
        PH_Assessment__c ph = new PH_Assessment__c(Name='PH1');
        List<Integer> testTime1 = new List<Integer>{1,4,5};
    }
**/
	@isTest
    static void testAll() {
        InterviewMainMiscApexController.insertTimeStamp(new List<Integer>{1,4,5}, [SELECT Id FROM PH_Assessment__c WHERE Id = 'a012K000020Jb4IQAS']);
        InterviewMainMiscApexController.totalTimeDiff(5, [SELECT Id FROM PH_Assessment__c WHERE Id = 'a012K000020Jb4IQAS' LIMIT 1]);
        InterviewMainMiscApexController.updateCategory([SELECT Id FROM AssessmentLineItem__c WHERE Id = 'a002K00000qPd8RQAS' LIMIT 1]);
    }

    @isTest
    static void testInsertTimeStamp(){
        
        Contact c = new Contact(LastName='Joe');
        PH_Assessment__c ph = new PH_Assessment__c(Name='PH1');
        insert ph;
        List<Integer> testTime1 = new List<Integer>{1,4,5};
        
        InterviewMainMiscApexController.insertTimeStamp(testTime1, ph);
        System.assertEquals(ph.Name, [SELECT Name FROM PH_Assessment__c WHERE Name = :ph.Name], 'It Doesn\'t work');
    }
    
        
    
    
    
        
}