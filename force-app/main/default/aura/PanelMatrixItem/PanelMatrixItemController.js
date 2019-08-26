({
    categoryDelete : function(component, event, helper) {
        let ind = component.get('v.index');
        let cmpEvent = component.getEvent("categoryChange");
        cmpEvent.setParams({
            "category" : {},
            "index" : ind
        });
        cmpEvent.fire();
    },

    categoryEdit : function(component, event, helper) {
        let cat = component.get('v.category');
        let ind = component.get('v.index');
        let cmpEvent = component.getEvent("categoryChange");
        cmpEvent.setParams({
            "category" : cat,
            "index" : ind
        });
        cmpEvent.fire();
    }
})