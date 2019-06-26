@isTest
public with sharing class PanelViewTrackMiscControllerTest {

@TestSetup
static void makeData(){
  // Setup test data
        // Create a unique UserName
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        // This code runs as the system user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
        LocaleSidKey='en_US', ProfileId = p.Id,
        TimeZoneSidKey='America/Los_Angeles',
         UserName=uniqueUserName);  
}

@IsTest
static void fetchAssessmentsTest(){
    
    Test.startTest();
    System.runAs([SELECT Id FROM User LIMIT 1][0]){
        
    }
    Test.stopTest();
}

@IsTest
static void fetchRecordTypeIdTest(){

    Test.startTest();
    System.runAs([SELECT Id FROM User LIMIT 1][0]){
        
    }
    Test.stopTest();
}
}
