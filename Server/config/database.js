const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const connectMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((res)=>{console.log('Database Connected Successfully')})
    .catch((err)=>{
        console.log("DB Connection Failed");
        console.log(err);
    });
}


module.exports = connectMongo;