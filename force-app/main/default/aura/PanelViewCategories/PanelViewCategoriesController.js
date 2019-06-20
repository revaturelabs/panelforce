// {!REQUIRESCRIPT('/soap/ajax/37.0/connection.js')}
({

    loadList: function(component, event, helper) {
        console.log("loadList Fired!!");
        component.set("v.searchText", "");
        let assessmentID = component.get("v.recordId");
        // console.log(assessmentID);
        // result = sforce.connection.query("Select Name, Id FROM AssessmentLineItem__c WHERE PH_Assessment__c = " + assessmentID);
        // records = result.getArray("AssessmentLineItem__c");
        var action = component.get("c.fetchLineItems");
        var items;
        action.setParams({ PanelId: assessmentID });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success!");
                items = response.getReturnValue();
                component.set("v.records", items);
                items.forEach(listItem => {
                    console.log("item: " + JSON.stringify(listItem));
                    helper.addListItem(component, listItem);
                });
            }
        });
        $A.enqueueAction(action);
    },

    filterResults: function(component, event, helper) {
        let buttonSelection = component.get("v.buttonSelection");
        let searchText = component.get("v.searchText");
        let records = component.get("v.records");
        component.set("v.body", "");
        records.forEach(record => {
            // Only add records with name containing searchText
            if (!record["Name"].toUpperCase().includes(searchText.toUpperCase())) {
                return;
            }
            // console.log("selection: " + buttonSelection);
            // console.log("status: " + record["Status__c"]);
            if (buttonSelection == "Pass" && record["Status__c"] == false) {
                return;
            }
            if (buttonSelection == "Fail" && record["Status__c"] == true) {
                return;
            }
            helper.addListItem(component, record);
            // console.log("adding item");
            // console.log("Name: " + record["Name"]);
        });
        // console.log(searchText);
    },

    buttonClick: function(component, event, helper) {
        let source = event.getSource().getLocalId();
        console.log("Source: " + source);
        let buttonSelection = "";
        let buttonGroup = component.find("filterButtons").get("v.body");
        buttonGroup.forEach(button => {
            button.set("v.variant", "neutral");
        });
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
        component.set("v.buttonSelection", buttonSelection);
    },

    labelClick: function(component, event, helper) {
        console.log("label clicked!");
        event.getSource().set("v.readonly", false);
        // console.log(source);
    },
    labelBlur: function(component, event, helper) {
        console.log("label clicked!");
        event.getSource().set("v.readonly", true);
        // console.log(source);
    },

    updateCategories: function(component, event, helper) {
        let customEvent = component.getEvent("updateCategoriesEvent");
        // let records = [{...},{...}];
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