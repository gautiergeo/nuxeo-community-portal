    "use strict";

.controller("AskCtrl", ['$scope', 'nxSession', '$location', 'nxSearch'
 ($scope, nxSession, $location, nxSearch) ->
  $scope.doc = { type:"question", properties: {}}
  communitiesSearch = new nxSearch()
  .setQuery("SELECT * FROM SocialWorkspace WHERE ecm:currentLifeCycleState <> 'deleted'")
  .setPageSize(200)
  $scope.communities = communitiesSearch.items
  communitiesSearch.nextPage()
 
  $scope.save = () ->
    nxSession.createDocument("/collaboration/questions", $scope.doc).then (question) ->
      $location.path("/question/" + question.uid + '/view')
 
])

Session.createDocument = (parentPath, doc)->
  doc['entity-type'] = "document"
  $http.post(apiRootPath + "/path" + parentPath , doc).then (response)->
    new nxDocument(response.data.uid, response.data)