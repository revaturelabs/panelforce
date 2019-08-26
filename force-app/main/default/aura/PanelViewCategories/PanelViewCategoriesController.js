({

    // Loads and performs filtering acording to currently selected mode (All|Pass|Fail), and search text
    loadList: function(component, event, helper) {
        console.log("In loadList");
        let buttonSelection = component.get("v.buttonSelection");
        let searchText = component.get("v.searchText");
        let categories = component.get("v.categories");
        // First clear v.body
        let vbody = component.get("v.body");
        vbody.forEach(elem => {
            elem.destroy();
        });
        // component.set("v.body", []);

        categories.forEach((record, i) => {
            // Don't add categories without containing 'searchText' in the Name
            if (!record["Name"].toUpperCase().includes(searchText.toUpperCase())) {
                return;
            }
            // Don't add failed categories when filter mode is 'Pass'
            if (buttonSelection == "Pass" && record["Status__c"] == false) {
                return;
            }
            // Don't add passeded categories when filter mode is 'Fail'
            if (buttonSelection == "Fail" && record["Status__c"] == true) {
                return;
            }
            // Add element if it passed through all previous filterings
            helper.addListItem(component, record, i);
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
        event.getSource().set("v.readonly", false);
        let id = String(event.getSource().getLocalId());
        let name = event.getSource().get("v.name");
        let record = component.get("v.categories")[name];
        console.log("ID: " + id);
        if (id.includes('Score')) {
            event.getSource().set("v.value", record["Score__c"]);
        }
        event.stopPropagation();
    },

    // Disable editing when field loses focus
    labelBlur: function(component, event, helper) {
        // Reset readonly styling
        event.getSource().set("v.readonly", true);
        // Setup for updating changes
        let id = String(event.getSource().getLocalId());
        let name = event.getSource().get("v.name");
        let record = component.get("v.categories")[name];
        // Determine which field to update
        if (id.includes('Comment')) {
            record["Comment__c"] = event.getSource().get("v.value");
        } else {
            record["Score__c"] = event.getSource().get("v.value");
            event.getSource().set("v.value", record["Score__c"] + "/" + record["maxScore__c"]);
        }
        helper.updateCategories(component);
    },

    // Show comments when li element clicked
    liClick: function(component, event, helper) {
        // First hide all comments
        let componentBody = component.get("v.body");
        console.log("Event info" + event.srcElement['Name']);
        console.log("Event info" + event.target['Name']);
        console.log("Event info" + JSON.stringify(Object.keys(event)));
        console.log("Event info" + JSON.stringify(Object.keys(event.target)));
        componentBody.forEach(comp => {
            let localId = comp.getLocalId();
            let currComment = component.find("Comment " + localId);
            if (event.srcElement["id"] == localId) {
                console.log("I found a match here!!!!!!!!!!!!");
                return;
            }
            if (currComment) {
                $A.util.addClass(currComment, "slds-hide");
            }
        });
        // Show the corresponding comment
        let selectedComment = component.find("Comment " + event.srcElement["id"]);
        // $A.util.removeClass(selectedComment, "slds-hide");
        $A.util.toggleClass(selectedComment, "slds-hide");
        // $A.util.addClass(selectedComment, "commentStyle");
    }
});