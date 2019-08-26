@isTest(seeAllData=true)
public class TrackControllerTests {
	@isTest
    static void testAll() {
        TrackController.getAccount('0012K00001ahcKnQAI');
        TrackController.getContact('0032K00002HY4jbQAD');
        TrackController.getTrack('0032K00002HY4jbQAD');
        TrackController.createData('0032K00002HY4jbQAD', 'a032K00000St5EaQAJ');
    }
}