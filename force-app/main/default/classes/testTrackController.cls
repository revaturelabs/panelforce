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
        // System.assert();
        // database delete c
    }
}