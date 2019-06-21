({
    handleAppStateChange : function(component, event, helper) {
        let newState = event.getParam("state");
        component.set("v.appState", newState);
    }
})
