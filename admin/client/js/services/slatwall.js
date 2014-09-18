//services return promises which can be handled uniquely based on success or failure by the controller
angular.module('slatwalladmin')
.provider('$slatwall',
function(){
	var _baseUrl;
	return {
	    $get:['$q','$http','$log', function ($q,$http,$log)
	    {
	      return {
	    		//basic entity getter where id is optional, returns a promise
		  		getEntity:function(entityName,id,currentPage,pageShow){
		  			if(angular.isUndefined(currentPage)){
		  				currentPage = 1;
		  			}
		  			if(angular.isUndefined(pageShow)){
		  				pageShow = 10;
		  			}
		  			
		  			var deferred = $q.defer();
		  			var urlString = _baseUrl+'index.cfm/?slatAction=api:main.get&entityName='+entityName+'&P:Current='+currentPage+'&P:Show='+pageShow;
		  			if(angular.isDefined(id)) {
		  				urlString += '&entityId='+id;	
		  			}
		  				
		  			$http.get(urlString)
		  			.success(function(data){
		  				deferred.resolve(data);
		  			}).error(function(reason){
		  				deferred.reject(reason);
		  			});
		  			return deferred.promise;
		  			
		  		},
		  		saveEntity:function(entityName,id,params){
		  			$log.debug('save'+ entityName);
		  			var deferred = $q.defer();
		  			var urlString = _baseUrl+'index.cfm/?slatAction=api:main.post&entityName='+entityName+'&entityId='+id;	
		  				
		  			$http({
		  				method:'POST',
		  				url:urlString,
		  				params: params,
		  				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		  			})
		  			.success(function(data){
		  				deferred.resolve(data);
		  				
		  			}).error(function(reason){
		  				deferred.reject(reason);
		  			});
		  			return deferred.promise;
		  		},
		  		getExistingCollectionsByBaseEntity:function(entityName){
		  			var deferred = $q.defer();
		  			var urlString = _baseUrl+'index.cfm/?slatAction=api:main.getExistingCollectionsByBaseEntity&entityName=Slatwall'+entityName;
		  			
		  			$http.get(urlString)
		  			.success(function(data){
		  				deferred.resolve(data);
		  			}).error(function(reason){
		  				deferred.reject(reason);
		  			});
		  			return deferred.promise;
		  			
		  		},
		  		getFilterPropertiesByBaseEntityName:function(entityName){
		  			var deferred = $q.defer();
		  			var urlString = _baseUrl+'index.cfm/?slatAction=api:main.getFilterPropertiesByBaseEntityName&EntityName='+entityName;
		  			
		  			$http.get(urlString)
		  			.success(function(data){
		  				deferred.resolve(data);
		  			}).error(function(reason){
		  				deferred.reject(reason);
		  			});
		  			return deferred.promise;
		  		}
		  	};
	    }],
	    setBaseUrl: function(baseUrl){
	    	_baseUrl=baseUrl;
	    }
	};
}).config(function ($slatwallProvider) {
	$slatwallProvider.setBaseUrl('/');
});

