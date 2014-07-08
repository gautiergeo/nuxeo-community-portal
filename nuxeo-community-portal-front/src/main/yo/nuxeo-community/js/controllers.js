    "use strict";

/* Controllers */

var app = angular.module("app", []);

var client = new nuxeo.Client({
  baseURL: 'http://demo.nuxeo.com/nuxeo',
  username: 'Administrator',
  password: 'Administrator'
});
     
client.connect(function(error, client) {
  if (error) {
    console.error('Cannot connect to Nuxeo server');
    throw new Error(error);
  }
});

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

app.controller("activityListController", function ($scope) {
  $scope.activities = [
    {"title": "Pif",
    "id":"0",
    "type": "Answers",
    "author" : "Bill",
    "date": "Utlisateur depuis le 13/06/13",
    "comments": [
     {"author": "George Alain",
      "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
      "text": "Nice post DD"
      },
     {"author": "Michel Berger",
      "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
      "text": "Well done"
       },
     {"author": "George Alain",
      "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
      "text": "Amazing"
     }]
    },
     {"title": "Pif",
     "id":"1",
     "type": "Answers",
     "author" : "Administrator",
     "date": "Utlisateur depuis le 13/06/13",
     "comments": [
     {"author": "George Alain",
      "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
      "text": "Nice post DD"
     }]},
     {"title": "Pif",
     "id":"2",
     "type": "Answers",
     "author" : "Ornella",
     "date": "Utlisateur depuis le 13/06/13",
     "comments": [
     {"author": "George Alain",
      "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
      "text": "Nice post DD"
     }]},
     {"title": "Pif",
     "type": "Answers",
     "author" : "George Alain",
     "date": "Utlisateur depuis le 13/06/13"
     },
     {"title": "Pif",
     "type": "Answers",
     "author" : "Charles H.",
     "date": "Utlisateur depuis le 13/06/13"
     },
     {"title": "Pif",
     "type": "Answers",
     "author" : "Charles H.",
     "date": "Utlisateur depuis le 13/06/13"
     }
  ];
});

app.controller('commentsController', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
    }; 
}]); 

app.controller('userProfilController', ['$rootScope', function($rootScope) { 
    $rootScope.showProfil = function(username) {
      $("#allUsers").modal('hide.modal');   
      $("#profil").modal('show');
      client.request("/user/"+username).get(function (error,user){
      $rootScope.user=user;
      });
    }; 
}]); 