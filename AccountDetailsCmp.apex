public class AccountDetailsCmp {
    
    @AuraEnabled
    public static AccountListRecords fetchAccountDetails(Id accountId, Decimal pageNumber, String columnName, String sortType){
        System.debug('Input Parameters - accountId-'+accountId+' , pageNumber- '+pageNumber+' ,ColumnName-'+columnName+', SortOrder-'+sortType);
        
        List<Account> accList = new List<Account>();
        AccountListRecords AccountListRecordsObj = new AccountListRecords();
        try{
            
            Integer pageSize = 5;
            Integer offset = ((Integer)pageNumber - 1) * pageSize; 
            
            if(accountId != null){
                if(schema.sobjecttype.Account.isaccessible() && schema.sobjecttype.Account.isQueryable()){
                    String queryStatement = 'select Id, Name, phone, type from account where type != null ORDER BY '+columnName+' '+sortType;
                    //accList = [select Id, Name, phone, type from account where type != null ORDER BY ];
                    
                    AccountListRecordsObj.accRecords = Database.query(queryStatement);
                    AccountListRecordsObj.total = [select count() from account where type != null];
                    AccountListRecordsObj.page = (Integer)pageNumber;
                    AccountListRecordsObj.pageSize = pageSize;
                    
                    return AccountListRecordsObj;
                    
                }else{
                    throw new NoAccessException();
                }
            }else{
                throw new NullPointerException();
            }
            
        }catch(NullPointerException ex) {
            System.debug('Null Pointer <fetchAccountDetails> '+ex.getMessage());
            throw new AuraHandledException(ex.getTypeName() +' Occured---> '+ex.getMessage());
        }catch(NoAccessException ex) {
            System.debug('No Access <fetchAccountDetails> '+ex.getMessage());
            System.debug('Error(NoAccessException) '+ex.getStackTraceString());
            throw new AuraHandledException(ex.getTypeName() +' Occured---> '+ex.getMessage());
        }catch(QueryException ex){
            System.debug('Error(QueryException) <fetchAccountDetails> '+ex.getMessage());
            System.debug('Error(QueryException) <fetchAccountDetails> '+ex.getStackTraceString());
            throw new AuraHandledException(ex.getTypeName() +' Occured---> '+ex.getMessage());
        }catch(Exception ex) {
            System.debug('Exception <fetchAccountDetails> ' + ex.getMessage());
            throw new AuraHandledException(ex.getTypeName() +' Occured---> '+ex.getMessage());
        }        
    }
    
    public class AccountListRecords {
       
        @AuraEnabled
        public List<Account> accRecords{ get;set; }
        
        @AuraEnabled
        public Integer pageSize { get;set; }
        
        @AuraEnabled
        public Integer page { get;set; }
        
        @AuraEnabled
        public Integer total { get;set; }
    }
    
}
