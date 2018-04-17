({
    getAccountRecords : function(component, event, page, columnName, sortType) {
        var spinnerIcon = component.find('spinner1');
        $A.util.removeClass(spinnerIcon, 'slds-hide');
        $A.util.addClass(spinnerIcon, 'slds-show');
        
        page = page || 1;
        columnName = columnName || 'Name';
        sortType = sortType || 'ASC';
        
        var action = component.get('c.fetchAccountDetails');
        
        if(component.get('v.pageSizeChanged')){
            console.log('Default');
            action.setParams({"accountId" : component.get('v.recordId'),
                              "pageNumber": page,
                              "columnName" : columnName,
                              "sortType" : sortType,
                              "pageSize" : component.get('v.pageSize')});   
        }else{
            action.setParams({"accountId" : component.get('v.recordId'),
                              "pageNumber": page,
                              "columnName" : columnName,
                              "sortType" : sortType});   
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
                $A.util.removeClass(spinnerIcon, 'slds-show');
                $A.util.addClass(spinnerIcon, 'slds-hide');
            }else if(state === 'ERROR'){
                alert('Error fetching Records!!');
                $A.util.removeClass(spinnerIcon, 'slds-show');
                $A.util.addClass(spinnerIcon, 'slds-hide');
            }
        });
        
        $A.enqueueAction(action);
    },
    
    sortBy : function(component, event, page, fieldName, sortFieldComp) {
        var spinnerIcon = component.find('spinner1');
        $A.util.removeClass(spinnerIcon, 'slds-hide');
        $A.util.addClass(spinnerIcon, 'slds-show');
        
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
                "pageSize" : component.get('v.pageSize')
            });
            component.set("v.sortOrder", 'DESC');
            component.set("v.sortField", fieldName);
            component.set("v."+sortFieldComp, false);
        } else {
            action.setParams({
                "accountId" : component.get('v.recordId'),
                "pageNumber": page,
                "columnName" : fieldName,
                "sortType" : 'ASC',
                "pageSize" : component.get('v.pageSize')
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
                $A.util.removeClass(spinnerIcon, 'slds-show');
                $A.util.addClass(spinnerIcon, 'slds-hide');
            }else if(state === 'ERROR'){
                alert('Error fetching Records!!');
                $A.util.removeClass(spinnerIcon, 'slds-show');
                $A.util.addClass(spinnerIcon, 'slds-hide');
            }
        });
        
        $A.enqueueAction(action);
    }
})