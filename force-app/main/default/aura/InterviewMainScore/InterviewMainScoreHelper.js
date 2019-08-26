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

        component.set("v.category.Score__c",curr_score);

        let categories = component.get("v.categories");
        let index = component.get("v.currentIndex");
        categories[index].Score__c = curr_score;
        component.set("v.categories", categories);
        
        var updateCat = component.get("c.updateCategories");
        updateCat.setParams({"item" : categories[index]});
        updateCat.setCallback(this, function(response) {});
        $A.enqueueAction(updateCat);

        
    }
    
})