({
    getAccountRecords : function(component, event, page, columnName, sortType) {
        page = page || 1;
        columnName = columnName || 'Name';
        sortType = sortType || 'ASC';
        
        var action = component.get('c.fetchAccountDetails');
        action.setParams({"accountId" : component.get('v.recordId'),
                          "pageNumber": page,
                          "columnName" : columnName,
                          "sortType" : sortType});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var accountListObj = response.getReturnValue();
                if(accountListObj != null){
                    component.set('v.accountRecordList', accountListObj.accRecords);
                    component.set('v.page', accountListObj.page);
                    component.set('v.total', accountListObj.total);
                    component.set('v.pages', Math.ceil(accountListObj.total/accountListObj.pageSize));
                }
            }else if(state === 'ERROR'){
                alert('Error fetching Records!!');
            }
        });
        
        $A.enqueueAction(action);
    },
    
    sortBy : function(component, event, page, fieldName, sortFieldComp) {
        page = page || 1;
        fieldName = fieldName || 'Name';
        sortFieldComp = sortFieldComp || 'ASC';
        
        var action = component.get('c.fetchAccountDetails');
        if(component.get("v."+sortFieldComp) ===  true) {
            action.setParams({
                "accountId" : component.get('v.recordId'),
                "pageNumber": page,
                "columnName" : fieldName,
                "sortType" : 'DESC',
            });
            component.set("v.sortOrder", 'DESC');
            component.set("v.sortField", fieldName);
            component.set("v."+sortFieldComp, false);
        } else {
            action.setParams({
                "accountId" : component.get('v.recordId'),
                "pageNumber": page,
                "columnName" : fieldName,
                "sortType" : 'ASC'
            });
            component.set("v.sortOrder", 'ASC');
            component.set("v.sortField", fieldName);
            component.set("v."+sortFieldComp, true);
        }
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var accountListObj = response.getReturnValue();
                if(accountListObj != null){
                    component.set('v.accountRecordList', accountListObj.accRecords);
                    component.set('v.page', accountListObj.page);
                    component.set('v.total', accountListObj.total);
                    component.set('v.pages', Math.ceil(accountListObj.total/accountListObj.pageSize));
                }
            }else if(state === 'ERROR'){
                alert('Error fetching Records!!');
            }
        });
        
        $A.enqueueAction(action);
    }
})
