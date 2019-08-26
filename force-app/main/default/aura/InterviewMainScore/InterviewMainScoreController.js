//handler click for adding +1
({
    doInit : function(cmp, event, helper) {
        let allCats = cmp.get("v.categories");
        console.log("allCats: " + allCats);
        // let indx = cmp.get("v.currentIndex");
        cmp.set("v.Max_Score", allCats[0].maxScore__c);
        cmp.set("v.Current_Score", allCats[0].maxScore__c);
    },
    
   handleComponentEvent :function(cmp,event){
       console.log("event handles in handleComponentEvent");
       let index = event.getParam("current");
       cmp.set("v.currentIndex",index);
       let allCats = cmp.get("v.categories");
       cmp.set("v.Max_Score", allCats[index].maxScore__c);
       cmp.set("v.Current_Score",allCats[index].Score__c); 
       console.log("done");
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