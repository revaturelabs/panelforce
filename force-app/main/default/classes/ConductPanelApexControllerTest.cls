// Test for the end assessment button
@isTest
public class ConductPanelApexControllerTest {
    @testSetup
    public static void setup(){
        PanelForceDataCreator.createData(); //does not make assessments
        Id contactId = [SELECT Id FROM Contact LIMIT 1].Id;
        PH_Assessment__c newAssessment = new PH_Assessment__c();
        newAssessment.Contact__c = contactId;
        newAssessment.Interview_Date__c = System.today();
        newAssessment.Interview_Start__c = System.now().time();
        newAssessment.OverallPass__c = true;
        // insert newAssessment
        insert newAssessment;
    }
    @isTest
    public static void setNewStopTimeForAssessmentTest(){
        PH_assessment__c asst = [SELECT Id, Interview_End_Time__c FROM PH_Assessment__c LIMIT 1];
        System.debug('About to call setnewstoptimeforassessment');
        ConductPanelApexController.apexSetNewStopTimeForAssessment(asst.id);
        asst = [SELECT Id, Interview_End_Time__c FROM PH_Assessment__c LIMIT 1]; //get updated asst
        System.assertequals(System.now().time().second(), asst.Interview_End_Time__c.second());
    }
}