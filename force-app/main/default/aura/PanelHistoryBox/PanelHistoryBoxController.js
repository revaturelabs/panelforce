({
    doInit : function(component, event, helper) {
        // grabbing the attribute from the cmp
        var IdComponent = component.get("v.IdComponent");
        // calling and setting params for the helper
        let assessments = helper.getAssessmentHelper(component, IdComponent);
     },
            
})