({

    autoTimer: function(component, event, helper){
        console.log("Auto timer got called");
        var getAppState = event.getParam("state"); 
        let startStopTime;
        let sst = component.get("v.totalInterviewTimeList");
        if(state == 1){
            sst.push([Date.now(), -1]);
            component.set("v.totalInterviewTimeList", sst);
        }
        else if(state == 2){
            sst[sst.length-1][1] = Date.now();
            component.set("v.totalInterviewTimeList", sst);       
         }

         if(state != 0){

            startStopTime = sst[1] - sst[0];
            let assessmentComp = component.get("v.assessment");
            paramT = component.get("c.totalTimeDiff");

            paramT.setParams({
                "totalTime": startStopTime,
                "phAss": assessmentComp
            });

            paramT.setCallback(this, function(a) {
                var state = a.getState();
                 if (state === "ERROR") {
                    console.log(a.getError()[0].message);
                 }
             });
            $A.enqueueAction(paramT);
         }
        
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
        console.log("Pause start got clicked");
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
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    let handlePass = component.get("c.updatePass");
                    let com = component.get("v.commentAtt");
                    console.log(JSON.stringify(com));
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    let AssessLineCat = component.get("v.lineItemCategories");
                    console.log(JSON.stringify(AssessLineCat));
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    let lItemIndex = component.get("v.lineItemIndex");
                    console.log(JSON.stringify(lItemIndex));
                    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");


                        
                    handlePass.setParams({
                        "comment": com,
                        "AssLineItem": AssessLineCat[lItemIndex]
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
        let AssessLineCat = component.get("v.lineItemCategories");
        var lItemIndex = component.get("v.lineItemIndex");


        handleFail.setParams({
            "comment": com,
            "AssLineItem": AssessLineCat[lItemIndex]
        });

        handleFail.setCallback(this, function(a) {
            var state = a.getState();
             if (state === "ERROR") {
                console.log(a.getError()[0].message);
             }
         });

        $A.enqueueAction(handleFail);
        component.set('v.openModal2',false);
    },

    setCurrentLineItem : function(component, event, helper) {
        console.log("////////////////////////////////////////////////////////////////////////////////////////");
        var lItemIndex = event.getParam("current");   
        console.log(JSON.stringify(lItemIndex));
        component.set("v.lineItemIndex", lItemIndex);
    }
})