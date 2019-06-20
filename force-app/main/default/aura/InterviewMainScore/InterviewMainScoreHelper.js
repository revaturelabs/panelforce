({
    helperMethod : function(component,value) {
        //logic here

        //assigns the current score to the component
        var curr_score = component.get("v.Current_Score");

        var maxScore = component.get("v.Max_Score");

        //adds the value to the current score
        curr_score += value;

        if(curr_score > maxScore)
        {
            curr_score = maxScore;
            alert("Current Score cannot be greater than the Max Score.");
        }

        else if(curr_score<0)
        {
            curr_score = 0;
            alert("Current Score cannot be Negative.");
        }

        //retrieves the value from the component
        var action = component.set("v.Current_Score",curr_score);

        var action = component.set("v.category.Score__c",curr_score);
        
        
    }
    
})