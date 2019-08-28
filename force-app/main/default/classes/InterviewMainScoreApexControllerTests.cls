@isTest
public class InterviewMainScoreApexControllerTests {

    @testSetup static void setup(){
        
        //List<PH_TrainingTrack__c> Tracks = new List<PH_TrainingTrack__c>();
        PH_TrainingTrack__c Track = [SELECT Id FROM PH_TrainingTrack__c];
        //Tracks.add(new PH_TrainingTrack__c(Name='SF'));
        
        
        insert Track;
        
        List<PanelCategory__c> pcs = new List<PanelCategory__c>();
        
        pcs.add(new PanelCategory__c(Name='Testing', PH_TrainingTrack__c= Track.Id, maxScore__c=10, Status__c=True));
        pcs.add(new PanelCategory__c(Name='Testing2', PH_TrainingTrack__c=Track.Id, maxScore__c=10, Status__c=True));
        pcs.add(new PanelCategory__c(Name='Testing3', PH_TrainingTrack__c=Track.Id, maxScore__c=10, Status__c=True));
        
        insert pcs;

        PH_Assessment__c asm = [SELECT Id FROM PH_Assessment__c];
        //List<PH_Assessment__c> asms = new List<PH_Assessment__c>();

        //asms.add(new PH_Assessment__c())
        insert asm;
        
        List<AssessmentLineItem__c> alis = new List<AssessmentLineItem__c>();
        
        alis.add(new AssessmentLineItem__c(Name='Test1', Comment__c='Test1', maxScore__c=10, PanelCategory__c=pcs[0].id, Interviewed__c=True, PH_Assessment__c=asm.Id, Score__c=9, Status__c=True));
        alis.add(new AssessmentLineItem__c(Name='Test2', Comment__c='Test2', maxScore__c=10, PanelCategory__c=pcs[1].id, Interviewed__c=True, PH_Assessment__c=asm.Id, Score__c=6, Status__c=True));
        alis.add(new AssessmentLineItem__c(Name='Test3', Comment__c='Test3', maxScore__c=10, PanelCategory__c=pcs[2].id, Interviewed__c=True, PH_Assessment__c=asm.Id, Score__c=8, Status__c=True));
        
        insert alis;
    }

	@isTest
    static void testAll() {
        InterviewMainScoreApexController.updateCategories([SELECT Id, Name FROM AssessmentLineItem__c LIMIT 1]);
    }
}