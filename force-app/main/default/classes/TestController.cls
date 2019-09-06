public class TestController {
	@AuraEnabled
    public static List<AssessmentLineItem__c> getAssessmentLineItems() {
		return [SELECT PH_Assessment__r.Id, PH_Assessment__r.Contact__c, Score__c, maxScore__c, Comment__c, PanelCategory__r.Name 
                            FROM AssessmentLineItem__c 
                            WHERE Interviewed__c=false];
    }


}