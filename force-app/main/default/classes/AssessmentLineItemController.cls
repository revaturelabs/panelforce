public class AssessmentLineItemController{
    @AuraEnabled
    public static void saveALI(id ALIId, integer score, string comments, boolean repanel){
        System.debug('inside saveALI');
        AssessmentLineItem__c ALI = new AssessmentLineItem__c();
        ALI.id = ALIId;
        ALI.score__C = score;
        ALI.comment__C = comments;
        ALI.interviewed__c = repanel;

        System.debug(ALI);
        update ALI;
    }
}