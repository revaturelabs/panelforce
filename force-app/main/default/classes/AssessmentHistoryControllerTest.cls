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
    
    
	@isTest(SeeAllData=True)
	public static void getAssessmentsTest()
    {
        Contact testContact = getTestContact();
        List<PH_Assessment__c> testList = AssessmentHistoryController.getAssessments(testContact.Id);
        System.debug('getAssess Test: 0' + testList);
    }
}