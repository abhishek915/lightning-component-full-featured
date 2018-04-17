({
    previousPage : function(component, event, helper) {
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({ "direction": "previous"});
        myEvent.fire();
    },
    
    nextPage : function(component, event, helper) {
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({ "direction": "next"});
        myEvent.fire();
    },
    
    firstPage : function(component, event, helper) {
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({ "isFirstPage": "true"});
        myEvent.fire();
    },
    
    lastPage : function(component, event, helper) {
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({ "isLastPage": "true"});
        myEvent.fire();
    },
    
    onSelectChange : function(component, event){
        var myEvent = component.getEvent("pageChange");
        myEvent.setParams({ "pageSize": component.find('levels').get('v.value'),
                           "pageSizeChanged" : true});
        myEvent.fire();
    }
})