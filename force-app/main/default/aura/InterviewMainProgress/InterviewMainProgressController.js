({
    doInit : function(component, event, helper) {
        // console.log("progress got cats: " + JSON.stringify(component.get("v.allCategories")));

        helper.generateButtons(component, component.get("v.allCategories"));
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

        // console.log("cat form event: " + cats);

        if (cats.length == 1) {
            allCats[next] = cats;
            component.set("v.allCategories", allCats);
        }

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

    buttonClick : function(component, event, helper) {
        let indx = parseInt(event.getSource().getLocalId().split("-")[1]);

        let compEvent = $A.get("e.c:InterviewMainEvent");
        compEvent.setParams({
            "current": indx,
            "categories": []
        });
        compEvent.fire();
    }

})