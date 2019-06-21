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
    
    buttonChange : function(component, whichOne){
        let buttonId;
        let buttonName;
        let buttonIcon;
        let buttonText;
        let buttonAction;

        //Figure out which button to change
        if(whichOne == "forward"){
            //Create the finish button parameters
            buttonId = "finish";
            buttonName = "finishButton";
            buttonIcon = "utility:check";
            buttonText = "Finish Interview",
            buttonAction = "c.appStateChange";

        }else if(whichOne == "backward"){
            //Create the forward button parameters
            buttonId = "forward";
            buttonName = "forwardButton";
            buttonIcon = "utility:chevronright";
            buttonText = "Next Category";
            buttonAction = "c.categoriesChange";
        }
        //Create the button
        $A.createComponent(
            "lightning:buttonIcon",
            {
                "aura:id": buttonId,
                "name": buttonName,
                "iconName": buttonIcon,
                "alternativeText": buttonText,
                "size" : "large",
                "onclick": component.getReference(buttonAction)
            },
            function(newButton){
                var divComponent = component.find("rightbutton");
                divComponent.set("v.body",newButton);
            }
        );

    }

})