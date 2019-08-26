({
    doInit : function(component, event, helper) {
        helper.initHelper(component, event, helper);
    },

    editCategory : function(component, event, helper) {
        helper.editCategoryHelper(component, event, helper);
    }, 

    deleteCategory : function(component, event, helper) {
        helper.deleteCategoryHelper(component, event, helper);
    },
    
    createCategory : function(component, event, helper) {
        helper.createCategoryHelper(component, event, helper);
    },
    
    viewModal : function(component, event, helper) {
        helper.viewModalHelper(component, event, helper);
    },
    
    closeModal : function(component, event, helper) {
        helper.closeModalHelper(component, event, helper);
    }
})