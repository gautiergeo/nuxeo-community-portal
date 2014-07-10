    "use strict";

/* Controllers */

var app = angular.module("app", []);

var client = new nuxeo.Client({
  baseURL: 'http://localhost:8080/nuxeo/',
  username: 'Administrator',
  password: 'Administrator'
});
     
client.connect(function(error, client) {
  if (error) {
    console.error('Cannot connect to Nuxeo server');
    throw new Error(error);
  }
});

client.schemas(['dublincore','common', 'file']);

// client.request("path//default-domain/workspaces/Activities").get(function (error, data, response){ 
//     doc=data;
//     console.log(doc);
//   });

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

// app.controller('activityListController', function ($rootScope) {
//   client.operation('Document.Query')
//   .input('SELECT (*) FROM ActivityCommunity')
//   .execute(function(error, data) {
//     if (error) {
//       // something went wrong
//       throw error;
//     }
//   console.log(data)
//   })
// }); 

app.controller('activityListController', function ($rootScope) {
  client.operation('Document.GetChildren')
  .input('/default-domain/workspaces/Activities')
  .execute(function(error, children) {
    if (error) {
      // something went wrong
      throw error;
    }
    $rootScope.activities = children;
    $rootScope.$apply();
  })
}); 

app.controller('commentsController', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
    }; 
}]); 

app.controller('userProfilController', ['$rootScope', function($rootScope) { 
    $rootScope.showProfil = function(username) {
      client.request("/user/"+username).get(function (error,user){
      $rootScope.user=user;
      $rootScope.$apply();
      console.log(user)
      $("#allUsers").modal('hide.modal');   
      $("#profil").modal('show');
      });
    }; 
}]); 