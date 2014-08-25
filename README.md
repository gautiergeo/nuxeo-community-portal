nuxeo-community-portal
======================

Community Portal for all the Nuxeo community members.

Nuxeo Community Portal uses the Nuxeo API to view/edit/create documents in the Nuxeo platform. These documents are documents of the type activity, profile or USId (= Username/Source/Id). These types of documents must be created in the Nuxeo platform in advance. The details of each type of document will be explained later.

Documents Activity are created by a script using node.js. This script allows you to retrieve the RSS feeds of sites: blogs.nuxeo.com, answers.nuxeo.com, jira.nuxeo.com/browse/NXP. Once the data recovered, the script creates for each post, article, or issue, a document Activity in the Nuxeo platform. An activity has a title, a publisher, a date of publication, a source(ex:Jíra), a link(to access the original post, to the article or to the question), and an Id.

Document USId are created by users or administrators. It allows the user to bind his identifier from a given source to his account on Nuxeo Community Portal. Once the USId document is created, all the other activities created by his identifier on the given source will now be in his username.

Currently the profile documents are created by an administrator in a file on behalf of users.
A user has the rights to write in the file to its name. He has the right to read the other files.

See <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/ServerCreatingActivities/server.js"> server.js</a> for more details.

We use AngularJs and SemanticUi for pages Index.html, User.html, Visitor.html Index.js and Controllers.js are the controllers for the pages (respectively) User.html and Visitor.html.
Each controller corresponds to a query type via the API Nuxeo. There is a controller to display the profile of a user, a controller to display the stream of activities, a controller to change the profile picture, etc.

See <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/js/controllers.js"> controllers.js</a> and <a href="https://github.com/gautiergeo/nuxeo-community-portal/blob/master/nuxeo-community-portal-front/src/main/yo/nuxeo-community/js/index.js"> index.js</a> for more details.

Index.html is the home page that allows you to create an account, go to the page user.html if the user has an account, but he must connect first, or on the page visitor.html is the user don't have an account.

Visitor.html is the "simplest" page. The requests are done using the account visitor/visitor. He has the right to read files, nothing more. For the moment the visitor will be able to see the flow of activities, visit the profiles.

The page User.html requires the user to be connected to have access to data. Once connected he can edit his profile, bind an Identifier to his account, view the activity stream (Jira, Answers, Blogs).

Once connected to the API we don't need to use client.connect anymore. We just need to define what is a client. The problem is: "how to disconnect?". 



