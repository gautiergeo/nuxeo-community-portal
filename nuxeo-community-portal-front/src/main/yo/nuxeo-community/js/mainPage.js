$(document)
  .ready(function() {

    /*$('.filter.menu .item')
      .tab()
    ; */
    $('.menu.one .item')
      .tab({
        // tabs are inside of this element
        history : false,
        context: '#parent-one'
      });
    ;
    $('.menu.two .item')
      .tab({
        history : false,
        context: '#parent-two'
      });
    ;

    $('.menu.three .item')
      .tab({
        history : false,
        context: '#parent-three'
      });
    ;

    $('.menu.four .item')
      .tab({
        history : false,
        context: '#parent-four'
      });
    ;

    $('.ui.rating')
      .rating({
        clearable: true
      })
    ;

    $('.ui.sidebar')
      .sidebar('attach events', '.launch.button')
    ;

    $('.ui.dropdown')
      .dropdown()
    ;


    
    $('.ui.popup')
    .popup()
    ;
    
    $('.two.wide.column .item')
    .popup({
      inline: true
    })
    ;
    var $pseudo = $('#pseudo'),
        $mdp = $('#mdp'),
        $confirmation = $('#confirmation'),
        /*$check = $('#terms'),*/
        $erreur = $('#erreur'),
        $envoi = $('#envoi'),
        $reset = $('#reset'),
        $champ = $('.champ');

    $champ.keyup(function(){
      if($(this).val().length < 5){ // si la chaîne de caractères est inférieure à 5
          $(this).css({ // on rend le champ rouge
            borderColor : 'red',
            color : 'red'
          });
       }
      else{
        $(this).css({ // si tout est bon, on le rend vert
           borderColor : 'green',
           color : 'green'
        });
      }      
    });

   /* $check.keyup(function(){
      if($(this).val() != '1'){
        $(this).css({ // on rend le champ rouge
          borderColor : 'red',
          color : 'red'
        });
        }
      else{
        $(this).css({ // si tout est bon, on le rend vert
          borderColor : 'green',
          color : 'green'
        });
      }
    }); */

    $confirmation.keyup(function(){
      if($(this).val() != $mdp.val()){ // si la confirmation est différente du mot de passe
        $(this).css({ // on rend le champ rouge
          borderColor : 'red',
          color : 'red'
        });
      }
      else{
        $(this).css({ // si tout est bon, on le rend vert
          borderColor : 'green',
          color : 'green'
        });
      }
    });

    $envoi.click(function(e){
      e.preventDefault();

      verifier($pseudo);
      verifier($mdp);
      verifier($confirmation);
    });

    function verifier(champ){
      if(champ.val() == ""){ // si le champ est vide
        $erreur.css('display', 'block'); // on affiche le message d'erreur
          champ.css({ // on rend le champ rouge
            borderColor : 'red',
            color : 'red'
        });
      }
    }

    function nettoyer(champ){
      if(champ.val() != ""){ // si le champ est non vide
        $champ.val("");
      }
    }

    $reset.click(function(){
      $champ.css({ // on remet le style des champs comme on l'avait défini dans le style CSS
        borderColor : '#ccc',
        color : '#555'
      });
      $erreur.css('display', 'none'); // on prend soin de cacher le message d'erreur

      nettoyer($pseudo);
      nettoyer($mdp);
      nettoyer($confirmation);
    });

  })
;
/**
 * 
 */