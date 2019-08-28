public class PanelForceDataCreator {
    public static void createData() {
        // 1) Delete all existing Data
        deleteExistingData();
        
        // 2) Create Training Tracks
        createTrainingTracks();
        
        // 3) Create Trainings (Batches)
        createTrainings();
        
        // 4) Create Panel Categories
        // 4.1) Assign Categories to Training Track 
        createPanelCategories();
        
        // 5) Create Associates
        createAssociates();
        
        // 5.1) Assign Associates to a Training (Batch)
        List<Contact> associates = [SELECT Id FROM Contact];
        PH_Training__c batch = [SELECT Id FROM PH_Training__c LIMIT 1];
        assignAssociatesToATraining(associates,batch);
    }
    
    private static void deleteExistingData() {
        deleteExistingContacts();
        deleteExistingTrainings();
        deleteExistingTrainingTracks();
        deleteExistingPanelCategories();
        deleteExistingAssessments();
    }
    
    // Methods that delete existing data. This is done to reduce redundant data.
    private static void deleteExistingContacts() { delete [SELECT Id FROM Contact]; }
    private static void deleteExistingTrainings() { delete [SELECT Id FROM PH_Training__c]; }
    private static void deleteExistingTrainingTracks() { delete [SELECT Id FROM PH_TrainingTrack__c]; }
    private static void deleteExistingAssessments() { delete [SELECT Id FROM PH_Assessment__c]; }
    private static void deleteExistingPanelCategories() { delete [SELECT Id FROM PanelCategory__c]; }
    
    // Create Track for Salesforce
    private static void createTrainingTracks() {
        List<PH_TrainingTrack__c> trainingTracksToInsert = new List<PH_TrainingTrack__c>();
        trainingTracksToInsert.add(new PH_TrainingTrack__c(Name='Salesforce'));
        
        insert trainingTracksToInsert;
    }
    
    private static void createTrainings() {
        // Each Training is associated with one Training Track. 
        PH_TrainingTrack__c salesforceTrack = [SELECT Id FROM PH_TrainingTrack__c WHERE Name='Salesforce' LIMIT 1];
        PH_Training__c batch = new PH_Training__c(PH_TrainingTrack__c=salesforceTrack.Id);
        insert batch;
    }   
    
    private static void createPanelCategories() {
        List<PanelCategory__c> panelCategoriesToInsert = new List<PanelCategory__c>();
        // Each Panel Category is associated with a Training Track.
        PH_TrainingTrack__c salesforceTrack = [SELECT Id FROM PH_TrainingTrack__c WHERE Name='Salesforce' LIMIT 1];
        
        Map<String, Integer> panelCategoriesToWeightage = new Map<String, Integer> {'Project Explanation'=>5, 'Fundamentals'=>15,
            'Workflows & Reports'=>5,'Apex Programming'=>15, 'SOQL/SOSL'=>10, 'Visualforce'=>10, 'Testing'=>5,
                'Debug & Deployment'=>10, 'Lightning'=>10,'SDLC/Agile'=>5, 'Soft Skills'=>5, 'SOA'=>5};
                
                    for(String key: panelCategoriesToWeightage.keySet()) {
                        Integer maxScore = panelCategoriesToWeightage.get(key);
                        panelCategoriesToInsert.add(new PanelCategory__c(Name=key,
                                                                         maxScore__c=maxScore,
                                                                         PH_TrainingTrack__c=salesforceTrack.Id));
                    }
        assignCategoriesToTrack(panelCategoriesToInsert, salesforceTrack);
    }
    
    private static void assignCategoriesToTrack(List<PanelCategory__c> categories, PH_TrainingTrack__c track) {
        for (PanelCategory__c category : categories) {
            category.PH_TrainingTrack__c = track.Id;
        }
        
        upsert categories;
    }
    
    private static void createAssociates() {
        List<Contact> associatesToInsert = new List<Contact>();
        
        associatesToInsert.add(new Contact(FirstName='Mike', LastName='Williams'));
        associatesToInsert.add(new Contact(FirstName='Pete', LastName='Jacobs'));
        associatesToInsert.add(new Contact(FirstName='Carly', LastName='Jones'));
        associatesToInsert.add(new Contact(FirstName='Andy', LastName='Young'));
        associatesToInsert.add(new Contact(FirstName='Janice', LastName='Keenan'));
        associatesToInsert.add(new Contact(FirstName='Bill', LastName='Brunson'));
        associatesToInsert.add(new Contact(FirstName='Jeff', LastName='Peterson'));
        
        insert associatesToInsert;
    }
    
    private static void assignAssociatesToATraining(List<Contact> associates, PH_Training__c batch) {
        List<PH_TrainingAssignment__c> trainingAssignments = new List<PH_TrainingAssignment__c>();
        for (Contact associate : associates) {
            trainingAssignments.add(new PH_TrainingAssignment__c(PH_Training__c=batch.Id,
                                                                 Contact__c=associate.Id));
        }
        
        insert trainingAssignments;
    }   
    
}