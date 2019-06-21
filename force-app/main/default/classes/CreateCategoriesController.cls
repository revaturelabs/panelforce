public class CreateCategoriesController {
 
    @AuraEnabled
    public static List<PanelCategory__c> getCategories(){
        return [SELECT Id, Name, maxScore__c, PH_TrainingTrack__c
                FROM PanelCategory__c];
    }
    
    @AuraEnabled
    public static PanelCategory__c saveCategories(PanelCategory__c panel) {
        // Need to ask if this is correct way of doing this. This will save all new panels to database and we
        // want to create new categories for tracks without seeing exisiting categories.
        // Fix so user has ability to save a category to the proper track.
        if (panel.PH_TrainingTrack__c == null) {
            panel.PH_TrainingTrack__c = [SELECT Id FROM PH_TrainingTrack__c LIMIT 1].Id;
        }
        PanelCategory__c result;
        if (panel.Id == null) {
            result = panel;
        } else {
            result = null;
        }

        upsert panel;
        return result;
    }

    @AuraEnabled
    public static PanelCategory__c removeCategory(PanelCategory__c panel) {
        delete panel;
        return panel;
    }
    
}