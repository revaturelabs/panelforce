public class AssessmentHistoryController {
    public static Map<PH_Assessment__c, List<AssessmentLineItem__c>> getMapAssessmentsToALIs(Id ContactId)
    {
        Map<PH_Assessment__c, List<AssessmentLineItem__c>> assessmentHistory = new Map <PH_Assessment__c, List<AssessmentLineItem__c>>();
        List<PH_Assessment__c> associateAssessments = getAssessments(ContactId);
        for(integer i = 0; i < associateAssessments.size(); i++)
        {
            assessmentHistory.put(associateAssessments[i], getFailedAssessmentLineItems(associateAssessments[i]));
        }
        return assessmentHistory;
	}
    
    //Maps each assessment Id to a Map of paired APInames & values
    public static Map< PH_Assessment__c, Map<String, String> > getMapOfAssessmentsToInfoMap(Id ContactId)
    {
        Map<PH_Assessment__c,Map<String, String>> assessmentInfoList = new Map<PH_Assessment__c,Map<String, String>>();
        Map<String, String> assessmentInfo = new Map<String, String>();
        assessmentInfo.put('AssessmentName','');
        assessmentInfo.put('InterviewDate','');
        assessmentInfo.put('PanellistName','');
        assessmentInfo.put('Feedback','');
        List<Id> PanellistsIds = new List<Id>();
        List<PH_Assessment__c> associateAssessments = getAssessments(ContactId);
        //Gets information on all of the panellists from Contact Ids related to the creation of the Assessment Line Item.
        for(PH_Assessment__c someAssessment : associateAssessments)
        {
            PanellistsIds.add(someAssessment.OwnerId);
        }
        List<User> Panellists = [SELECT Id, FirstName, LastName FROM User WHERE Id IN :PanellistsIds];        
        for(PH_Assessment__c someAssessment : associateAssessments)
        {
            assessmentInfo.put('AssessmentName', someAssessment.Name);
            assessmentInfo.put('InterviewDate', someAssessment.Interview_Date__c.format());
            for(User Panellist : Panellists)
            {
                if(Panellist.Id == someAssessment.OwnerId)
                {
                    assessmentInfo.put('PanellistName', Panellist.FirstName + ' ' + Panellist.LastName);
                    break;
                }
            }
            assessmentInfo.put('Feedback',someAssessment.Comment__c);
        }
        return assessmentInfoList;
	}
    
    
	@AuraEnabled
	public static List<PH_Assessment__c> getAssessments(Id contactId)
    {
        Contact retrievedContact = [SELECT Name, (SELECT Id, Name, Interview_Date__c, OwnerId, Comment__c 
                                                  FROM PH_Assessments__r)
                                    FROM Contact 
                                    WHERE Id =: ContactId];
        return retrievedContact.PH_Assessments__r;
    }
    
    @AuraEnabled //Retrieves all Assessment Line Items from a single Assessment.
    public static List<AssessmentLineItem__c> getFailedAssessmentLineItems(PH_Assessment__c someAssessment)
    {
        List<AssessmentLineItem__c> LineItemsOfAssessment = [SELECT Id, Name, PanelCategory__c, Score__c, MaxScore__c, Status__c, Comment__c, PH_Assessment__c 
                                                             FROM AssessmentLineItem__c 
                                                             WHERE PH_Assessment__c=:someAssessment.id];
        List<AssessmentLineItem__c> FailedLineItemsOfAssessment = new List<AssessmentLineItem__c>();
        for(AssessmentLineItem__c someALI : LineItemsOfAssessment)
        {
            if(someALI.Status__c == False)
            {
                FailedLineItemsOfAssessment.add(someALI);
            }
        }
        return FailedLineItemsOfAssessment;
    }
}