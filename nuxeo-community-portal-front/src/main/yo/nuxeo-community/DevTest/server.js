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
  baseURL: 'http://demo.nuxeo.com/nuxeo/',
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
      var newData = new Object();
      client.operation('Document.Query')
      .params( {
        query : "SELECT * FROM Folder WHERE dc:description ='"+Tab[i].id+"'"
      })
      .execute(function(error, data) {
        if (error) {
          console.log('Not created')
          throw error;
        }
        console.log(data)
      }); 
    };      

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
      for (var i = 1; i < 4; i++) { 
      var newData = new Object();
      newData = ArticleExist(TabOfArticles,i);
      //console.log(newData)
      }; 
    };
      /*client.operation('Document.Create')
      .params({
    type: 'Folder',
    name: TabOfArticles[1].title,
    properties: 'dc:title='+TabOfArticles[1].title + '\ndc:description='+TabOfArticles[0].id + '\ndc:source='+TabOfArticles[0].id 
  })
      /*.params({
      type: 'Document',
      name: TabOfArticles[0].title,
      properties:'' /*'dc:title='+TabOfArticles[0].title+ '\ndc:source='+ TabOfArticles[0].link +' \ndc:publisher='+TabOfArticles[0].author+ '\ndc:description='+TabOfArticles[0].id
      })
      .input('doc:/default-domain/workspaces/Activities')
      .execute(function(error, folder) {
      if (error) {
      // something went wrong
        throw error;
      }
      console.log('It worked')
      });*/
    }
    xhr.open("GET", "http://answers.nuxeo.com/feeds/rss");

    xhr.send();
  }, 10000 );

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

