"use strict";

var connected = angular.module("connected", []);

connected.controller('beforeConnectController', ['$scope', function($scope) { 
    $scope.connection = function() {
    $("#signIn").modal('show');
    }; 
}]); 

connected.controller('disconnectController', ['$scope', function($scope) { 
    $scope.disconnect = function() {
      console.log('How to disconnect from Nuxeo?')
    }; 
}]); 
// connected.controller('toConnectController', ['$rootScope', function($rootScope) { 
//     $rootScope.enterPrivate = function() {
//         $rootScope.username=document.getElementById("username").value;
//         $rootScope.password=document.getElementById("password").value;

//         var client = new nuxeo.Client({
//           baseURL: 'http://localhost:8080/nuxeo/',
//           username: $rootScope.username,
//           password: $rootScope.password
//         });
     
//         client.connect(function(error, client) {
//           if (error) {
//             console.error('Cannot connect to Nuxeo server');
//             throw new Error(error);
//           }
//           else{
//             console.log("You are now connected")
//           }
//         });
//         $("#signIn").modal('hide');
//         console.log($rootScope.username)
//     }; 
// }]); 

connected.controller("connectionController", ['$rootScope', function($rootScope) { 
    $rootScope.enterPrivate = function() {

      $rootScope.username=document.getElementById("username").value;
      $rootScope.password=document.getElementById("password").value;

    var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: $rootScope.username,
          password: $rootScope.password
        });

    client.connect(function(error, client) {
          if (error) {
            console.error('Cannot connect to Nuxeo server');
            throw new Error(error);
          }
          else{
            console.log("You are now connected")
          }
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity','stats']);

    console.log($rootScope.username)
    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Answers' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        throw error;
      }
      else {
        $rootScope.activities = data;
        $rootScope.$apply();
      } 
    });

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Blogs' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        // something went wrong
        throw error;
      }
    $rootScope.blogPosts = data;
    $rootScope.$apply();
    });

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Jira' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        // something went wrong
        throw error;
      }
    $rootScope.jiraActivities = data;
    $rootScope.$apply();
    });
  
$("#signIn").modal('hide');

    }; 
}]); 

connected.controller("connectedController", ['$rootScope', function($rootScope) { 
    $rootScope.alreadyConnected = function() {

    var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity','stats']);

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM Stats WHERE dc:title='Session' AND ecm:currentLifeCycleState != 'deleted'"})
    .execute(function(error, data) {
      if (error) {
        throw error;
      }
      else {
        $rootScope.username = data.entries[0].properties['stats:username'];
        $rootScope.$apply();
      } 
    });

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Answers' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        throw error;
      }
      else {
        $rootScope.activities = data;
        $rootScope.$apply();
      } 
    });

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Blogs' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        // something went wrong
        throw error;
      }
    $rootScope.blogPosts = data;
    $rootScope.$apply();
    });

    client.operation('Document.Query')
    .params( {
    query : "SELECT * FROM ActivityCommunity WHERE dc:source='Jira' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
    .execute(function(error, data) {
      if (error) {
        // something went wrong
        throw error;
      }
    $rootScope.jiraActivities = data;
    $rootScope.$apply();
    });
  
$("#signIn").modal('hide');

    }; 
}]); 

connected.controller("userListController", function ($scope) {
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

// connected.controller('activityListController', function ($rootScope) {
//   client.operation('Document.Query')
//   .params( {
//   query : "SELECT * FROM ActivityCommunity WHERE dc:source='Answers' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
//   .execute(function(error, data) {
//     if (error) {
//       // something went wrong
//       throw error;
//     }
//   $rootScope.activities = data;
//   $rootScope.$apply();
//   })
// }); 

// connected.controller('blogPostListController', function ($rootScope) {
//   client.operation('Document.Query')
//   .params( {
//   query : "SELECT * FROM ActivityCommunity WHERE dc:source='Blogs' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
//   .execute(function(error, data) {
//     if (error) {
//       // something went wrong
//       throw error;
//     }
//   $rootScope.blogPosts = data;
//   $rootScope.$apply();
//   })
// }); 

// connected.controller('jiraActivityListController', function ($rootScope) {
//   client.operation('Document.Query')
//   .params( {
//   query : "SELECT * FROM ActivityCommunity WHERE dc:source='Jira' AND ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
//   .execute(function(error, data) {
//     if (error) {
//       // something went wrong
//       throw error;
//     }
//   $rootScope.jiraActivities = data;
//   $rootScope.$apply();
//   })
// }); 

connected.controller('ConnectController', ['$scope', function($scope) { 
    $scope.getInformations = function() {
      var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

      var firstName = document.getElementById("firstname").value;
      var lastName = document.getElementById("lastname").value;
      var password = document.getElementById("pswd").value;
      client.request("../../user").post({ "entity-type" : "user",
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

connected.controller('profilInfosController', ['$rootScope', function($rootScope) { 
    $rootScope.submitInfos = function() {
      var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

    var infos = document.getElementById("newInformations").value;  
    client.document($rootScope.MyProfile.path)
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

connected.controller('profilBioController', ['$rootScope', function($rootScope) { 
    $rootScope.submitBio = function() {
      var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

    var bio = document.getElementById("newBiography").value;  
    client.document($rootScope.MyProfile.path)
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


connected.controller('IdSourceController', ['$rootScope', function($rootScope) { 
    $rootScope.getUsernames = function() {
      var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

      var blogsName = document.getElementById("BlogsId").value;
      var answersName = document.getElementById("AnswersId").value;
      if (answersName != '') {
        client.operation('Document.Query')
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
            client.operation('Document.Create')
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
            client.operation('Document.Query')
            .params( {
                query : "SELECT * FROM ActivityCommunity WHERE dc:publisher='"+answersName+"' AND ecm:currentLifeCycleState != 'deleted'"
              })
            .execute(function(error, data) {  
              console.log(data)
            });
            // client.request("/user/"+username).put(function (error,data){
            // });
          }
        });
      };
      if (blogsName != '') {
        console.log(blogsName)
        client.operation('Document.Query')
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
            client.operation('Document.Create')
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

connected.controller('profilPictureController', ['$rootScope', function($rootScope) { 
    $rootScope.changePicture = function(picture) {
      var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx'
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

    client.document($rootScope.MyProfile.path)
    .fetch(function(error, doc) {
    if (error) {
      // something went wrong
      throw error;
    }
    doc.set({'userprofile_schema:Picture':picture });
    doc.save(function(error, doc) {});
  });  
  $("#pictures").modal('hide.module');  
    // client.request("/Document/"+ $rootScope.MyProfile.path).put({
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


connected.controller('commentsController', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
    }; 
}]); 

connected.controller('userProfilController', ['$rootScope', function($rootScope) { 
  $rootScope.showProfil = function(username) {
    
var client = new nuxeo.Client({
          baseURL: 'http://localhost:8080/nuxeo/',
          username: 'xxx',
          password: 'xxx',
        });
     
    client.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema','activitycommunity']);

    console.log($rootScope.username)

     if (username== undefined) {
      alert('You are not connected');
    }
    else{
      if (username==$rootScope.username) {
        client.request("/user/"+username).get(function (error,user){
          $rootScope.user=user;
          $rootScope.$apply(); 
        });
        client.operation('Document.Query').params( {
        query : "SELECT * FROM MyProfile WHERE dc:title ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          $rootScope.MyProfile = data.entries[0];
          $rootScope.$apply();
        });  
        client.operation('Document.Query').params( {
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
        client.request("/user/"+username).get(function (error,user){  
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
        client.operation('Document.Query').params( {
        query : "SELECT * FROM MyProfile WHERE dc:title ='"+username+"'"})
        .execute(function(error, data) {
          if (error) {
            throw error;
          }
          $rootScope.MyProfile = data.entries[0];
          $rootScope.$apply();
        });  
        client.operation('Document.Query').params( {
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
