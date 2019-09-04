public class ConductPanelApexController {
    
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
        
        insert newAssessment;
        return newAssessment.Id;
    }
    
    
    
    @auraEnabled
    public static String apexGetTrainingTrack(Id associateId) {
        // start with id of associate
        // we want to find PH_TrainingTrack__c and return this value
        Id targetTrainingTrack;
        // get (1 record) most recent PH_TrainingAssignment__c for associate
        PH_TrainingAssignment__c mostRecentTrainingAssignmentForAssociate = [SELECT Id, Name, Contact__c, PH_Training__r.PH_TrainingTrack__c  FROM PH_TrainingAssignment__c WHERE Contact__c = :associateId ORDER BY CreatedDate LIMIT 1];
        
        // debug
        System.debug(mostRecentTrainingAssignmentForAssociate);
        
        // get PH_TrainingTrack__c from PH_TrainingAssignment__c for associate
        targetTrainingTrack = mostRecentTrainingAssignmentForAssociate.PH_Training__r.PH_TrainingTrack__c;
        
        // debug
        system.debug(targetTrainingTrack);
        return targetTrainingTrack;
    }
    
}