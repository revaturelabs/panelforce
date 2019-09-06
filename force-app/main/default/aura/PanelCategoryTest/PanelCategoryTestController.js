({
    SaveALI : function(component, event, helper) {
        var action = component.get("c.saveALI");
        //action.setStorable();
        action.setParams({
            "ALIId" : component.get("v.category"),
            "score" : component.get("v.score"), 
            "repanel" : component.get("v.repanel"), 
            "comments" : component.get("v.comments")
        });
        action.setCallback(this, function(response) {
            console.log("Progress Saved");
        });
        
        $A.enqueAction(action);
        
    },
})