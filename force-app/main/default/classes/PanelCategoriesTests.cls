@isTest
public class PanelCategoriesTests {
    @testSetup
    static void setup(){
        //create and insert 2 training tracks, this is necessary bc they are the
        // masterof panel category which is the master of assessmentLineItem
        List<PH_TrainingTrack__c> trainingTracks = new List<PH_TrainingTrack__c>();
        for(integer i=0; i<2; i++){
            String trainingTrackName = 'trainingTrack' + String.valueOf(i);
            trainingtracks.add(new PH_TrainingTrack__c(Name=trainingTrackName));
        }
        insert trainingTracks;
        
        //create and insert 4 panel categories 
        List<PanelCategory__c> panelCategories = new List<PanelCategory__c>();
        for(integer i=0; i<4; i++){
            id trainingTrackId = trainingTracks[math.mod(i,trainingTracks.size())].id; 
            String trainingTrackName = 'trainingTrack' + String.valueOf(i);
            panelCategories.add(
                new PanelCategory__c(name=trainingTrackName, PH_TrainingTrack__c=trainingTrackId));
        }
        insert panelCategories;
        
        
        //create and insert 2 assessments 
        List<Assessment__c> assessments = new List<Assessment__c>();
        for(integer i=0; i<2; i++){
            String assessmentName = 'assessment' + String.valueOf(i);
            assessments.add(new Assessment__c());
        }
        insert assessments; 
        
        //create and insert 8 AssessmentLineItems
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        for(integer i=0; i<8; i++){
            Id panelCategoryId = panelCategories[math.mod(i,panelCategories.size())].id;
			Id assessmentId = assessments[math.mod(i, assessments.size())].id;
            String assessmentLineItemName = 'assessmentLineItem' + String.valueOf(i);
            
        }
        
        //create and insert 4 trainings
        List<PH_Training__c> trainings = new List<PH_Training__c>();
        for(integer i=0; i<4; i++){
            String trainingName = 'training' + String.valueOf(i);
            Id trainingTrackId = trainingTracks[math.mod(i,trainingTracks.size())].id;
            trainings.add(new PH_Training__c(PH_TrainingTrack__c=trainingTrackId));
        }
        insert trainings;
        
        //create and insert 4 contacts
        List<Contact> contacts = new List<Contact>();
        
	
        
        
        
    }
    /*
    @isTest
    static void saveAssessmentTest(){
         //create and insert 2 assessments 
        
        List<Assessment__c> assessments = new List<Assessment__c>();
        for(integer i=0; i<2; i++){
            String assessmentName = 'assessment' + String.valueOf(i);
            assessments.add(new Assessment__c();
        }
        insert assessments; 
        
        //create and insert 8 AssessmentLineItems
        List<AssessmentLineItem__c> assessmentLineItems = new List<AssessmentLineItem__c>();
        for(integer i=0; i<8; i++){
            Id panelCategoryId = panelCategories[math.mod(i,panelCategories.size())].id;
			Id assessmentId = assessments[math.mod(i, assessments.size())].id;
            String assessmentLineItemName = 'assessmentLineItem' + String.valueOf(i);
            
        }
        
    }
    */
    
    @isTest
    static void getTrackTest(){
        
    }
    
    /*
	@isTest
    static void testAll() {
        PanelCategories.getTrack('0032K00002HY4jbQAD');
        PanelCategories.getNumberofTries('0032K00002HY4jbQAD');
    }
*/
}