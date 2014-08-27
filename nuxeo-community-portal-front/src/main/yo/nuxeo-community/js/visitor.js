    "use strict";

/* Controllers */

var app = angular.module("app", []);

var mainClient = new nuxeo.Client({
  baseURL: 'http://localhost:8080/nuxeo/',
  username: 'aescaffre',
  password: 'Administrator'
});
     
mainClient.connect(function(error, mainClient) {
  if (error) {
    console.error('Cannot connect to Nuxeo server');
    throw new Error(error);
  }
});

mainClient.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

app.controller("userListController", function ($scope) {
  $scope.users = [
    {"name": "Bill",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "Administrator",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "Ornella",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "hehee",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"}
  ];
}); 

app.controller('activityListController', function ($rootScope) {
  mainClient.operation('Document.Query')
  .params( {
  query : "SELECT * FROM ActivityCommunity WHERE dc:source='Answers' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
  .execute(function(error, data) {
    if (error) {
      // something went wrong
      throw error;
    }
  $rootScope.activities = data;
  $rootScope.$apply();
  })
}); 

app.controller('blogPostListController', function ($rootScope) {
  mainClient.operation('Document.Query')
  .params( {
  query : "SELECT * FROM ActivityCommunity WHERE dc:source='Blogs' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
  .execute(function(error, data) {
    if (error) {
      // something went wrong
      throw error;
    }
  $rootScope.blogPosts = data;
  $rootScope.$apply();
  })
}); 

app.controller('jiraActivityListController', function ($rootScope) {
  mainClient.operation('Document.Query')
  .params( {
  query : "SELECT * FROM ActivityCommunity WHERE dc:source='Jira' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
  .execute(function(error, data) {
    if (error) {
      // something went wrong
      throw error;
    }
  $rootScope.jiraActivities = data;
  $rootScope.$apply();
  })
}); 
 

app.controller('commentsController', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
    }; 
}]); 

app.controller('profilPictureController', ['$rootScope', function($rootScope) { 
    $rootScope.changePicture = function(picture) {
    mainClient.document($rootScope.MyProfile.path)
    .fetch(function(error, doc) {
    if (error) {
      // something went wrong
      throw error;
    }
    doc.set({'userprofile_schema:Picture':picture });
    doc.save(function(error, doc) {});
  });  
  $("#pictures").modal('hide.module');  
    // mainClient.request("/Document/"+ $rootScope.MyProfile.path).put({
    //     properties:'userprofile_schema:Picture=../nuxeo-community/img/administrator-icon.png'
    //   },function (error,user){  
    //   if(error){
    //     console.log("error")
    //   }
    //   else{
    //     console.log("picture changed") 
    //   }
    // });
  };
}]);

app.controller('profilInfosController', ['$rootScope', function($rootScope) { 
    $rootScope.submitInfos = function(picture) {
    var infos = document.getElementById("newInformations").value;  
    mainClient.document($rootScope.MyProfile.path)
    .fetch(function(error, doc) {
    if (error) {
      throw error;
    }
    doc.set({'userprofile_schema:Informations':infos });
    doc.save(function(error, doc) {});
  });  
  $("#changeInformations").modal('hide.module');  
  };
}]); 

app.controller('profilBioController', ['$rootScope', function($rootScope) { 
    $rootScope.submitBio = function(picture) {
    var bio = document.getElementById("newBiography").value;  
    mainClient.document($rootScope.MyProfile.path)
    .fetch(function(error, doc) {
    if (error) {
      throw error;
    }
    doc.set({'userprofile_schema:Biography':bio });
    doc.save(function(error, doc) {});
  });  
  $("#changeBiography").modal('hide.module');  
  };
}]); 

app.controller('IdSourceController', ['$rootScope', function($rootScope) { 
    $rootScope.getUsernames = function() {
      var blogsName = document.getElementById("BlogsId").value;
      var answersName = document.getElementById("AnswersId").value;
      if (answersName != '') {
        mainClient.operation('Document.Query')
        .params( {
            query : "SELECT * FROM NxSourceId WHERE nxsourceid:NxId ='"+answersName+"' AND nxsourceid:NxSource='Answers'"
          })
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          if (data.entries[0]!= undefined){
             console.log("that's not You")
          }
          if (data.entries[0]== undefined){
            mainClient.operation('Document.Create')
            .params({
              type: 'NxSourceId',
              name: '',
              properties: 'nxsourceid:NxSource='+'Answers' +'\nnxsourceid:NxId='+answersName + '\nnxsourceid:NxUsername='+ $rootScope.username + '\nnxsourceid:NxState= Undone'
            })
            .input('doc:/NuxeoCommunityPortal/sections/NuxeoSourceId/')
              .execute(function(error, data) {
              if (error) {
              // something went wrong
                throw error;
              }
              console.log('It worked')
            });
            mainClient.operation('Document.Query')
            .params( {
                query : "SELECT * FROM ActivityCommunity WHERE dc:publisher='"+answersName+"' AND ecm:currentLifeCycleState != 'deleted'"
              })
            .execute(function(error, data) {  
              console.log(data)
            });
            // mainClient.request("/user/"+username).put(function (error,data){
            // });
          }
        });
      };
      if (blogsName != '') {
        console.log(blogsName)
        mainClient.operation('Document.Query')
        .params( {
            query : "SELECT * FROM NxSourceId WHERE nxsourceid:NxId ='"+blogsName+"' AND nxsourceid:NxSource='Blogs'"
          })
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          if (data.entries[0]!= undefined){
             console.log("that's not You")
          }
          if (data.entries[0]== undefined){
            mainClient.operation('Document.Create')
            .params({
              type: 'NxSourceId',
              name: '',
              properties: 'nxsourceid:NxSource=Blogs' +'\nnxsourceid:NxId='+blogsName + '\nnxsourceid:NxUsername='+ $rootScope.username + '\nnxsourceid:NxState= Undone'
            })
            .input('doc:/NuxeoCommunityPortal/sections/NuxeoSourceId/')
              .execute(function(error, data) {
              if (error) {
              // something went wrong
                throw error;
              }
              console.log('It worked')
            });
          }
        });
      };
      $("#pickAccount").modal('hide.modal');
    }
  }]);

app.controller('ConnectController', ['$scope', function($scope) { 
    $scope.getInformations = function() {
      var firstName = document.getElementById("firstname").value;
      var lastName = document.getElementById("lastname").value;
      var password = document.getElementById("pswd").value;
      mainClient.request("../../user").post({ "entity-type" : "user",
  "id" : "psteele",
  "extendedGroups" : [  ],
  "isAdministrator" : false,
  "isAnonymous" : false,
  "properties" : { "company" : "Green Man",
      "email" : "psteele@greenman.com",
      "firstName" : "Peter",
      "username" : "psteele",
      "groups" : [  ],
      "lastName" : "Steele",
      "password" : "",
    }
},function (error,user){
        console.log(user)
        });
    }   
}]); 

app.controller('userProfilController', ['$rootScope', function($rootScope) { 
  $rootScope.showProfil = function(username) {
    if (username== undefined) {
      alert('You are not connected');
    }
    else{
      if (username==$rootScope.username) {
        mainClient.request("/user/"+username).get(function (error,user){
          $rootScope.user=user;
          $rootScope.$apply(); 
        });
        mainClient.operation('Document.Query').params( {
        query : "SELECT * FROM MyProfile WHERE dc:title ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          $rootScope.MyProfile = data.entries[0];
          $rootScope.$apply();
        });  
        mainClient.operation('Document.Query').params( {
        query : "SELECT * FROM ActivityCommunity WHERE dc:publisher ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
              // something went wrong
            throw error;
          }
              $rootScope.userActivities = data;
              $rootScope.$apply();
              $("#allUsers").modal('hide.modal');   
              $("#profilUser").modal('show');
        });
      };
      if (username!=$rootScope.username) {
        mainClient.request("/user/"+username).get(function (error,user){  
          if(error){
            alert("The user isn't registered")
            $rootScope.user=null;
            $rootScope.$apply(); 
          }
          else{
            $rootScope.user=user;
            $rootScope.$apply();  
          }
        });
        mainClient.operation('Document.Query').params( {
        query : "SELECT * FROM MyProfile WHERE dc:title ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          $rootScope.MyProfile = data.entries[0];
          $rootScope.$apply();
        });  
        mainClient.operation('Document.Query').params( {
        query : "SELECT * FROM ActivityCommunity WHERE dc:publisher ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
              // something went wrong
            throw error;
          }
          $rootScope.userActivities = data;
          $rootScope.$apply();
          if ($rootScope.user!=null) {
            $("#allUsers").modal('hide.modal');   
            $("#profil").modal('show');
          };
        });
      }; 
    };
  }; 
}]); 