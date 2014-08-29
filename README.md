nuxeo-community-portal
======================

<h2>About</h2>

The purpose of the application is to gather people using Nuxeo. The application provides access to a stream of information coming from different sites of Nuxeo. Nuxeo Community Portal allows users to share their opinions and to keep themselves informed of what happen in the Nuxeo community.


<h3>Status</h3>

Work in progress.


<h3>Current functional scope</h3>


Displaying a stream of activities:
	
- Displaying activities from blogs.nuxeo.com
- Displaying activities from answers.nuxeo.com
- Displaying activities from jira.nuxeo.com

Display the profile of a user when we click on his name.
	
Display the profile of the user connected when we click on his name or on the button "My account"
	
Change profile information (Picture, Biography, General information)


Documents Activity are created by a script using node.js. This script allows you to retrieve the RSS feeds of sites: blogs.nuxeo.com, answers.nuxeo.com, jira.nuxeo.com/browse/NXP. Once the data recovered, the script creates for each 	post, article, or issue, a document Activity in the Nuxeo platform. 

Document USId are created by users or administrators. It allows the user to bind his identifier from a given source to his account on Nuxeo Community Portal. 
Once the USId document is created, all the other activities created by his identifier on the given source will now be in his username.



<h3>Technical documentation </h3>

<h4>Architecture</h4>


Nuxeo Community Portal uses the Nuxeo API to create/read/update documents in the Nuxeo platform. We use Nuxeo repository for storing activity, profile, and USId(= Username/Source/Id) objects. These types of documents must be 	created in the Nuxeo platform in advance.You have to put the file cors-config.xml in the folder config which is in the folder nxserver, in your Nuxeo application. For more information about CORS, see http://doc.nuxeo.com/pages/viewpage.action?pageId=14257084
	
An AngularJS application which leverages the nuxeo.js client is used for the UI.

We use AngularJs and SemanticUi for the homepage: Index, the user page: User, and the visitor page: Visitor. Files user.js and visitor.js contain the controllers for the pages (respectively) User and Visitor.

Each controller corresponds to a query type using the Nuxeo API: there is a controller to display the profile of a user, one to display the stream of activities, another one to change the profile picture, etc.
	
See <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/js/visitor.js"> visitor.js</a> and <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/js/user.js"> user.js</a> for more details.

Index is the homepage that allows you to go to the user page if the user has an account, but he must connect first, or to the visitor page if the user doesn't have an account.

Visitor is the "simplest" page. The requests are done using the account visitor/visitor. He has the right to read files, nothing more. For the moment the visitor can see the stream of activities, visit the profiles of existing users.

The page User requires the user to be connected to have access to data. Once connected he can edit his profile, bind an Identifier to his account, view the stream of activities (Jira, Answers, Blogs).

A user has the rights to write in the file to his name(=Change his information). He has the right to read the other files(=View the stream of activities, and other profiles).

We use some node.js scripts for the crawling of user activities on remote sources.
See <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/ServerCreatingActivities/server.js"> server.js</a> for more details.


<h4>Data model</h4>


A document Activity has a link, a title, a publisher, a date of publication, a description, a source(ex:Jíra),, and an Id.

A document NxProfile is a folder containing a document MyProfile. Only one user has the right to write in a folder NxProfile which has his name. Each user must have a folder NxProfile to his name.

A document MyProfile is in a folder NxProfile. It is a document with all the information of the user. It has a title(=username of the user), a picture(Actually it is a string which contains the path of the picture), a biography(=string), general 		informations(=string).

A document USId has a username, an identifier and a source.

Currently the profile documents are created by an administrator in a file on behalf of users.
A user has the rights to write in the file to its name. He has the right to read the other files.


<h4>Limitating and remaining work</h4>

Currently documents NxProfile and MyProfile are created by an administrator on behalf of users. We must implement a workflow in Nuxeo Platform that create a document NxProfile and a document MyProfile when we create a new user. It 	must give the right to write to the user created, and the right to read to the others.

Once connected to the API we don't need to use client.connect anymore. We just need to define what is a client. The problem is: "how to disconnect?", the second problem is "how to stay connected if the user refresh the page?"




