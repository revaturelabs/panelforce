({
	myAction : function(component, event, helper) {
        console.log('c.myaction');
		var contact  = event.getParam("contactId");
	
        console.log('contact id : ' + contact);
	}
})