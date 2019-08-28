public without sharing class InterviewMainMiscApexController {
  
    @AuraEnabled
    public static void insertTimeStamp(List<Integer> sTimeStamp, PH_Assessment__c phAss){
        List<Time_Stamp__c> tsList = new List<Time_Stamp__c>();     
        for(Integer stm : sTimeStamp){
            Time_Stamp__c ts = new Time_Stamp__c();
            Integer ran = Integer.valueof((math.random() * 100000));
            ts.Name = 'Time Stamp ' + String.valueof(ran);
            ts.milliSecs__c = stm;
            ts.PH_Assessment__c = phAss.Id;
            tsList.add(ts);
        }

        insert tsList;
    }

    @AuraEnabled
    public static void updateCategory(AssessmentLineItem__c AssLineItem){
        update AssLineItem;
    }

}