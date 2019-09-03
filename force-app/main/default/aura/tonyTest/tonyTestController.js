({
    
    doInit : function(component, event, helper) {
        
        // debug: confirm inside init method
        console.log("inside init");
        
        // done: initialize page's field value
        var initCurrentPageContactRecordID = component.get("v.recordId");
        if (initCurrentPageContactRecordID ===null) {
            initCurrentPageContactRecordID = "0033i000005UxqZAAS";
        }
        
    },
    
    
    
    handleChangeEventForForm : function(component, event, helper) {
        
        // todo: save record on blur
        console.log("inside handleChangeEventForForm");

        component.find("contactInputForm").saveRecord( function(saveResult) {
            component.set("v.saveMessage", "Record saved on blur.");
            
        });
        
    },
    
    

    
    
})