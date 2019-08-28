@isTest
public class PanelCategoriesTests {
    
    @testSetup
    static void setup() {
        // created one test contact 
        Contact newContact = new Contact(FirstName = 'Billy', LastName = 'Bob');
        insert newContact;
        // created one test Assessment
        PH_Assessment__c newAssessment = new PH_Assessment__c( Contact__c = newContact.Id);
        insert newAssessment;
    }
    
    
    @isTest
    static void testgetNumberofTries() {
        Contact c = [SELECT Id FROM Contact];
        PanelCategories.getNumberofTries(c.Id);
    }
}
