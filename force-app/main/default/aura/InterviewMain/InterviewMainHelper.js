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
    }
    
})