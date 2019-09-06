({
    SaveALI : function(component, event, helper) {
        var action = component.get("c.SaveALI");
        action.setStorable();
        action.setParams("{!v.category}","{!v.score}", "{!v.repanel}", "{!v.comments}");
        action.setCallback(this, function(repsonse) {
            console.log("Progress Saved");
        },
        
          $A.enqueAction(action));
        
    }
})