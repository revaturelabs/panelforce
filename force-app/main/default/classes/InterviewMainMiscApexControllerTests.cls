@isTest(seeAllData=true)
public class InterviewMainMiscApexControllerTests {
    @isTest
    static void testInsertTimeStamp(){
//1        
        Contact c1 = new Contact(LastName='Joe');
        PH_Assessment__c ph1 = new PH_Assessment__c(Interview_Date__c=Date.newInstance(2019, 08, 29));
        insert ph1;
        List<Integer> testTime1 = new List<Integer>{1,4,5};
       
        
        InterviewMainMiscApexController.insertTimeStamp(testTime1, ph1);
        List<PH_Assessment__c> phList = [SELECT Interview_Date__c FROM PH_Assessment__c WHERE Interview_Date__c = :ph1.Interview_Date__c LIMIT 1];
        System.assertEquals(ph1.Interview_Date__c, phList.get(0).Interview_Date__c, 'It Doesn\'t work');
//2
        Contact c2 = new Contact(LastName='Lucy');
        PH_Assessment__c ph2 = new PH_Assessment__c(Interview_Date__c=Date.newInstance(2019, 08, 30));
        insert ph2;
        List<Integer> testTime2 = new List<Integer>{1,3,7,9};
        
        InterviewMainMiscApexController.insertTimeStamp(testTime2, ph2);
        phList = [SELECT Interview_Date__c FROM PH_Assessment__c WHERE Interview_Date__c = :ph2.Interview_Date__c LIMIT 1];
        System.assertEquals(ph2.Interview_Date__c, phList.get(0).Interview_Date__c, 'It Doesn\'t work');

//3
        PH_Assessment__c ph3 = new PH_Assessment__c(Interview_Date__c=Date.newInstance(2019, 08, 31));
        insert ph3;
        List<Integer> testTime3 = new List<Integer>{1,3,7,9,100};
        
        InterviewMainMiscApexController.insertTimeStamp(testTime3, ph3);
        phList = [SELECT Interview_Date__c FROM PH_Assessment__c WHERE Interview_Date__c = :ph3.Interview_Date__c LIMIT 1];
        System.assertEquals(ph3.Interview_Date__c, phList.get(0).Interview_Date__c, 'It Doesn\'t work');
    }
    
        
    
    
    
        
}