({
    handleAppStateChange : function(component, event, helper) {
        console.log('app state handled')
        let newState = event.getParam("state");
        component.set("v.appState", newState);
    }
})
