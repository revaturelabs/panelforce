({
    initHelper : function(component, event, helper) {
        let getCat = component.get('c.getCategories');
        getCat.setCallback(this, function(response) {
            let state = response.getState();
            if(component.isValid() && state == 'SUCCESS') {
                component.set('v.categories', response.getReturnValue());
                helper.totalScoreHelper(component);
            }
        });
        $A.enqueueAction(getCat);
    },

    totalScoreHelper : function(component) {
        let scoreList = component.get('v.categories');
        let totalScore = 0;
        for (let i = 0; i < scoreList.length; i++) { 
            totalScore += scoreList[i].maxScore__c;
        }
        component.set('v.totalScore', totalScore);
    },

    editCategoryHelper : function(component, event, helper) {
        let btnTitle = event.getSource().get('v.title');
        let category = component.get('v.categories');
        component.set('v.newCategory','');
        component.set('v.newCategory', category[btnTitle]);
        helper.totalScoreHelper(component);
        component.set('v.viewModal', true);
    },

    deleteCategoryHelper : function(component, event, helper) {
        let deleteCat = component.get('c.removeCategory');
        let allCats = component.get('v.categories');
        let index = event.getSource().get('v.title');
        let catToRemove = allCats[index];
        deleteCat.setParams({'panel': catToRemove});
        deleteCat.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                helper.initHelper(component, event, helper);
            } else if(res.getState() == 'ERROR') {
                console.log(res.getError()[0]);
            }
        });
        $A.enqueueAction(deleteCat);
    },

    createCategoryHelper : function(component, event, helper) {
        let newCat = component.get('v.newCategory');
        let saveCat = component.get('c.saveCategories');
        saveCat.setParams({'panel': newCat});
        saveCat.setCallback(this, function(res){
            if(res.getState() == 'SUCCESS'){
                let allCats = component.get('v.categories');
                let apexReturn = res.getReturnValue();
                if (apexReturn) {
                    allCats.push(apexReturn);
                }
                component.set('v.categories', allCats);
                helper.totalScoreHelper(component);
                helper.initHelper(component, event, helper);
            } else if(res.getState() == 'ERROR') {
                console.log(res.getError()[0]);
            }
        });
        $A.enqueueAction(saveCat);
        component.set('v.newCategory', { 'sobjectType':'PanelCategory__c','Name': '','maxScore__c': '' });
        component.set('v.viewModal',false);
    },

    viewModalHelper : function(component, event, helper) {
        component.set('v.viewModal',true);
    },

    closeModalHelper : function(component, event, helper) {
        component.set('v.viewModal',false);
        component.set('v.newCategory','');
    }
})