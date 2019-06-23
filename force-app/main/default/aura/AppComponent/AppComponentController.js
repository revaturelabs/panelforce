({
    handleAppStateChange : function(component, event, helper) {
        console.log('app state handled')
        let newState = event.getParam("state");
<<<<<<< HEAD
        console.log(newState);
=======
>>>>>>> James
        component.set("v.appState", newState);
    }
})