@isTest //Note: You must have at least one Assessment assigned to one Contact in order for this to work.
public class AssessmentHistoryControllerTest {
    /*@testSetup
    public static void AHCtestSetup()
    {
        PanelForceTestDataCreator.createData();
    }*/
    
    @isTest(SeeAllData=True)
    public static Contact getTestContact()
    {
        List<Contact> allContacts = [SELECT Name, (SELECT Id, Name, Interview_Date__c, CreatedById, Comment__c 
                                                   FROM PH_Assessments__r)
                                    FROM Contact];
        Contact testContact = null;
        //Looks through all contacts and picks the first one it finds with an Assessment related to it.
        for(Contact someContact : allContacts)
        {
            if(someContact.PH_Assessments__r.Size() != 0)
            {
                testContact = someContact;
                break;
            }
        }
        
        if(testContact == null)
        {
            System.debug('No Contacts with Assessments Exist!');
        }
        
        return testContact;
    }
    /**
    @isTest(SeeAllData=True)
	public static void getMapAssessmentsToALIsTest()
    {
        Contact testContact = getTestContact();
        Map<PH_Assessment__c, List<AssessmentLineItem__c>> testMap = AssessmentHistoryController.getMapAssessmentsToALIs(testContact.Id);
        /*
        Set<String> keys = testMap.keySet();
        String firstKey = keys[0];
        List<AssessmentLineItem__c> testLineItems = testMap.get(firstKey);
        System.debug('MapALIs Test: ' + testLineItems);
        
	}
    /**
    @isTest(SeeAllData=True)
    public static void getMapOfAssessmentsToInfoMapTest()
    {
        Contact testContact = getTestContact();
        Map<PH_Assessment__c,Map<String, String>> testMap = AssessmentHistoryController.getMapOfAssessmentsToInfoMap(testContact.Id);
        /*
        Set<String> keys = testMap.keySet();
        String firstKey = keys[0];
        Map<String, String> testInfo = testMap.get(firstKey);
        Set<String> secondarykeys = testInfo.keySet();
        String secondKey = secondarykeys[0];
        System.debug('MapAssessInfo Test: ' + testInfo);
		
	}
    */
    
	@isTest(SeeAllData=True)
	public static void getAssessmentsTest()
    {
        Contact testContact = getTestContact();
        List<PH_Assessment__c> testList = AssessmentHistoryController.getAssessments(testContact.Id);
        System.debug('getAssess Test: 0' + testList);
    }
    /**
    @isTest(SeeAllData=True)
    public static void getFailedAssessmentLineItemsTest()
    {
        Contact testContact = getTestContact();
        PH_Assessment__c someAssessment = [SELECT Id FROM PH_Assessment__c WHERE Contact__c=:testContact.Id LIMIT 1];
        List<AssessmentLineItem__c> testList = AssessmentHistoryController.getFailedAssessmentLineItems(someAssessment);
        System.debug('getFaliedALIs Test: 0' + testList);
    }
    **/
}