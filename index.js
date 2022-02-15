const coonectToMongoose = require('./db.js');
const express = require('express');
const app = express();
const port = process.env.port;
const cors = require('cors');
const PORT = process.env.PORT || 5000;
coonectToMongoose();

app.use(express.json());
app.use(cors({ origin: '*' }));

if(process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path"); 
    app.get("*", (req, res) => { 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))})
}

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, ()=>{
    console.log(`Server running at port: ${PORT}`)
});