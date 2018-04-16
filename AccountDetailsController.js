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
    }
})
