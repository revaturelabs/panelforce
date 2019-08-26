({
    doInit : function(component, event, helper) {
        let categories = component.get("v.categories");
        let catsize = categories.length - 1;
        component.set("v.catsize", catsize);
        //Get the current category
        let category = categories[0];
        component.set("v.category", category);
    },

    appStateChange: function(component, event, helper) {
        let categories = component.get("v.categories");

        var action = component.get("c.getUpdatedCategories");

        action.setParams({ oldRecs: categories });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //Get the new Categories from the class
                let newCats = response.getReturnValue();

                //Get the event
                let compEvent = $A.get("e.c:InterviewAppStateEvent");
                //Set the parameters
                compEvent.setParams({
                    "state": 2,
                    "categories": newCats
                });

                //Fire the event
                compEvent.fire();
            }

        });

        $A.enqueueAction(action);
    },

    categoriesSetup: function(component, event, helper) {
        console.log("event handled");
        //Get the current state
        let state = event.getParam("state");
        console.log("Current state is " + state);
        //Make sure that we are in the correct state
        if (state == 1) {
            //Get the categories from the parameters and set them
            let categories = event.getParam("categories");
            component.set("v.categories", categories);
            console.log("categories are: " + categories);
            //Set the max number of categories
            let catsize = categories.length - 1;
            component.set("v.catsize", catsize);
            console.log("size is: " + catsize);
            //Get the current index
            let current = component.get("current");
            //Get the current category
            let category = categories[current];
            component.set("v.category", category);

            //Set up the event to fire
            helper.changeEvent(current, categories);
        }
    },

    categoriesChange: function(component, event, helper) {
        //Determine if the forward or backward button was pressed
        let buttonPressed = event.getSource().getLocalId();
        //Get the current index
        var current = component.get("v.current");

        //Backward button
        if (buttonPressed == "backward") {
            current -= 1;
            //If index is zero, disable the previous button
            if (current == 0) {
                let button = component.find('backward');
                button.set('v.disabled', true);
            }
            //Make sure the forward button is enabled
            //let button = component.find('forward');
            //button.set('v.disabled',false);
            helper.buttonChange(component, buttonPressed);
        } else if (buttonPressed == "forward") {
            current += 1;
            //If index is at max size, disable the forward button
            //Get the size of the array
            let catsize = component.get("v.catsize");
            if (current == catsize) {
                //let button = component.find('forward');
                //button.set('v.disabled',true);
                helper.buttonChange(component, buttonPressed);
            }
            //Make sure the previous button is enabled
            let button = component.find('backward');
            button.set('v.disabled', false);
        }

        //Set the current index attribute
        component.set("v.current", current);

        //Set the new category from the new current index
        let categories = component.get("v.categories");
        let category = categories[current];
        component.set("v.category", category);

        //Pass the current index to the child components
        helper.changeEvent(current, []);

    },

    indxChange : function(component, event, helper) {
        let newIndex = event.getParam("current");

        component.set("v.current", newIndex);

        let categories = component.get("v.categories");
        component.set("v.category", categories[newIndex]);

        let catsize = component.get("v.catsize");
        if (newIndex == 0) {
            let button = component.find('backward');
            button.set('v.disabled', true);
            helper.buttonChange(component, 'backward');
            
        } else if(newIndex == catsize) {
            helper.buttonChange(component, 'forward');
            //Make sure the previous button is enabled
            let button = component.find('backward');
            button.set('v.disabled', false);

        } else {
            //Make sure the previous button is enabled
            let button = component.find('backward');
            button.set('v.disabled', false);
            
            helper.buttonChange(component, 'backward');
        }
    }

})