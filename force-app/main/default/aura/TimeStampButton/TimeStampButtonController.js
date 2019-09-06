({
createTimestamp: function(component, event, helper) {
    var assessmentId = component.get('v.AssessmentId');
    var panelCategoryId = component.get('v.PanelCategoryId');
    var action = component.get('c.saveTimestamp');
     action.setParams({ 
        'assessmentId': assessmentId,
        'panelCategoryId' : panelCategoryId
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