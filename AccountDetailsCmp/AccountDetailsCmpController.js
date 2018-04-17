({
    doInit : function(component, event, helper) {
        helper.getAccountRecords(component, event);
    },
    
    sortFields: function(component, event, helper) {
        var selectedItem = event.currentTarget;
        var fieldNameToBeSorted = selectedItem.dataset.record;
        var fieldItagsWithAuraAttrMap = '{"Name":"sortByName","Phone":"sortByPhone","Type":"sortByType"}';
        var sortFieldCompNameMap = JSON.parse(fieldItagsWithAuraAttrMap);
        var sortFieldCompName = sortFieldCompNameMap[fieldNameToBeSorted];       
        var page = 1;
        helper.sortBy(component, event, page, fieldNameToBeSorted, sortFieldCompName);
    },
    
    pageChange: function(component, event, helper){
        if(event.getParam("isFirstPage") || event.getParam("isLastPage")){
            if(event.getParam("isFirstPage")){
                helper.getAccountRecords(component, event);
            }else if(event.getParam("isLastPage")){
                helper.getAccountRecords(component, event, component.get('v.pages'));
            }
        }else{
            if(event.getParam("pageSizeChanged")){
                component.set('v.pageSize', event.getParam("pageSize"));
                component.set('v.pageSizeChanged', event.getParam("pageSizeChanged"));
                helper.getAccountRecords(component, event);
            }else{
                var page = component.get("v.page") || 1;
                var direction = event.getParam("direction");
                page = direction === "previous" ? (page - 1) : (page + 1);
                helper.getAccountRecords(component, event, page, component.get('v.sortField'), component.get('v.sortOrder'));   
            }   
        }
    }
})