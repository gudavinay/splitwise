# Splitwise
## Prototype of Splitwise application
 
### Steps to deploy the application
 
#### Frontend
 
1. Clone the repository's front end folder "Frontend" into any machine having node.js installed on it.
2. Open the terminal in the folder "Frontend".
3. Execute "npm install" to install all the dependencies.
4. Update the webConfig.js file in Frontend/src folder with the backend server's IP address and port.
5. Execute "npm run start" to run the front end server.
 
#### Backend
 
1. Clone the repository's backend folder "Backend" into any machine having node.js installed on it.
2. Setup Kafka and Zookeeper and create topics as mentioned in Kafka Scripts.
3. ( Middleware SETUP)
* Open the terminal in the folder "Backend/mongo".
* Execute "npm install" to install all the dependencies.
* Update the connection.js/config.js with frontend server's IP address and port.
* Execute "node index" to run the backend server.
4. ( Kafka Backend SETUP)
* Open the terminal in the folder "Backend/kafka-backend".
* Execute "npm install" to install all the dependencies.
* Update the connection.js with frontend server's IP address and port.
* Execute "node server" to run the backend server.
 
#### Launch the application
 
1. Open the browser and navigate to Front end server's IP address with Port number (Eg: 127.0.0.1:3000) to find the landing page.
