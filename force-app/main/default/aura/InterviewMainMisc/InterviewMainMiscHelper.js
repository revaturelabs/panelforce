({
    fireInterviewMain : function(indx, cats) {
        let compEvent = $A.get("e.c:InterviewMainEvent");
        compEvent.setParams({
            "current": indx,
            "categories": cats
        });
        compEvent.fire();
    },

    colorButtons : function (component, color) {
        console.log("coloring: " + color);
        let passbtn = component.find("pass");
        let failbtn = component.find("fail");
        // console.log("found buttons: " + passbtn + "; " + failbtn);
        $A.util.removeClass(passbtn, "white-btn");
        $A.util.removeClass(failbtn, "white-btn");
        console.log("removed white");

        switch(color) {
            case 0: // red
                $A.util.removeClass(passbtn, "green-btn");
                $A.util.addClass(passbtn, "white-btn");
                $A.util.addClass(failbtn, "red-btn");
                break;
            case 1: // green
                $A.util.removeClass(failbtn, "red-btn");
                $A.util.addClass(failbtn, "white-btn");
                $A.util.addClass(passbtn, "green-btn");
                break;
            case 2: // white
                $A.util.removeClass(passbtn, "green-btn");
                $A.util.removeClass(failbtn, "red-btn");

                $A.util.addClass(passbtn, "white-btn");
                $A.util.addClass(failbtn, "white-btn");
                break;
        }
    }
})