({
    helperMethod: function() {

    },
    addListItem: function(component, listItem) {
        $A.createComponents(
            [
                ["aura:html", { tag: "li", HTMLAttributes: { class: "slds-item CategoryItem" } }],
                ["lightning:layout", { class: "CategoryLayout" }],
                // Category name
                [
                    "lightning:layoutItem",
                    { class: "CategoryName", padding: "around-small" }
                ],
                ["lightning:input", { type: "text", name: "CategoryName", value: listItem["Name"], readonly: "true" }],
                // Category Score
                [
                    "lightning:layoutItem",
                    { class: "CategoryScore", padding: "around-small" }
                ],
                ["lightning:input", { type: "text", name: "Score", value: listItem["Score__c"], readonly: "true", onblur: component.getReference("c.labelBlur"), onclick: component.getReference("c.labelClick") }],
                // Category pass/fail flag
                [
                    "lightning:layoutItem",
                    { class: "CategoryResult", padding: "around-small" }
                ],
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
                    var icon = subparts[7];
                    iconItem.set("v.body", icon);
                    // Set, push, and commit
                    layout.set("v.body", [categoryNameItem, scoreItem, iconItem]);
                    liContainer.set("v.body", layout);
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
    }
})