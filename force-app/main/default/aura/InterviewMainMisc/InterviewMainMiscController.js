({

    doInit: function(component, event, helper){
        let onloadTimeStamp = Date.now();
        console.log(onloadTimeStamp);
    },

    //end the interview
    endPage:  function(component, event, helper){
        let endTimeStamp = Date.now();
        alert(endTimeStamp);
    },

    terminate : function(component, event, helper) {
        var win = window.open("","_self");
        win.close();
    },

    timeStamp : function(component, event, helper){
        let pauseStartDiff = component.get("v.pauseStartList");
        let totalDiff = [];
            pauseStartDiff.forEach(pauseStartSet => {
                totalDiff.push(pauseStartSet[1] - pauseStartSet[0]);
               // console.log(pauseStartSet[1] - pauseStartSet[0]); //divide by a thousand to get value in seconds
            });
            component.set("v.timeStampList", totalDiff);
            console.log("Difference logged");
            console.log(totalDiff);

            
            let paramV = component.get("c.insertTimeStamp");
            paramV.setParams({
                        sTimeStamp : "v.timeStampList",
                        phAss : "v.assessment"
                            });
            $A.enqueueAction(paramV);

    },

    startTime : function(component, event, helper) { 
        let timeButton = event.getSource();
        var tb = component.get("v.togglebtn");
        let pauseStart = component.get("v.pauseStartList");
       
      
         if(tb == false){
            pauseStart.push([Date.now(), -1]);
            component.set("v.pauseStartList", pauseStart);

            alert("you clicked pause");
            timeButton.set('v.label','Resume');
            timeButton.set('v.variant', "success");
            component.set('v.togglebtn', true);
         }
           else if(tb == true){
           pauseStart[pauseStart.length-1][1] = Date.now();
           component.set("v.pauseStartList", pauseStart);
           console.log(pauseStart);


            alert("You clicked resume");
            timeButton.set('v.label','Pause');
            timeButton.set('v.variant', "destructive");
            component.set('v.togglebtn', false);  
         }    
    },

    openModal : function(component, event, helper) {
		component.set('v.openModal',true);
	},
 
	closeModal : function(component, event, helper) {
		component.set('v.openModal',false);
	}
})