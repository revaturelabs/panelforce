({
    helperMethod: function() {

    },
    addListItem: function(component, listItem, index) {
        $A.createComponents(
            [
                // New list item
                ["aura:html", { tag: "li", "aura:id": listItem["Name"], HTMLAttributes: { id: listItem["Name"], class: "slds-item CategoryItem", onclick: component.getReference("c.liClick") } }],
                // Container inside the list item
                ["lightning:layout", { "aura:id": "id", class: "CategoryLayout slds-align_absolute-center", name: listItem["Id"] }],

                // Category name
                [
                    "lightning:layoutItem",
                    { class: "CategoryName slds-align_absolute-center", padding: "around-small" }
                ],
                ["lightning:formattedText", { type: "text", name: index, value: listItem["Name"], readonly: "true" }],

                // Category Score
                [
                    "lightning:layoutItem",
                    { class: "CategoryScore slds-align_absolute-center", flexibility: "no-grow", size: 3, padding: "around-small" }
                ],
                ["lightning:input", { type: "text", name: index, "aura:id": "Score__c", value: listItem["Score__c"], readonly: "true", onblur: component.getReference("c.labelBlur"), onclick: component.getReference("c.labelClick") }],

                // Icon container
                [
                    "lightning:layoutItem",
                    { class: "CategoryResult slds-align_absolute-center", flexibility: "no-grow", size: 2, padding: "around-small" }
                ],
                // Comment
                ["lightning:input", { type: "text", class: "slds-hide", "aura:id": "Comment " + listItem["Name"], name: index, value: listItem["Comment__c"], readonly: "true", onblur: component.getReference("c.labelBlur"), onclick: component.getReference("c.labelClick") }],

                // Icon
                ["lightning:icon", { iconName: (listItem["Status__c"]) ? "action:approval" : "action:close", size: "xx-small" }]
            ],
            function(subparts, status, errorMessage) {
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    // Get component's v.body to populated list
                    var body = component.get("v.body");

                    // li and layout container
                    var liContainer = subparts[0];
                    var layout = subparts[1];

                    // Category Name
                    var categoryNameItem = subparts[2];
                    var categoryName = subparts[3];
                    categoryNameItem.set("v.body", categoryName);

                    // Category Score
                    var scoreItem = subparts[4];
                    var score = subparts[5];
                    scoreItem.set("v.body", score);

                    // Category flag icon
                    var iconItem = subparts[6];
                    var comment = subparts[7];

                    // console.log("Comment: " + listItem["Comment_c"]);
                    var icon = subparts[8];
                    iconItem.set("v.body", icon);

                    // Set, push, and commit
                    layout.set("v.body", [categoryNameItem, scoreItem, iconItem]);
                    liContainer.set("v.body", [layout, comment]);

                    // liContainer.get("v.body").push(comment);
                    body.push(liContainer);
                    component.set("v.body", body);
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                    // Show offline error
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
    },

    // Fires the update event to the parent controller
    updateCategories: function(component, event, helper) {
        // let compEvent = $A.get("e.c:InterviewMainEvent");
        let customEvent = component.getEvent("updateCategoriesEvent");
        // let records = [{
        //     sobjectType: "Contact",
        //     Param1: "I_am_a_param",
        //     Param2: "I_am_another_param"
        // }];
        let records = component.get("v.records");
        console.log("records: " + records);
        records.forEach(rec => {
            console.log(Object.keys(rec));
            console.log(rec["Score__c"]);
        });
        customEvent.setParams({
            // Some placeholder stuff here
            updateCategories: records
        });
        customEvent.fire();
    }
})