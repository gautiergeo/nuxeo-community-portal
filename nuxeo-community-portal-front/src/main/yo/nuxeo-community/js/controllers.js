    "use strict";

/* Controllers */

var app = angular.module("app", []);

var mainClient = new nuxeo.Client({
  baseURL: 'http://localhost:8080/nuxeo/',
  username: 'Administrator',
  password: 'Administrator'
});
     
mainClient.connect(function(error, mainClient) {
  if (error) {
    console.error('Cannot connect to Nuxeo server');
    throw new Error(error);
  }
});

mainClient.schemas(['dublincore','common', 'file','nxsourceid','userprofile_schema']);

app.controller("userListController", function ($scope) {
  $scope.users = [
    {"name": "Bill",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "Administrator",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "Ornella",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "hehee",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"}
  ];
}); 

app.controller('activityListController', function ($rootScope) {
  mainClient.operation('Document.Query')
  .params( {
  query : "SELECT * FROM ActivityCommunity WHERE ecm:currentLifeCycleState != 'deleted' ORDER BY dc:created DESC"})
  .execute(function(error, data) {
    if (error) {
      // something went wrong
      throw error;
    }
  $rootScope.activities = data;
  $rootScope.$apply();
  })
}); 

app.controller('userConnectedController', ['$rootScope', function($rootScope) { 
    $rootScope.getUsername = function() {
    // $rootScope.username=document.getElementById("username").value;
    $rootScope.username="Adam";
    $("#login").modal('hide.module');
    console.log($rootScope.username)
    }; 
}]);  

app.controller('commentsController', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
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
              properties: 'nxsourceid:NxSource='+'Answers' +'\nnxsourceid:NxId='+answersName + '\nnxsourceid:NxUsername='+ $rootScope.username
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
              properties: 'nxsourceid:NxSource=Blogs' +'\nnxsourceid:NxId='+blogsName + '\nnxsourceid:NxUsername='+ $rootScope.username
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
      }}]);


app.controller('ConnectController', ['$scope', function($scope) { 
    $scope.getInformations = function() {
      var firstName = document.getElementById("firstname").value;
      var lastName = document.getElementById("lastname").value;
      var password = document.getElementById("pswd").value;
      mainClient.request("../../user").post({
  "entity-type": "user",
  "id": "Bill",
  "properties": {
    "lastName": "Murray",
    "username": "Bill",
    "email": "bill@exemple.com",
    "company": "",
    "firstName": "Bill",
    "password": "",
    "groups": [
      "members",
      "ecm-experts",
      "hr_operational_managers"
    ]
  },
  "isAdministrator": false,
  "isAnonymous": false
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