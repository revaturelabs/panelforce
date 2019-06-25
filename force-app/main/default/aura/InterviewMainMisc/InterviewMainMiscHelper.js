({
    fireInterviewMain : function(indx, cats) {
        let compEvent = $A.get("e.c:InterviewMainEvent");
        compEvent.setParams({
            "current": indx,
            "categories": cats
        });
        compEvent.fire();
    }
})