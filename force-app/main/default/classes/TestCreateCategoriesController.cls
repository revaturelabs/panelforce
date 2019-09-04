@isTest
public class TestCreateCategoriesController 

{
    @testSetup
	public static void setup()
    {
        List<PH_TrainingTrack__c> tracksToInsert = new List<PH_TrainingTrack__c>();
        PH_TrainingTrack__c typeOfTrack = new PH_TrainingTrack__c(Name='Track1');
        tracksToInsert.add(typeOfTrack);
        insert typeOfTrack;

        PanelCategory__c panelId;
        
		PanelCategory__c panelCategories = new PanelCategory__c(Name = 'Panel1',maxScore__c = 80,PH_TrainingTrack__c=typeOfTrack.Id);
        insert panelCategories;
    }
    @isTest
    public static void saveCategoriesTest()
    {
       /*
        List<PH_TrainingTrack__c> track = [SELECT Id FROM PH_TrainingTrack__c];
        List <PanelCategory__c> panels = [SELECT PH_TrainingTrack__c FROM PanelCategory__c];
        
  		for(PH_TrainingTrack__c tt : track)
        {
            for(PanelCategory__c pc : panels)
            {   
            
        		System.assertEquals(pc.PH_TrainingTrack__c, tt.Id);
            }
        }
        */
        List<PH_TrainingTrack__c> tracksToInsert = [SELECT Id FROM PH_TrainingTrack__c];
        PanelCategory__c panelCategories = new PanelCategory__c();
		for(PH_TrainingTrack__c newTrainingTrack : tracksToInsert)
        {
        	 panelCategories = new PanelCategory__c(Name = 'Panel2',maxScore__c = 85,PH_TrainingTrack__c = newTrainingTrack.Id);
        }
        insert panelCategories;
                List <PanelCategory__c> panels = [SELECT Name FROM PanelCategory__c WHERE Name ='Panel2'];
        	for(PanelCategory__c category : panels)
            { 
				System.assertEquals('Panel2', category.Name);
                
            }
    }
    @isTest
    public static void removeCategoryTest()
    {
        List <PanelCategory__c> panels = [SELECT Name FROM PanelCategory__c];
		delete panels;
            panels = [SELECT Name FROM PanelCategory__c];

        System.assertEquals(0, panels.size());
    }
}