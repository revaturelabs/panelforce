({
    handleAppStateChange : function(component, event, helper) {
        let newState = event.getParam("state");
        console.log('state gotten from event: ' + newState);
        component.set("v.appState", newState);
        console.log('app state handled');
    }
})