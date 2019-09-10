public class CreateAliController {
    @AuraEnabled
    public static List<AssessmentLineItem__c> getAssessmentLineItems(Id contactId, Id createdAssessment) {
  
        if ([SELECT Id FROM PH_Assessment__c WHERE Contact__c = :contactId].size() == 1){
            return createAssessmentLineItemsWhenPanelCreated(contactId, createdAssessment);
        }
        else{
            return createAssessmentLineItemsForRepanelTopics(contactId, createdAssessment);
        }
        
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> createAssessmentLineItemsWhenPanelCreated(Id contactId, Id assessmentId) {
        
        // Get training assignment associated with contact
        PH_TrainingAssignment__c ta = [SELECT Id, PH_Training__c, Name 
                                       FROM PH_TrainingAssignment__c 
                                       WHERE Contact__c = :contactId 
                                       ORDER BY CreatedDate DESC LIMIT 1];
        
        // Get Training associated with training assignment
        PH_Training__c training = [SELECT Id, PH_TrainingTrack__c, Name 
                                   FROM PH_Training__c 
                                   WHERE Id = :ta.PH_Training__c 
                                   ORDER BY CreatedDate DESC LIMIT 1];     
        
        // Get training track associated with training
        PH_TrainingTrack__c track = [SELECT Id, Name 
                                     FROM PH_TrainingTrack__c 
                                     WHERE Id = :training.PH_TrainingTrack__c];
        
        // Get the panel categories for that training track
        List<PanelCategory__c> categories = [SELECT Id, maxScore__c, Name 
                                             FROM PanelCategory__c 
                                             WHERE PH_TrainingTrack__c = :track.Id];
        
        // Create new assessment line items based on categories for insert
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        for (PanelCategory__c category : categories) {
            AssessmentLineItem__c ali = new AssessmentLineItem__c();
            ali.PanelCategory__c = category.Id;
            ali.PH_Assessment__c = assessmentId;
            ali.maxScore__c = category.maxScore__c;
            ali.PanelCategoryName__c = category.Name;
            assessmentLineItems.add(ali);
        }
        
        insert assessmentLineItems;
        return assessmentLineItems;
    }
    
    @AuraEnabled
    public static List<AssessmentLineItem__c> createAssessmentLineItemsForRepanelTopics(Id contactId, Id assessmentId) {
        PH_Assessment__c mostRecentPanel = [SELECT Id FROM PH_Assessment__c 
                                            WHERE Contact__c = :contactId 
                                            ORDER BY CreatedDate DESC LIMIT 1 OFFSET 1];
        
        List<AssessmentLineItem__c> topicsToRepanel = [SELECT PanelCategory__c, maxScore__c, PanelCategoryName__c 
                                                       FROM AssessmentLineItem__c 
                                                       WHERE PH_Assessment__c = :mostRecentPanel.Id AND Interviewed__c = false];
        
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        
        for (AssessmentLineItem__c ali : topicsToRepanel){
            AssessmentLineItem__c newAli = new AssessmentLineItem__c();
            newAli.PanelCategory__c = ali.PanelCategory__c;
            newAli.PH_Assessment__c = assessmentId;
            newALI.maxScore__c = ali.maxScore__c;
            newALI.PanelCategoryName__c = ali.PanelCategoryName__c;
            assessmentLineItems.add(newAli);
        }
        
        insert assessmentLineItems;
        return assessmentLineItems;
    }
}