public with sharing class InterviewMainMiscApexController {
  
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

    public static void totalTimeDiff(Integer totalTime, PH_Assessment__c phAss){
        ID phAssID = phAss.id;
        Time_Stamp__c updateTotal = [Select milliSecs__c from Time_Stamp__c where id =: phAssID];
        updateTotal.Total_Interview_Length__c = totalTime - updateTotal.milliSecs__c;
        upsert updateTotal;


    }

    @AuraEnabled
    public static void updateCategory(AssessmentLineItem__c AssLineItem){
        update AssLineItem;
    }

}