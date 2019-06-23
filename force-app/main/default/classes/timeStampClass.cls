public with sharing class timeStampClass {
  @AuraEnabled
  public static void insertTimeStamp(List<Integer> sTimeStamp, PH_Assessment__c phAss){
      List<Time_Stamp__c> tsList = new List<Time_Stamp__c>();     
      system.debug('Inside Function');
      for(Integer stm : sTimeStamp){
        Time_Stamp__c ts = new Time_Stamp__c();
         ts.Date_Time__c = DateTime.valueOf(stm);
         ts.PH_Assessment__c = phAss.Id;
         System.debug('Inside for loop');
         tsList.add(ts);
      }

insert tsList;
  }
}