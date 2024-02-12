//Create express instance
const express = require('express')
const connectDB = require('./db/connect');
//Server creation and port configuration
const app = express();
//Set server listening port by PORT value (Set when hit PORT=6000 node app.js) or default 3000.
const port = process.env.PORT || 3000;
//Bring tasks routes handlers
const tasks = require('./routes/tasks')
//dotenv to use environment variables.
require('dotenv').config()
//Not found route
const notFound = require('./middleware/notFound')
//Error handler
const errorHandler = require('./middleware/errorHandler')

app.use(express.static('./public'));
//Enables json objects handle in all routes.
app.use(express.json());

//Routes
//app.get('/api/v1/tasks') //Get all the tasks
//app.post('/api/v1/tasks') //Create a new tasks
//app.get('/api/v1/tasks/:id') //Get single task
//app.patch('/api/v1/tasks/:id') //Update single task
//app.delete('/api/v1/tasks/:id') //Delete single task

//Use tasks file resources. Set tasks base request url to '/api/v1/tasks'and pass tasks file wich contains tasks request handlers.
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

//Connect database first and then run the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();