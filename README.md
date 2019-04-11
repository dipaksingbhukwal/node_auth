# node_auth

Authentication is important part of application. Application you build must provide some measure to keep data secure and personal. This article is about using authentication in NodeJS application using MongoDB.

Framework & Tools:
Npm
NodeJS
Express
MongoDB
VS Code

Packages:
•	express – Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

•	mongoose - To provide modeling environment to create structured database in MongoDB.

•	body-parse – Used it to parse incoming request body and use data from body in middleware before sending a response

•	bcryptjs  - Used it to convert simple human readable password (received in  request body) into hash string which cannot be easily decrypted into simple form. 

•	express-session  - This package was important in order to keep the track of users in order to show specific content to specific user only. For this tutorial, this package does not show its power, but when applied to bigger application, which servers multiple users, it plays vital role separating sessions.

•	nodemon – To save time of restarting the server each time after changing code, used nodemon. It restarts server automatically, once any code change is saved.

This was one of the ways to authenticate user (with sessions and cookies). User can be authenticated via token-based authentication, OAuth or JSAON Web Tokens, or using ‘Passport’ middleware.
GitHub: https://github.com/dipaksingbhukwal/node_auth 
Original article: Starting with Authentication (A tutorial with Node.js and MongoDB)

Author: Daniel Deutsch
