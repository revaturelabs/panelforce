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

    @AuraEnabled
    public static void updatePass(String comment,  PH_Assessment__c phAss, PanelCategory__c pc){
        List<AssessmentLineItem__c> catList = new List<AssessmentLineItem__c>();
        AssessmentLineItem__c cat = new AssessmentLineItem__c();
        String comm = comment;
                cat.name = 'Temporal Name: ' + comment;
                cat.Status__c = true;
                cat.Interviewed__c = true;
                cat.Comment__c = comm;
                cat.PH_Assessment__c = phAss.Id;
                cat.PanelCategory__c = pc.Id;
                catList.add(cat);
                insert catList;
    }

@AuraEnabled
    public static void updateFailed(String comment, PH_Assessment__c phAss, PanelCategory__c pc){
       AssessmentLineItem__c cat = new AssessmentLineItem__c();
       List<AssessmentLineItem__c> catList = new List<AssessmentLineItem__c>();
        cat.name = 'Temporal Name: ' + comment.substring(0,15);
       cat.Status__c = false;
       cat.Interviewed__c = true;
       cat.Comment__c = comment;
       cat.PH_Assessment__c = phAss.Id;
       cat.PanelCategory__c = pc.Id;
       catList.add(cat);
       insert catList;
   }

}