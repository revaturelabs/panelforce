({
createTimestamp: function(component, event, helper) {
    var assessmentId = component.get('v.AssessmentId');
    var panelCategory = component.get('v.PanelCategory');
    var action = component.get('c.saveTimestamp');
     action.setParams({ 
        'assessmentId': assessmentId,
        'panelCategory' : panelCategory
    });
     action.setCallback(this, function(a) {
           var state = a.getState();
            if (state === 'SUCCESS') {
            }
         else
         {
             var errors = response.getError();                      
             component.set("v.showErrors",true);
             component.set("v.errorMessage",errors[0].message);

              alert('Timestamp Failed To Insert');
             
         }
        });
    $A.enqueueAction(action)
}})