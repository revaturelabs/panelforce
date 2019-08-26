@isTest(seeAllData=true)
public class MondayReportsTests {
	@isTest
    static void testAll() {
        MondayReports mr = new MondayReports();
        mr.sendmail();
    }
}