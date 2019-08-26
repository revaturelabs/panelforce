({
    generateElem : function(component, elemName, params) {
        $A.createComponent(
            elemName, 
            params,

            function(elem, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    component.set("v.body", "");
                    var body = component.get("v.body");
                    body.push(elem);
                    component.set("v.body", body);
                    console.log("component " + elemName + " was created");

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
    }
})