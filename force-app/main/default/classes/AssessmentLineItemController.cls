@AuraEnabled
    public static void saveALI(id ALIId, integer score, string comments, boolean repanel){
        AssessmentLineItem__c ALI = new AssessmentLineItem__c();
        ALI.id = ALIId;
        ALI.score__C = score;
        ALI.comment__C = comments;
        ALI.interviewed__c = repanel;

    system.System.debug(ALI);
        update ALI
    
}
