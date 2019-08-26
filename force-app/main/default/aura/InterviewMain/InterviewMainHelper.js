({
    
    changeEvent : function(currIndex, categories) {
        //Get the event
        let compEvent = $A.get("e.c:InterviewMainEvent");
        //Set up the parameters
        compEvent.setParams({
            "current": currIndex,
            "categories": categories
        });
        //Fire the event
        compEvent.fire();
    },
    
    buttonChange : function(component, buttonPressed) {
        //let button = (buttonPressed === "forward") ? this.createFinishButon(component) : this.createForwardButton(component);
        //console.log('here');
        //$A.createComponent("lightning:buttonIcon", button, setNewButton());
        //console.log('not here');
        var button;
        if (buttonPressed === "forward") {
            button = {
                "aura:id" : "finish",
                "name" : "finishButton",
                "iconName" : "utility:check",
                "iconClass" : "icon checkmark",
                "alternativeText" : "Finish Interview",
                "size" : "large",
                "variant" : "bare",
                "class" : "finish button slds-float_right",
                "onclick" : component.getReference("c.appStateChange")
            };
        } else {
            button = {
                "aura:id" : "forward",
                "name" : "forwardButton",
                "iconName" : "utility:chevronright",
                "iconClass" : "icon arrow",
                "alternativeText" : "Next Category",
                "size" : "large",
                "variant" : "bare",
                "class" : "next button slds-float_right",
                "onclick" : component.getReference("c.categoriesChange")
            };
        }
        
        $A.createComponent("lightning:buttonIcon", button, function(newButton) {
            let buttonContainer = component.find("rightbutton");
            buttonContainer.set("v.body", newButton);
        });
    },        
    
    setNewButton : function(component, newButton) {
        let buttonContainer = component.find("rightbutton");
        buttonContainer.set("v.body", newButton);
    },
    
    createForwardButton: function(component) {
        return {
            "aura:id" : "forward",
            "name" : "forwardButton",
            "iconName" : "utility:chevronright",
            "iconClass" : "icon arrow",
            "alternativeText" : "Next Category",
            "size" : "large",
            "variant" : "bare",
            "class" : "next button slds-float_right",
            "onclick" : component.getReference("c.categoriesChange")
        }
    },
    
    createFinishButon: function(component) {
        return {
            "aura:id" : "finish",
            "name" : "finishButton",
            "iconName" : "utility:check",
            "iconClass" : "icon checkmark",
            "alternativeText" : "Finish Interview",
            "size" : "large",
            "variant" : "bare",
            "class" : "finish button slds-float_right",
            "onclick" : component.getReference("c.appStateChange")
        }
    },
    
})