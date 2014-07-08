    "use strict";

/* Controllers */

var app = angular.module("app", []);

//Creer un tableau de users pour afficher celui qu'on veut :)
var Utilisateur;
function logUser(error,data,response) {
  Utilisateur[0] = data;
  //alert(Bill.properties.email);
}

    // var nuxeo = require('nuxeo');

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
    // do stuff
});
    //alert("Pro");
Utilisateur = client.user("Bill");

Utilisateur.fetch(logUser);

var activitiesss = [
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

var usersss = [
    {"name": "Charles H.",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "Motorola Wi-Fi",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille Champion du commentaire il y a 3 jours"},
    {"name": "MOTOXOOM™",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "hehee",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
     {"name": "George Alain",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
    {"name": "Motorola Wi-Fi",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
    {"name": "MOTOXOOM™",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "hehee",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
     {"name": "George Alain",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
    {"name": "Motorola Wi-Fi",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "Tout va bien",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"},
    {"name": "MOTOXOOM™",
     "pic": "http://www.bobmarleymusic.us/Pictures/images/albums/big/Bob_Marley/2008_-_Bob_Marley_Vs_Lee_Scratch_Perry-The_Best_Of_The_Upsetter_Years.jpg",
     "dateInscription": "Utlisateur depuis le 13/06/13",
     "statut" : "hehee",
     "description" : "Né le 68 Février 2798 . Il travaille chez Solucom depuis 7 ans.Travaille actuellement en tant que Directeur commercial. A étudier à Central Paris. Aime le football, la natation, les films dhorreur et le ketchup" ,
     "info" : "Alain a gagné la médaille POPO il y a 3 jours"}
  ];
app.controller("UserListCtrl", function ($scope) {
  $scope.users = [
    usersss[0],usersss[1],usersss[2]
  ];
});

app.controller("ActivityListCtrl", function ($scope) {
     $scope.activities = [
     activitiesss[0],activitiesss[1],activitiesss[2],activitiesss[3],activitiesss[4],activitiesss[5]
  ];
});

app.controller('showComments', ['$scope', function($scope) { 
    $scope.showComments = function(id) {
    $("#comments").modal('show');
    //alert(activitiesss[id].author);

      //$rootScope.user=usersss[i];
      //alert(i);
      //$scope.user = usersss[i];
    }; 
}]); 

/*var client = new nuxeo.Client({
  baseURL: "http://demo.nuxeo.com",
  username: "Administrator",
  password: "Administrator"
})

client.connect(function(error, client) {
  if (error) {
    // cannot connect
    throw error;
  }

  // OK, the returned client is connected
  console.log("Client is connected: " + client.connected);
});

client.request("user/Administrator")
  .get(function(error, user) {
    if (error) {
      // something went wrong
      throw error;
    }

    console.log(user)
  });*/

app.controller('ProfilCtrl1', ['$rootScope', function($rootScope) { 
    $rootScope.profil = function(i) {
      $("#allUsers").modal('hide.modal');   
      $("#profil").modal('show');
      $rootScope.user=Utilisateur[0];
      //$scope.user = usersss[i];
    }; 
}]); 

/*app.controller('ProfilCtrl1', ['$rootScope', function($rootScope) { 
    $rootScope.profil = function(i) {
      $("#allUsers").modal('hide.modal');   
      $("#profil").modal('show');
      //$rootScope.user=usersss[i];
      for (var j = 0;  j<=3; j++) {
        if (i==usersss[j].name){
          $rootScope.user=usersss[j];
        }
      }
      //alert(i);
      //$scope.user = usersss[i];
    }; 
}]); */

 /*app.controller("ProfilCtrl", function ($scope) {
  $scope.user = usersss[0];
}); */