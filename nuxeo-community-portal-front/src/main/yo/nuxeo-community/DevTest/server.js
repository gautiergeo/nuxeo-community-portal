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
  client.schemas(['dublincore','common', 'file']);     
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
          console.log('Not created')
          throw error;
        }
        if (data.entries.length === 0) {
          CreateArticle(Tab,i);
        };
        if (data.entries.length !== 0) {
          console.log("This Article Exist")
        };
      }); 
    };      
  function CreateArticle(Tab,i){
    client.operation('Document.Create')
    .params({
      type: 'ActivityCommunity',
      name: Tab[i].title,
      properties: 'dc:title='+Tab[i].title + '\ndc:description='+Tab[i].id + '\ndc:source='+Tab[i].link + '\ndc:publisher='+Tab[i].author
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
  }, 30000 );

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


exports.start = start;

