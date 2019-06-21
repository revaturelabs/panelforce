({

    doInit: function(component, event, helper){
        let onloadTimeStamp = Date.now();
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
            });
            component.set("v.timeStampList", totalDiff);

            
            let paramV = component.get("c.insertTimeStamp");
            let timeStampComp = component.get("v.timeStampList");
            let assessmentComp = component.get("v.assessment");
           
            paramV.setParams({
                "sTimeStamp": timeStampComp,
                "phAss": assessmentComp
            });
            paramV.setCallback(this, function(a) {
                var state = a.getState();
                 if (state === "ERROR") {
                    console.log(a.getError()[0].message);
                 }
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


            timeButton.set('v.label','Resume');
            timeButton.set('v.variant', "success");
            component.set('v.togglebtn', true);
         }
           else if(tb == true){
           pauseStart[pauseStart.length-1][1] = Date.now();
           component.set("v.pauseStartList", pauseStart);


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
    },

    openModal2 : function(component, event, helper) {
		component.set('v.openModal2',true);
    },

    closeModal2 : function(component, event, helper) {
		component.set('v.openModal2',false);
    },

    closeerrorM : function(component, event, helper) {
		component.set('v.errorM',false);
    },

    openerrorM : function(component, event, helper) {
        let com = component.get("v.commentAtt");   
        if(com == ""){
            component.set("v.errorM",true);
        }
        else{
            component.set('v.openModal2',true);
        }
    },


    closeModal2Pass : function(component, event, helper) {

                    let handlePass = component.get("c.updatePass");
                    let com = component.get("v.commentAtt");
                    let panelcat = component.get("v.panelCat");
                    let phAssess = component.get("v.assessment");
                        
                    handlePass.setParams({
                        "comment": com,
                        "phAss": phAssess,
                        "pc": panelcat
                    });

                    handlePass.setCallback(this, function(a) {
                        var state = a.getState();
                        if (state === "ERROR") {
                            console.log(a.getError()[0].message);
                         }  
                     });
            
                    $A.enqueueAction(handlePass);
                    component.set('v.openModal2',false);
                },
               
    
    closeModal2Fail : function(component, event, helper) {

        let handleFail = component.get("c.updateFailed");
        let com = component.get("v.commentAtt");
        let panelcat = component.get("v.panelCat");
        let phAssess = component.get("v.assessment");

        handleFail.setParams({
            "comment": com,
            "phAss": phAssess,
            "pc": panelcat
        });

        handleFail.setCallback(this, function(a) {
            var state = a.getState();
             if (state === "ERROR") {
                console.log(a.getError()[0].message);
             }
         });

        $A.enqueueAction(handleFail);
        component.set('v.openModal2',false);
    }
})