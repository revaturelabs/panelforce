//handler click for adding +1
({
    doInit : function(cmp, event, helper) {
        let allCats = cmp.get("v.categories");
        let indx = cmp.get("v.currentIndex");
        cmp.set("v.Max_Score", allCats[indx].maxScore__c);
    },

    handleClickA1: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
       helper.helperMethod(cmp, 1);
    },

//handler click for adding +3

    handleClickA3: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
        helper.helperMethod(cmp, 3);
    },

//handler click for adding +5
    handleClickA5: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
        helper.helperMethod(cmp, 5);
    },

//handler click for subtracting -1
    handleClickS1: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
        helper.helperMethod(cmp, -1);
    },


//handler click for subtracting -3
    handleClickS3: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
        helper.helperMethod(cmp, -3);
    },


//handler click for subtracting -5
    handleClickS5: function (cmp, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        console.log("Button label: " + selectedButtonLabel);
        helper.helperMethod(cmp, -5);
    }

})