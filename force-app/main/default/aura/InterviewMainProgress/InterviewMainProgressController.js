({
    doInit : function(component, event, helper) {
        // Create the action
        let action = component.get("c.getCategories");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                // component.set("v.allCategories", response.getReturnValue());
                let resp = response.getReturnValue();
                helper.generateButtons(component, resp);
                console.log("initiated with: \n" + JSON.stringify(resp));
                component.set("v.allCategories", resp);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },

    handleStatusChange : function(component, event, helper) {
        let allCats = component.get("v.allCategories");
        let currId = component.get("v.currentCat");

        let newStatus = event.getParam("status");

        allCats[currId].Status__c = newStatus;
        allCats[currId].Interviewed__c = true;
    },

    handleCategories : function(component, event, helper) {
        let allCats = component.get("v.allCategories");
        let prev = component.get("v.currentCat");
        let next = event.getParam("current");
        let cats = event.getParam("categories");

        if (cats.length == 0) {
            // reset the color for old button
            let btn = component.find("btn-" + prev);
            let newStyleForOldBtn = (allCats[prev].Status__c) ? "green-btn" : "red-btn";
            if (!allCats[prev].Interviewed__c) newStyleForOldBtn = "white-btn";
            $A.util.removeClass(btn, "blue-btn");
            $A.util.addClass(btn, newStyleForOldBtn);

            // set blue color for the new button
            btn = component.find("btn-" + next);
            $A.util.removeClass(btn, "green-btn");
            $A.util.removeClass(btn, "red-btn");
            $A.util.removeClass(btn, "white-btn");
            $A.util.addClass(btn, "blue-btn");  
            
            // set variables
            component.set("v.currentCat", next);
        } else {
            helper.generateButtons(component, cats);
            component.set("v.allCategories", cats);
        }
    },

    tmpHandlePress : function(component, event, helper) {
        // let statusChange = component.getEvent("categoryStatusChange");
        // statusChange.setParams({
        //     "status": 0
        // });
        // statusChange.fire();
        // console.log("event categoryStatusChange fired!")

        let categoriesChange = component.getEvent("categoriesChange");
        let btnid = event.getSource().getLocalId();
        categoriesChange.setParams({
            "current": btnid[btnid.length-1],
            "categories": []
        });
        categoriesChange.fire();
        console.log("event categoriesChange fired!")
    }
})