({
    
    doInit : function(component, event, helper) {
        //let recId = component.get("v.recordId");
        
        //Current Index is default 0
        var current = component.get("v.current");
        
        var action1 = component.get("c.getTrainAssign");
        var recordId = component.get("v.recordId");
        action1.setParams({ recId : recordId });
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //Set up the interview
                let assignment = response.getReturnValue();
                component.set("v.assignment", assignment);
                
            }
            
        });
        
        var action2 = component.get("c.getCategories");
        action2.setParams({ recId : recordId });
        action2.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //Set up the categories
                let categories = response.getReturnValue();
                component.set("v.categories", categories);
                //Set the max number of categories
                let catsize = categories.length - 1;
                component.set("v.catsize", catsize);
                //Get the current category
                let category = categories[current];
                component.set("v.category", category);
            }
        });
        
        $A.enqueueAction(action1);
        $A.enqueueAction(action2);
    },
    
    appStateChange : function(component, event, helper) {
        //Determine if the forward or backward button was pressed
        let whichOne = event.getSource().getLocalId();
        
        
    },
    
    categoriesChange : function(component, event, helper) {
        //Determine if the forward or backward button was pressed
        let whichOne = event.getSource().getLocalId();
        //Get the current index
        var current = component.get("v.current");
        //Backward button
        if(whichOne == "backward"){
            current -= 1;
            //If index is zero, disable the previous button
            if(current == 0){
                let button = component.find('backward');
                button.set('v.disabled',true);
            }
            //Make sure the forward button is enabled
            let button = component.find('forward');
            button.set('v.disabled',false);
        }
        else if(whichOne == "forward"){
            current += 1;
            //If index is at max size, disable the forward button
            //Get the size of the array
            let catsize = component.get("v.catsize");
            if(current == catsize){
                let button = component.find('forward');
                button.set('v.disabled',true);
            }            
            //Make sure the previous button is enabled
            let button = component.find('backward');
            button.set('v.disabled',false);
        }
        
        //Set the current index attribute
        component.set("v.current", current);
        
        //Set the new category from the new current index
        let categories = component.get("v.categories");
        let category = categories[current];
        component.set("v.category", category);
        
        //Pass the current index to the child components
        //TODO
    }
    
})