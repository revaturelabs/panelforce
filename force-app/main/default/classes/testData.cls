@isTest(SeeAllData=True)
public with sharing class testData {
   /* @isTest(SeeAllData=True)
    public Static Void testData() {
        PH_TrainingTrack__c tt = new PH_TrainingTrack__c();
        tt.Name = 'test';
        insert tt;

        Contact associate1 = new Contact();
        associate1.Lastname = 'Smith';
        //associate1.Lastname = 'McTechnical';
        insert associate1;

        PH_Training__c t = new PH_Training__c();
        t.Name = 'test';
        t.PH_TrainingTrack__c = 'test';
        insert t;

        PH_TrainingAssignment__c ta = new PH_TrainingAssignment__c();
        ta.Contact__c = '';
        ta.PH_Training__c = 'test';
        ta.Name = 'test';
        insert ta;

        PH_Assessment__c a = new PH_Assessment__c();
        a.Contact__c = 'Techy McTechnical';
        a.OwnerId = 'test';
        a.Name = 'test';
        //a.RecordTypeId = 'test';
        insert a;

        AssessmentLineItem__c ali = new AssessmentLineItem__c();
        ali.Name = 'test';
        ali.Interviewed__c = True;
        ali.maxScore__c = 9;
        ali.PanelCategory__c = 'test';
        ali.PH_Assessment__c = 'test';
        ali.Score__c = 9;
        ali.Status__c = True;
        insert ali;

        PanelCategory__c pc = new PanelCategory__c();
        pc.Status__c = True;
        pc.Name = 'test';
        pc.PH_TrainingTrack__c = 'test';
        pc.Status__c = True;
        insert pc;

//        Scorecard sc = new Scorecard();
//        sc.Description = 'test';
//        sc.Name =' test ';
//        //sc.ScorecardId = 'test'; // master detail
//        //sc.TargetEntityId = 'test'; // lookup account
//        insert sc;

//        ScorecardAssociation sa = new ScorecardAssociation();
//        //sm.ScorecardId = 'test'; // master detail scorecard
//        //sc.TargetEntityId = 'test'; // lookup account
//        insert sa;

//        ScorecardMetric sm = new ScorecardMetric();
//        sm.Category = 'test';
//        sm.Description = 'test';
//        sm.Name = 'test';
//        //sm.ReportId = 'test'; // lookup report
//        //sm.ScorecardId = 'test'; // master detail scorecard
//        insert sm;

        Time_Stamp__c ts = new Time_Stamp__c();
        Datetime m = Datetime.newInstance(2019, 4, 1);
        ts.Date_Time__c = m;
        //ts.PH_Assessment__c = 'test'; // master detail PH_Assessment
        ts.Name = 'test';
        insert ts;

        // or for each object insert 'test';
    }*/
}