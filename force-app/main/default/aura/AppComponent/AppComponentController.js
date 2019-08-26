({
    doInit : function(component, event, helper) {
        console.log("doInit on appComponent");
        helper.generateElem(component, "c:InterviewInitial", {
            "recordId" : component.get("v.recordId")
        });
        console.log("doInit on appComponent done");
    },

    handleAppStateChange : function(component, event, helper) {
        console.log("handleAppStateChange on appComponent");
        let recordId = component.get("v.recordId");

        let newState = event.getParam("state");
        let cats = event.getParam("categories");
        let ass = component.get("v.Assessment");
        console.log("ass in generate: " + JSON.stringify(ass));

        console.log('app state handled, new state: ' + newState);
        component.set("v.appState", newState);

        if (newState == 1) {
            helper.generateElem(component, "c:InterviewMain", {
                "recordId" : recordId,
                "categories" : cats,
                "assignment" : ass
            });
            console.log("handleAppStateChange on appComponent newstate 1");

        } else if (newState == 2) {
            helper.generateElem(component, "c:PanelViewMain", {
                "recordId" : recordId,
                "categories" : cats,
                "assessment" : ass
            });
            console.log("handleAppStateChange on appComponent newstate 2");
        }
        console.log("handleAppStateChange on appComponent done");
        
    },

    handleAssessmentCreation : function(component, event, helper) {
        let ass = event.getParam("updateAssessment");
        console.log("got ass: " + JSON.stringify(ass));
        component.set("v.Assessment", ass);
    }
})