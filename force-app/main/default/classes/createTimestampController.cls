public class createTimestampController {
    @AuraEnabled
    public static void saveTimestamp(Id assessmentId, String panelCategory){
        datetime currentDateTime = System.now();
        double epochTime = currentDateTime.getTime();
        String timeStampName = 'timeStamp' + String.valueOf(epochTime);
		//create and insert timestamp object
        Time_Stamp__c timeStamp = new Time_Stamp__c(name=timeStampName, PanelCategory__c=panelCategory,
                                                    PH_Assessment__c=assessmentId, Date_Time__c=currentDateTime, milliSecs__c=epochTime);

        insert timeStamp;

        
    }
    
}