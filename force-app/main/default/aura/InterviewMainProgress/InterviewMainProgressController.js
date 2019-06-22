({
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
    }
})