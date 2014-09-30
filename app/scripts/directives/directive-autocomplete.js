'use strict';

angular.module( 'my.directive.autocomplete', [] )
  .directive( 'myComponentsAutocomplete', [function() {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        config: '='
      },
      templateUrl: 'scripts/templates/directive-autocomplete.html',
      link: function(scope){

        scope.navByKey = -1;

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
                'display': input.replace(new RegExp(search, 'gi'), '<span class="matched-text">$&</span>') 
              } );
            }
          });
          scope.results = newResults;
        };

        scope.searchBlur = function(){
          setTimeout(function(){
            scope.showResultsContainer = false;
            scope.$apply();
          }, 200);
        };

        scope.selectResult = function(result){
          scope.searchInput = result.value;
          scope.showResultsContainer = false;
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