'use strict';

angular.module( 'my.directive.multivalue.autocomplete', [] )
  .directive( 'myComponentsMultivalueAutocomplete', ['$filter', function($filter) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        config: '='
      },
      templateUrl: 'scripts/templates/directive-multivalue-autocomplete.html',
      link: function(scope){

        scope.navByKey = -1;
        scope.selectedResults = [];

        scope.searchChange = function(search){
          
          // if search is undefined, return
          if(search === undefined){
            return;
          }

          // show the results container only if there is search text
          if(search.length > 0){
            scope.showResultsContainer = true;
          }else{
            scope.showResultsContainer = false;
          }

          // special handling of \ to prevent regexp from throwing error
          search = search.replace(/\\/g, '/\/');

          // filter data based on search
          var newResults = [];
          angular.forEach(scope.data, function(input){
            if(input.search(new RegExp(search, 'gi')) >= 0){
              newResults.push( {
                'value': input, 
                'display': input.replace(new RegExp(search, 'gi'), '<span class="matched-text">$&</span>'),
                'selected': false
              } );
            }
          });
          scope.results = newResults;
        };

        scope.searchBlur = function(){
          
        };

        scope.selectResult = function(result){
          scope.selectedResults.push(result.value);
          result.selected = true;
          //$scope.result.selected = true;
        };
        scope.removeResult = function(result){
          scope.selectedResults.splice(scope.selectedResults.indexOf(result), 1);
          var findResult;
          angular.forEach(scope.results, function(input){
            if(input.value === result){
              findResult = input;
            }
          });
          if(!angular.isUndefined(findResult)){
            findResult.selected = false;
          }
        };
        scope.searchKeyDown = function(e){
          if(e.keyCode === 40){
            scope.navByKey = (scope.navByKey < scope.results.length - 1 ? scope.navByKey + 1 : scope.navByKey);
          }else if(e.keyCode === 38){
            scope.navByKey = scope.navByKey > 0 ? scope.navByKey - 1 : scope.navByKey;
          }else if(e.keyCode === 13){
            scope.searchInput = scope.results[scope.navByKey].value;
            scope.showResultsContainer = false;
          }
        };
      }
    };
  }]);