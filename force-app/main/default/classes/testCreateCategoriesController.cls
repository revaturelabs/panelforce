@isTest(seeAllData=true)
public with sharing class testCreateCategoriesController {
    
    @isTest static void testCategories() {
        System.assertEquals([SELECT Id, Name, maxScore__c, PH_TrainingTrack__c
                            FROM PanelCategory__c].size(), CreateCategoriesController.getCategories().size());

        PanelCategory__c pc = new PanelCategory__c();
        pc.Name = 'Test pc';
        pc.maxScore__c = 30;
        pc.Status__c = false;
        // pc.PH_TrainingTrack__c = [SELECT Id FROM PH_TrainingTrack LIMIT 1];

        PanelCategory__c res1 = CreateCategoriesController.saveCategories(pc);
        System.assertNotEquals(null, res1);
        System.assertNotEquals(null, res1.Id);

        PanelCategory__c res2 = CreateCategoriesController.saveCategories(res1);
        System.assertEquals(null, res2);

        PanelCategory__c delres = CreateCategoriesController.removeCategory(res1);
        System.assertNotEquals(null, delres);
    }
}
