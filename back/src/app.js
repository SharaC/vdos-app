const express = require('express')
const resourceRouter = require('./routers/resource')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors({ 'origin': '*'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
});

app.use(express.json())
app.use(resourceRouter)

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})
