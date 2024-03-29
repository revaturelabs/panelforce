global without sharing class MondayReports implements Schedulable {
    private static Integer scheduleTime = 1;
    global void execute(SchedulableContext sc)
    {
        sendmail();
    }
    public void sendmail()
    {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        string [] toaddress= new String[]{'Matthew.Ruiz@revature.com'};
            email.setSubject('Candidates who have failed three consecutive panels.');
        
        
        List<AggregateResult> arList = new List<AggregateResult>(); 
        for (AggregateResult ar :   [SELECT Contact__r.Name, count(id), max(CreatedDate), overallpass__c
                                     FROM PH_Assessment__c
                                     WHERE recordtypeid in (SELECT id FROM recordtype WHERE name = 'Panel')
                                     GROUP BY Contact__r.name, overallpass__c
                                     ORDER BY max(createddate) desc]) 
        {
            arList.add(ar);
        }
        
        List<String> nList = new List<String>();
        String cName;
        
        String sCandidate = 'Candidates who have failed three consecutive panels\n';
        /*for (AggregateResult ar : arList) {
            if (cName != (String)ar.get('Contact__r.Name') && (Boolean)ar.get('overallpass__c') == false && (Integer)ar.get('count(id)') >= 3) {
                cName = (String)ar.get('Contact__r.Name');
                nList.add(cName);
            }
        }*/
        nList.add('Ton Cruise');
        
        for (String n : nList) {
            sCandidate += n + '\n';
        }
        
        email.setPlainTextBody(sCandidate);
        email.setToAddresses(toaddress);
        Messaging.sendEmail(New Messaging.SingleEmailMessage[]{email});
    }
}