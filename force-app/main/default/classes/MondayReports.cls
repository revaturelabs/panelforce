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
                                        GROUP BY Contact__r.name, overallpass__c
                                        ORDER BY max(createddate) desc];

        List<String> nList;
        String cName;

        String sCandidate = 'Candidates who have failed three consecutive panels\n';
        for (AggregateResult ar : arList) {
            if (cName != (String)ar.get('Contact__r.Name') && (Boolean)ar.get('overallpass__c') == false && (Integer)ar.get('count(id)') >= 3) {
                cName = (String)ar.get('Contact__r.Name');
                nList.add(cName);
            }
        }

        for (String n : nList) {
            sCandidate += n + '\n';
        }

        email.setPlainTextBody(sCandidate);
        email.setToAddresses(toaddress);
        Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
    }
}