require('dotenv').config();
const express = require('express');
const collection = require('./models/users.models');
const db = require('./db/connect');
const cors = require('cors');


//import routes
const app = express();
const detailRoutes = require('./routes/details.routes');



const router = express.Router();

//Connecting DB
db();

//Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Online! 🙋‍♂️, 🌏 🎊✨🤩');
});




app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
         res.json("fail")
    }

})
app.use('/api', detailRoutes);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});