({
    handleAppStateChange : function(component, event, helper) {
        let newState = event.getParam("state");
        console.log('app state handled, new state: ' + newState);
        component.set("v.appState", newState);
    }
})