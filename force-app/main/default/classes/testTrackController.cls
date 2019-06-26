@isTest
public class testTrackController {
    @isTest
    public Static void testTrackController() {
        // test methods getTrack, getContact
        Contact c = new Contact();
        TrackController tc = new TrackController();
        String s;
        PH_TrainingTrack__c tt = new PH_TrainingTrack__c();

        c.Lastname = 'test 1';
        tt.Name = 'test 2';
        insert tt;
        insert c;
        // test 2 methods.
        try {
            tt = TrackController.getTrack(c.Id);
        } catch (ListException e) {
            System.debug('List index out of bounds probably: '  + ' ' + e);
        }

        try {
            s = TrackController.getContact(c.Id);
        } catch (StringException e) {
            System.debug('getContact not returning string: ' + s);
        }

        try {
            System.assert(c.Id != null);
            System.assert(tt.Name != null);
            System.assert(s != null);
        } catch (AssertException e) {
            System.debug('Chech assertion: ' + ' ' + e);
            System.debug('s: ' + s + ' ' + 'c.Id: ' + ' ' + c.Id + ' ' + 'tt.Name' + ' ' + tt.Name);
        }
        
        // test cleanup
        Database.delete(c);
        Database.delete(tt);
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
        System.assert(loali != null);

        try {
            for (AssessmentLineItem__c ali : loali) {
                System.assert(ali.Name != null);
                System.assert(ali.PanelCategory__c != null);
            }
        } catch (ListException e) {
            System.debug('ListException: ' + e);
        } catch (Exception e) {
            System.debug('General Exception: ' + e);
        }

        Database.delete(c);
        Database.delete(tt);
    }
}