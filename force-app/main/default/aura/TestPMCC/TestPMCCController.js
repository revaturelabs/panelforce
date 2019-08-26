({
    handleAppStateChange : function(component, event, helper) {
        console.log('app state handled')
        let newState = event.getParam("state");
        console.log(newState);
        component.set("v.appState", newState);
    }
})