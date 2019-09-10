({
createTimestamp: function(component, event, helper) {
    var assessmentId = component.get("v.assessment");
    var action = component.get("c.saveTimestamp");
     action.setParams({ 
        "assessmentId": assessmentId
    });
     action.setCallback(this, function(a) {
           var state = a.getState();
            if (state === "SUCCESS") {
               alert("success");
            }
         else
         {
              alert("Failed");
         }
        });
    $A.enqueueAction(action)
}})