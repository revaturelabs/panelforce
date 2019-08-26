({
    generateButtons : function(component, cats) {
        var count = 0;
        cats.forEach(function(el) {
            var roundness = "";
            if(count == 0) roundness = "first-btn"
            else if (count == cats.length-1) roundness = "last-btn";

            var btnColor = "";
            if(!el.Interviewed__c) {
                btnColor = "white-btn";
            } else if(el.Status__c) {
                btnColor = "green-btn";
            } else {
                btnColor = "red-btn";
            }

            if (component.get("v.currentCat") == count) {
                btnColor = "blue-btn";
            }

            $A.createComponent(
                "lightning:button",
                {
                    "aura:id": "btn-"+count,
                    "label": el.Name,
                    "class": "slds-col "+ btnColor +" "+ roundness,
                    "onclick": component.getReference("c.buttonClick")
                },
                function(newButton, status, errorMessage){
                    //Add the new button to the body array
                    if (status === "SUCCESS") {
                        var body = component.get("v.body");
                        body.push(newButton);
                        component.set("v.body", body);
                    }
                    else if (status === "INCOMPLETE") {
                        console.log("No response from server or client is offline.")
                        // Show offline error
                    }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        // Show error message
                    }
                }
            );

            count++;    
        })
        
    }
})