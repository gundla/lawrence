'use strict';

angular.module( 'my.directive.multivalue.autocomplete', [] )
  .directive( 'myComponentsMultivalueAutocomplete', ['$filter', '_', function($filter, _) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        config: '='
      },
      templateUrl: 'scripts/templates/directive-multivalue-autocomplete.html',
      controller: ['$scope', '$http', function($scope, $http) {
        $http.get('/data/showcase.json')
          .success(function(data){
            console.log('data', data);

            // store the json data
            $scope.allData = data;
            
            // create parent data
            var parentData = _.map(data, function(d){
              return {id: d.id, name: d.name};
            });
            $scope.parentData = parentData;
            console.log('parentData', parentData);

          }).error(function(){
            console.log('error loading data');
          });

        $scope.getMatchedItems = function(match){
          var matchedItems = [],
              allData = $scope.allData,
              matchRegex = new RegExp(match, 'gi');

          _.each(allData, function(data){
            if(data.name.search(matchRegex) >= 0){
              var mData = _.clone(data);
              mData.matchedText = data.name.replace(matchRegex, '<span class="matched-text">$&</span>');
              matchedItems.push(mData);
            }
          });
          return matchedItems;
        };

      }],
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

          // get matched items
          scope.results = scope.getMatchedItems(search);
        };

        scope.searchBlur = function(){
          
        };

        scope.selectResult = function($event, result){
          var el = angular.element($event.target);
          if(el.hasClass('item-style')){
            $event.preventDefault();
            //$event.stopPropogation();
          }else if(result.selected === true){
            scope.removeResult(result);
          }else{
            _.each(result.children, function(child){
              child.selected = true;
            });
            scope.selectedResults.push(result);
            result.selected = true;
          }
        };
        scope.selectChild = function($event, child, parent){
          if(child.selected === true){
            scope.removeChild(child, parent);
            return;
          }
          child.selected = true;
          parent.selected = true;
          // push parent to selected items only if not present
          var isParentSelected = _.find(scope.selectedResults, function(r){
            return r.id === parent.id;
          });
          if(!isParentSelected){
            scope.selectedResults.push(parent);
          }
        };
        scope.isChildSelected = function(child){
          return child.selected === true;
        };
        scope.removeResult = function(result){
          scope.selectedResults.splice(scope.selectedResults.indexOf(result), 1);
          result.selected = false;
          _.each(result.children, function(child){
            child.selected = false;
          });
        };
        scope.removeChild = function(child, parent){
          child.selected = false;
          // if there are no children, remove parent from selected items
          var children = _.filter(parent.children, function(c){
            return c.selected === true;
          });
          if(children.length <= 0){
            scope.removeResult(parent);
          }
        };
        scope.toggleResult = function(result){
          result.expanded = !result.expanded;
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