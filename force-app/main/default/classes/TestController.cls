public class TestController {
    @AuraEnabled
    public static List<AssessmentLineItem__c> getAssessmentLineItems(Id contactId, Id createdAssessment) {
        system.debug('Contact Id : ' + contactId);
        system.debug('Assessment Id : ' + createdAssessment);
        
        if ([SELECT Id FROM PH_Assessment__c WHERE Contact__c = :contactId].size() == 1)
            return createAssessmentLineItemsWhenPanelCreated(contactId, createdAssessment);
        else
            return createAssessmentLineItemsWhenPanelCreated(contactId, createdAssessment);
            //return createAssessmentLineItemsForRepanelTopics(contactId);
        /*return [SELECT Id, Score__c, maxScore__c, Comment__c, PanelCategory__r.Name 
FROM AssessmentLineItem__c 
WHERE PH_Assessment__r.Contact__c = :contactId AND CreatedDate = TODAY];
*/
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> createAssessmentLineItemsWhenPanelCreated(Id contactId, Id assessmentId) {
        // create new Assessment record
        //PH_Assessment__c panel = new PH_Assessment__c();
        //panel.RecordTypeId = '0121g0000003XJQAA2';
        
        
        // Get training assignment associated with contact
        PH_TrainingAssignment__c ta = [SELECT Id, PH_Training__c, Name FROM PH_TrainingAssignment__c WHERE Contact__c = :contactId ORDER BY CreatedDate DESC LIMIT 1];
        System.debug('ta: ' + ta);
        
        // Get Training associated with training assignment
        PH_Training__c training = [SELECT Id, PH_TrainingTrack__c, Name FROM PH_Training__c WHERE Id = :ta.PH_Training__c ORDER BY CreatedDate DESC LIMIT 1];     
        System.debug('training: ' + training);
        
        // Get training track associated with training
        PH_TrainingTrack__c track = [SELECT Id, Name FROM PH_TrainingTrack__c WHERE Id = :training.PH_TrainingTrack__c];
        System.debug('track: ' + track);
        
        // Get the panel categories for that training track
        List<PanelCategory__c> categories = [SELECT Id, maxScore__c, Name FROM PanelCategory__c WHERE PH_TrainingTrack__c = :track.Id];
        System.debug('categories: ' + categories);
        
        // Create new assessment line items based on categories for insert
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        for (PanelCategory__c category : categories) {
            AssessmentLineItem__c ali = new AssessmentLineItem__c();
            System.debug('new ali created');
            ali.PanelCategory__c = category.Id;
            ali.PH_Assessment__c = assessmentId;
            ali.maxScore__c = category.maxScore__c;
            ali.PanelCategoryName__c = category.Name;
            System.debug('new ali updated. Name: ' + ali.PanelCategoryName__c);
            assessmentLineItems.add(ali);
        }
        
        insert assessmentLineItems;
        system.Debug('ALIs: ' + assessmentLineItems);
        return assessmentLineItems;
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> createAssessmentLineItemsForRepanelTopics(Id contactId) {
        PH_Assessment__c mostRecentPanel = [SELECT Id FROM PH_Assessment__c WHERE Contact__c = :contactId ORDER BY CreatedDate DESC LIMIT 1];
        
        PH_Assessment__c panel = new PH_Assessment__c();
        panel.RecordTypeId = '0121g0000003XJQAA2';
        
        
        List<AssessmentLineItem__c> topicsToRepanel = [SELECT Id FROM AssessmentLineItem__c WHERE PH_Assessment__c = :mostRecentPanel.Id AND Interviewed__c = false];
        System.debug('Topics to repanel: ' + topicsToRepanel);
        
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        for (AssessmentLineItem__c ali : topicsToRepanel){
            AssessmentLineItem__c newAli = new AssessmentLineItem__c();
            newAli.PanelCategory__c = ali.PanelCategory__c;
            newAli.PH_Assessment__c = panel.Id;
            newALI.maxScore__c = ali.maxScore__c;
            assessmentLineItems.add(ali);
        }
        insert panel;
        insert assessmentLineItems;
        system.debug('ALIs: ' + assessmentLineItems);
        return assessmentLineItems;
    }
}