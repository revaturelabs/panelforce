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
        if(com == "") {
            component.set("v.errorM",true);
        }
    },


    closeModal2 : function(component, event, helper) {
        let handlePass = component.get("c.updateCategory");
        let com = component.get("v.commentAtt");
        // console.log(JSON.stringify(com));
        let AssessLineCat = component.get("v.lineItemCategories");
        // console.log(JSON.stringify(AssessLineCat));
        let lItemIndex = component.get("v.lineItemIndex");
        // console.log("lItemIndex: " + lItemIndex);
        let liToChange = AssessLineCat[lItemIndex];

        liToChange.Comment__c = com;
        
        let aid = event.getSource().getLocalId();
        let newStatus = (aid == 'pass') ? true : false;
        if (aid != 'comm') {
            if (liToChange.Interviewed__c && newStatus && liToChange.Status__c) {
                liToChange.Status__c = false
                liToChange.Interviewed__c = false;
                helper.colorButtons(component, 2);
            } else if (liToChange.Interviewed__c && (!newStatus) && (!liToChange.Status__c)) {
                    liToChange.Status__c = false
                    liToChange.Interviewed__c = false;
                    helper.colorButtons(component, 2);
            } else {
                // this does that (just read the code, duh)
                if (com.length == 0 && (!newStatus)) {
                    component.set("v.errorM", true);
                } else {   
                    liToChange.Status__c = newStatus;
                    liToChange.Interviewed__c = true;
                    if (liToChange.Status__c) helper.colorButtons(component, 1);
                    else helper.colorButtons(component, 0);
                }
            }
        }

        

        // console.log("liToChange: " + liToChange);
            
        handlePass.setParams({
            "AssLineItem": liToChange
        });

        handlePass.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS") {
                AssessLineCat[lItemIndex] = liToChange;
                component.set("v.lineItemCategories", AssessLineCat);
                helper.fireInterviewMain(lItemIndex, liToChange);
            } else if (state === "ERROR") {
                console.log(a.getError()[0].message);
                if (liToChange.Status__c) {
                    helper.colorButtons(component, 2);
                } else {
                    helper.colorButtons(component, 2);
                }
            } 
        });

        $A.enqueueAction(handlePass);
        component.set('v.openModal2',false);
    },

    setCurrentLineItem : function(component, event, helper) {
        var lItemIndex = event.getParam("current");
        component.set("v.lineItemIndex", lItemIndex);

        let cat = component.get("v.lineItemCategories")[lItemIndex];
        component.set("v.commentAtt", cat.Comment__c);
        if (!cat.Interviewed__c) {
            helper.colorButtons(component, 2);
            return;
        }
        if (cat.Status__c) {
            helper.colorButtons(component, 1);
        } else {
            helper.colorButtons(component, 0);
        }

    }
})