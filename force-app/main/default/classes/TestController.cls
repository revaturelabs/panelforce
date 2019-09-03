public class TestController {
	@AuraEnabled
    public static List<AssessmentLineItem__c> getAssessmentLineItems() {
		return [SELECT Id, Score__c, maxScore__c, Comment__c, PanelCategory__r.Name FROM AssessmentLineItem__c];
    }
}