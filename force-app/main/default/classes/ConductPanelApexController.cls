public class ConductPanelApexController {
    
    public static Id currentRecordAssessmentId;
    
    @auraEnabled
    public static String apexMakeNewAssessementRecord(Id associateId) {
        
        PH_Assessment__c newAssessment = new PH_Assessment__c();
        // debug
        System.debug(associateId);
        if (associateId != null) {
            newAssessment.Contact__c = associateId;
        }
        // debug
        System.debug(UserInfo.getUserId());
        newAssessment.Panelist__c = UserInfo.getUserId();
        newAssessment.Interview_Date__c = System.today();
        newAssessment.Interview_Start__c = System.now().time();
        newAssessment.TrainingTrack__c = apexGetTrainingTrack(associateId);
        newAssessment.PanelRound__c = apexGetNumberOfPreviousPanelRounds(associateId) + 1;        
        newAssessment.OverallPass__c = true;
        
        insert newAssessment;
        currentRecordAssessmentId = newAssessment.Id;
        return newAssessment.Id;
    }
    
    
    
    @auraEnabled
    public static String apexGetTrainingTrack(Id associateId) {
        // start with id of associate
        // we want to find PH_TrainingTrack__c and return this value
        Id targetTrainingTrack;
        // get (1 record) most recent PH_TrainingAssignment__c for associate
        PH_TrainingAssignment__c mostRecentTrainingAssignmentForAssociate = [SELECT Id, Name, Contact__c, PH_Training__r.PH_TrainingTrack__c  FROM PH_TrainingAssignment__c WHERE Contact__c = :associateId ORDER BY CreatedDate DESC LIMIT 1];
        
        // debug
        System.debug(mostRecentTrainingAssignmentForAssociate);
        
        // get PH_TrainingTrack__c from PH_TrainingAssignment__c for associate
        targetTrainingTrack = mostRecentTrainingAssignmentForAssociate.PH_Training__r.PH_TrainingTrack__c;
        
        // debug
        system.debug(targetTrainingTrack);
        return targetTrainingTrack;
    }
    
    
    
    @auraEnabled
    public static Integer apexGetNumberOfPreviousPanelRounds(Id associateId) {
        // start with id of associate
        // we want to find count of previous panels
        Id targetTrainingTrack;
        // get (1 record) most recent PH_TrainingAssignment__c for associate
        Integer countOfPreviousPanelRounds = [SELECT COUNT() FROM PH_Assessment__c WHERE Contact__c = :associateId];
        
        // debug
        system.debug (countOfPreviousPanelRounds);
        
        return countOfPreviousPanelRounds;
    }
    
    
    
    @auraEnabled
    public static Time apexSetNewStartTime(Id assessmentId) {
        // query for record
        PH_Assessment__c workingAssessment = [SELECT Id, Interview_Start__c FROM PH_Assessment__c WHERE Id = :assessmentId];
        
        // update time
        Time currentTime = System.now().time();
        workingAssessment.Interview_Start__c = currentTime;
        
        // debug
        system.debug(workingAssessment);
        
        update workingAssessment;
        return currentTime;
    }
    
    
    
}