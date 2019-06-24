global with sharing class MondayReports implements Schedulable {
    private static Integer scheduleTime = 1;
       global void execute(SchedulableContext sc)
       {
           sendmail();
       }
    public void sendmail()
    {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        string [] toaddress= new String[]{[Select email from User u where u.UserRole.Name = 'CTO'][0].email};
        email.setSubject('Candidates who have failed three consecutive panels.');
        
    List<AggregateResult> arList = [SELECT Contact__r.Name, count(id), max(CreatedDate), overallpass__c
                                    FROM PH_Assessment__c
                                    GROUP BY Contact__r.Name, overallpass__c
                                    ORDER BY max(createddate) desc];


        String sCase = 'Candidates who have failed three consecutive panels\n';
        for (AggregateResult ar : arList) {
            

            if (count.count(id) >= 3 && pass.overAllPass__c == false) {
                sCase += c.Contact__r.Name + '\n';
            }
        }

        email.setPlainTextBody(sCase);
        email.setToAddresses(toaddress);
        system.debug(email);
        Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
    }
}