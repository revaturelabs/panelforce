// {!REQUIRESCRIPT('/soap/ajax/37.0/connection.js')}
({

    // Fetches all the relevant records, stores them in v.records, and performs initial population.
    loadList: function(component, event, helper) {
        component.set("v.searchText", "");
        let assessmentID = component.get("v.recordId");
        var items;
        // Performs the fetching using apex
        var action = component.get("c.fetchLineItems");
        action.setParams({ PanelId: assessmentID });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Save records returned from apex SOQL
                items = response.getReturnValue();
                component.set("v.records", items);
                // Populate the list
                items.forEach(listItem => {
                    helper.addListItem(component, listItem);
                });
            }
        });
        $A.enqueueAction(action);
    },

    // Performs filtering acording to currently selected mode (All|Pass|Fail), and search text
    filterResults: function(component, event, helper) {
        let buttonSelection = component.get("v.buttonSelection");
        let searchText = component.get("v.searchText");
        let records = component.get("v.records");
        // First clear v.body
        component.set("v.body", "");
        records.forEach(record => {
            // Don't add records without containing 'searchText' in the Name
            if (!record["Name"].toUpperCase().includes(searchText.toUpperCase())) {
                return;
            }
            // Don't add failed records when filter mode is 'Pass'
            if (buttonSelection == "Pass" && record["Status__c"] == false) {
                return;
            }
            // Don't add passeded records when filter mode is 'Fail'
            if (buttonSelection == "Fail" && record["Status__c"] == true) {
                return;
            }
            // Add element if it passed through all previous filterings
            helper.addListItem(component, record);
        });
    },

    // Set button selection, and appropriate styling when a button is clicked
    buttonClick: function(component, event, helper) {
        let source = event.getSource().getLocalId();
        let buttonSelection = "";
        let buttonGroup = component.find("filterButtons").get("v.body");
        // Reset buttons
        buttonGroup.forEach(button => {
            button.set("v.variant", "neutral");
        });
        // Set corresponding button style and button filter mode
        switch (source) {
            case "allButton":
                buttonSelection = "All";
                component.find("allButton").set("v.variant", "brand");
                break;
            case "passButton":
                buttonSelection = "Pass";
                component.find("passButton").set("v.variant", "brand");
                break;
            case "failButton":
                buttonSelection = "Fail";
                component.find("failButton").set("v.variant", "brand");
                break;
            default:
                console.log("error");
                break;
        }
        // Finalize button filter mode
        component.set("v.buttonSelection", buttonSelection);
    },

    // Enable editing when clicking the field
    labelClick: function(component, event, helper) {
        console.log("label clicked!");
        event.getSource().set("v.readonly", false);
        // console.log(source);
    },

    // Disable editing when field loses focus
    labelBlur: function(component, event, helper) {
        console.log("label blurred!" + event.getSource().getLocalId());
        event.getSource().set("v.readonly", true);
        console.log(component.get("v.records"));
        // console.log(source);
    },

    // Show comments when li element clicked
    liClick: function(component, event, helper) {
        console.log("Category list: " + component.find("CategoryList"));
        let componentBody = component.get("v.body");
        console.log("body: " + componentBody);
        // First hide all comments
        for (let i = 1; i < componentBody.length; i++) {
            let localId = componentBody[i].getLocalId();
            let currComment = component.find("Comment " + localId);
            $A.util.addClass(currComment, "slds-hide");
        };

        console.log("LI Clicked:" + component.find("Comment " + event.srcElement["id"]));
        // console.log(component.find("Comment " + event.srcElement["id"]));
        // Reveal selected element
        let selectedComment = component.find("Comment " + event.srcElement["id"]);
        $A.util.removeClass(selectedComment, "slds-hide");
    },

    liBlur: function(component, event, helper) {
        console.log("Things are getting blurry");
        $A.util.addClass(component.find("Comment" + event.srcElement["id"]), "slds-hide");
    },

    // Fires the update event to the parent controller
    updateCategories: function(component, event, helper) {
        let customEvent = component.getEvent("updateCategoriesEvent");
        let records = [{
            sobjectType: "Contact",
            Param1: "I_am_a_param",
            Param2: "I_am_another_param"
        }];
        customEvent.setParams({
            // Some placeholder stuff here
            updateCategories: records
        });
        customEvent.fire();
    }
});