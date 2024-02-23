const express = require('express');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
var cors = require('cors');


const app = express();


app.use(cookieparser());

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(express.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    limit : '50mb',
    extended: true
}))



//routes

const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const organizationRoute = require('./routes/organizationRoute');


app.use("/Admin",adminRoute);
app.use("/User",userRoute);
app.use("/Organization",organizationRoute);





module.exports = app;