var http = require("http");
var url = require("url");
var sys = require('util');
var nuxeo = require('nuxeo');

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");

  var client = new nuxeo.Client({
  baseURL: 'http://localhost:8080/nuxeo/',
  username: 'Administrator',
  password: 'Administrator',
  timeout: 60000
  });
  client.schemas(['dublincore','common', 'file','nxsourceid','activitycommunity']);     
  client.connect(function(error, client) {
    if (error) {
      console.error('Cannot connect to Nuxeo server');
      throw new Error(error);
    }
    if (!error) {
      console.log('connected to Nuxeo server');
    }
  });

  function ArticleExist(Tab,i){
      client.operation('Document.Query')
      .params( {
        query : "SELECT * FROM ActivityCommunity WHERE dc:description ='"+Tab[i].id+"' AND ecm:currentLifeCycleState != 'deleted'"
      })
      .execute(function(error, data) {
        if (error) {
          console.log('Not created because error')
          throw error;
        }
        if (data.entries.length == 0) {
          CreateArticle(Tab,i);
        };
        if (data.entries.length != 0) {
          console.log("This Article Exist")
        };
      }); 
    };      
  function CreateArticle(Tab,i){
    client.operation('Document.Query')
    .params( {
        query : "SELECT * FROM NxSourceId WHERE nxsourceid:NxId ='"+Tab[i].author+"'"
      })
    .execute(function(error, data) {
      if (error) {
        throw error;
      }
      if (data.entries[0]!= undefined){
         Tab[i].author=data.entries[0].properties['nxsourceid:NxUsername'];
         client.operation('Document.Create')
        .params({
          type: 'ActivityCommunity',
          name: Tab[i].title,
          properties: 'dc:title='+Tab[i].title + '\ndc:description='+Tab[i].id + '\nactivitycommunity:Link='+Tab[i].link + '\ndc:publisher='+Tab[i].author +'\ndc:source=' +Tab[i].source
          })
        .input('doc:/default-domain/workspaces/Activities')
          .execute(function(error, folder) {
          if (error) {
          // something went wrong
            throw error;
          }
          console.log('It worked')
        });
      }
      else {
         client.operation('Document.Create')
        .params({
          type: 'ActivityCommunity',
          name: Tab[i].title,
          properties: 'dc:title='+Tab[i].title + '\ndc:description='+Tab[i].id + '\nactivitycommunity:Link='+Tab[i].link + '\ndc:publisher='+Tab[i].author  +'\ndc:source=' +Tab[i].source
        })
        .input('doc:/default-domain/workspaces/Activities')
          .execute(function(error, folder) {
          if (error) {
          // something went wrong
            throw error;
          }
          console.log('It worked')
        });
      }
    });
  }

  setInterval(function (){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
    sys.puts("State: " + this.readyState);

    if (this.readyState == 4) {
      //sys.puts("Complete.\nBody length: " + this.responseText.length);
      //sys.puts("Body:\n" + this.responseText);

      var rawHtml = this.responseText;
      var htmlparser = require("htmlparser");
      var handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error)
              console.log("error")
          else
              console.log("success")
      });
      var parser = new htmlparser.Parser(handler);
      parser.parseComplete(rawHtml);
      //var DatePub = getDatePub(handler.dom);
      var TabOfArticles = new Array();
      //sys.puts(sys.inspect(handler.dom, false, null));
      for (var i = 7; i < 37; i++) {
        var Article = new Object();
        Article.title=getTitle(handler.dom,i);
        Article.author=getAuthor(handler.dom,i);
        Article.datePub=getDatePub(handler.dom,i);
        Article.link=getLink(handler.dom,i);
        Article.source='Answers';
        var gettingId = Article.link.match("questions/(.*)/");
        Article.id=gettingId[1];
        TabOfArticles[i-7]= Article;
      };  
      for (var i = 0; i < TabOfArticles.length; i++) { 
        ArticleExist(TabOfArticles,i);
      }; 
    };
    }
    xhr.open("GET", "http://answers.nuxeo.com/feeds/rss");

    xhr.send();
  }, 1211000 );

setInterval(function (){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      sys.puts("State: " + this.readyState);

      if (this.readyState == 4) {
        var rawHtml = this.responseText;
        var htmlparser = require("htmlparser");
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error)
            console.log("error")
        });
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(rawHtml);

        var TabOfActivities = new Array();
        //sys.puts(sys.inspect(handler.dom, false, null));
        for (var i = 5; i < 15; i++) {
          var Activity = new Object();
          Activity.title=getActivityTitle(handler.dom,i);
          Activity.author=getActivityAuthor(handler.dom,i);
          Activity.datePub='';
          Activity.link=getActivityLink(handler.dom,i);
          Activity.source='Jira';
          Activity.id=Activity.link+Activity.author;
          TabOfActivities[i-5]= Activity;
        };  
        for (var i = 0; i < TabOfActivities.length; i++) { 
          ArticleExist(TabOfActivities,i);
        }; 
      };
    }
    xhr.open("GET", "https://jira.nuxeo.com/activity?maxResults=15&streams=key+IS+NXP&providers=issues+thirdparty+dvcs-streams-provider&title=undefined");
    xhr.send();
  }, 600000 );

// setInterval(function (){
//     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//     var xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function() {
//     sys.puts("State: " + this.readyState);

//     if (this.readyState == 4) {
//       var rawHtml = this.responseText;
//       var htmlparser = require("htmlparser");
//       var handler = new htmlparser.DefaultHandler(function (error, dom) {
//           if (error)
//               console.log("error")
//           else
//               console.log("success")
//       });
//       var parser = new htmlparser.Parser(handler);
//       parser.parseComplete(rawHtml);
//       var TabOfBlogPosts = new Array();
     
//       for (var i = 20; i < 39; i=i+2) {
//         var Post = new Object();
//         Post.title=getPostTitle(handler.dom,i);
//         Post.author=getPostAuthor(handler.dom,i)[1];
//         Post.datePub=getPostDatePub(handler.dom,i);
//         Post.link=getPostLink(handler.dom,i);
//         Post.source='Blogs';
//         Post.id=Post.link;
        
//         TabOfBlogPosts[(i/2)-10]= Post;
//       };  
//       for (var i = 0; i < TabOfBlogPosts.length; i++) { 
//         ArticleExist(TabOfBlogPosts,i);
//       }; 
//     };
//     }
//     xhr.open("GET", "http://blogs.nuxeo.com/feed/");

//     xhr.send();
//   }, 3600000 );

}
function getActivityAuthor(Flux,i){
  author = Flux[0].children[i].children[1].children[0].data.match('jspa\\?name\\=(.*)\\" class');
  var authorUsername = author[1];
  return authorUsername;    
}

function getActivityTitle(Flux,i){
  username=  Flux[0].children[i].children[1].children[1].data.match('(.*)\\&lt\\;\\/a');
  if (Flux[0].children[i].children[1].children[3]!= undefined) {
    title1= Flux[0].children[i].children[1].children[2].data.match('(.*)\\&lt\\;a');
    title2= Flux[0].children[i].children[1].children[3].data.match('(.*)\\&lt\\;\\/');
    title1= title1[1].trim();

    if (title2 != null) {
      title2= title2[1].replace("&amp;gt;",">");
      title=username[1] +" "+ title1 +" "+ title2;

      console.log(title)
      return title;
    }
    else {
      title2=Flux[0].children[i].children[1].children[4].data.match('(.*)\\&lt\\;\\/');
      if (title2 != null) {
      title2= title2[1];
      title3= Flux[0].children[i].children[1].children[5].data.match('(.*)\\&lt\\;\\/');
      title3= title3[1].replace("&amp;gt;",">");
      title=username[1] +" "+ title1 +" "+ title2 + title3;

      console.log(title)
      return title;
      }
      else{
        title2=Flux[0].children[i].children[1].children[5].data.match('(.*)\\&lt\\;\\/');
        if (title2 != null) {
        title2= title2[1].replace("&amp;gt;",">");
        title=username[1] +" "+ title1 +" "+ title2;
        console.log(title)
        return title;
        }
        else{
          title=username[1] +" "+ title1;
          return title;
        }
      };
    };
  };
}

function getActivityLink(Flux,i){
  link= Flux[0].children[i].children[1].children[2].data.match('href\\=\\"(.*)\\"');
  if (link!=null) {
    link=link[1];
    return link;
  };
}

function getTitle(Flux,i){
      title = Flux[2].children[0].children[i].children[0].children[0].data;
      return title;
      }  

function getDatePub(Flux,i){
      datePub = Flux[2].children[0].children[i].children[5].children[0].data;
      return datePub;
      }

function getAuthor(Flux,i){
      author = Flux[2].children[0].children[i].children[4].children[0].data;
      return author;
      }      

function getLink(Flux,i){
      link = Flux[2].children[0].children[i].children[6].children[0].data;
      return link;
      }  

function getPostTitle(Flux,i){
      title = Flux[2].children[1].children[i].children[1].children[0].data;
      return title;
      }  

function getPostDatePub(Flux,i){
      datePub = Flux[2].children[1].children[i].children[8].children[0].data;
      return datePub;
      }

function getPostAuthor(Flux,i){
      author = Flux[2].children[1].children[i].children[10].children[0].data;
      gettingAuthor = author.match('CDATA\\[(.*)\\]\\]');
      return gettingAuthor;
      }      

function getPostLink(Flux,i){
      link = Flux[2].children[1].children[i].children[4].data;
      return link;
      }  
exports.start = start;

