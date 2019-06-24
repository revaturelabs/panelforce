@isTest
public class testTrackController {
    @isTest
    public Static void testTrackController() {
        // test methods getTrack, getContact
        Contact c = new Contact();
        TrackController tc = new TrackController();
        String s;
        PH_TrainingTrack__c tt = new PH_TrainingTrack__c();

        c.Lastname = 'test';
        tt.Name = 'test';

        insert c;

        tt = TrackController.getTrack(c.Id);
        s = TrackController.getContact(c.Id);
        System.assert(c.Id != null);
        System.assert(s != null);
        System.assert(tt.Name != null);

        Database.delete(c);
    }

    @isTest
    Public Static Void testCreateData() {
        Contact c = new Contact();
        List<AssessmentLineItem__c> loali = new List<AssessmentLineItem__c>();
        PH_TrainingTrack__c tt = new PH_TrainingTrack__c();
        //TrackController tc = new TrackController();

        c.Lastname = 'test';
        tt.Name = 'test';

        // needs DML insert in order to use c.Id to check createData()
        insert c;
        insert tt;

        // test a.Id and that Id is not null.
        loali = TrackController.createData(c.Id, tt.Id);
        System.assert(c.Id != null);
        System.assert(tt.Id != null);

        Database.delete(c);
        Database.delete(tt);
    }
}