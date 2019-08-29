({
	callReturnAssessments : function(component) {
		var getReturnAssessments = component.get("c.returnAssessments");
        
        getReturnAssessments.setParams({

        });
        
        getReturnAssessments.setCallback(this, function(response){
        	var state = response.getState();
            
            if(state === "SUCCESS"){
            	component.set("v.", response.getReturnValue());
            }
            else if (state === "ERROR"){
                
            }
        });
        

		$A.enqueueAction(getReturnAssessment);
	},
    
    callGetAssessmentId : function(component){
        var getAssessmentId = component.get("c.getAssessmentId");
        
        getReturnAssessments.setParams({

        });
        
        getReturnAssessments.setCallback(this, function(response){
        	var state = response.getState();
            
            if(state === "SUCCESS"){
            	component.set("v.", response.getReturnValue());
            }
            else if (state === "ERROR"){
                
            }
        });
        

		$A.enqueueAction(getReturnAssessment);
    },
})