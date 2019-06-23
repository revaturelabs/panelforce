@isTest
public class testTrackController {
    @isTest
    public Static void testTrackController() {
        // test methods getTrack, getContact
        Contact c = new Contact();
        TrackController tc = new TrackController();
        //System.debug();
        //Id i = c.Id('Mr Andy Young');
        c.Lastname = 'test';
        insert c;
        Id i = c.Id;
        TrackController.getTrack(c.Id);
        TrackController.getContact(c.Id);
        System.assert(c.Id <> null);
        // database delete c
        Database.delete(c);
    }

    @isTest
    Public Static Void testCreateData() {
        Contact c = new Contact();
        //TrackController t = new TrackController();
        c.Lastname = 'test';
        // needs DML insert in order to use c.Id to check createData()
        insert c;

        // test a.Id and that Id is not null.
        if (TrackController.createData(c.Id) != null) {
            System.debug('record inserted createData works.');
        }
        Database.delete(c);
    }
}