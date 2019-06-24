global with sharing class MondayReports implements Schedulable {
    private static Integer scheduleTime = 1;
       global void execute(SchedulableContext sc)
       {
           sendmail();
       }
    public void sendmail()
    {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        string [] toaddress= New string[]{[Select email from User u where u.UserRole.Name = 'CTO'][0].email};
        email.setSubject('Candidates who have failed three consecutive panels.');
        
        List<PH_Assessment__c> lCandidates = [SELECT Contact__r.Name, overAllPass__c
                            FROM PH_Assessment__c];
        Integer count;
        String pName;

        String sCase = 'Candidates who have failed three consecutive panels\n';
        for (PH_Assessment__c c : lCandidates) {
            if (c.Name != pName) {
                pName = c.Name;
                count = 0;
            }
            count++;
            if (count == 3 && c.overAllPass__c == false) {
                sCase += c.Contact__r.Name + '\n';
            }
        }

        email.setPlainTextBody(sCase);
        email.setToAddresses(toaddress);
        system.debug(email);
        Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
    }
}