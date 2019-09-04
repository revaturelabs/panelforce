public class AssessmentController {
    @AuraEnabled
    public static List<AssessmentLineItem__c> returnAssessments(Id contactId, PH_Assessment__c assessment){
        /**
        //Grabs the Id of the Assessment from Contact
        Contact retrievedContact = [SELECT (SELECT Id FROM PH_Assessments__r)
                                    FROM Contact 
                                    WHERE Id =: contactId];
        //Sets the id retrieved from contact to an assessment
        PH_Assessment__c assessment = retrievedContact.PH_Assessments__r;
        **/
		//Returns a list of AssignmentLineItems that have their status set to false
        return [SELECT PanelCategory__r.Name, Status__c FROM AssessmentLineItem__c WHERE (PH_Assessment__c =: assessment.Id AND Status__c = false)];

    }
}