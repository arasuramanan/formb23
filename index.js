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




app.post("/",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const check=await collection.findOne({email:email});
        if(!password===check.password){
            res.json("Invalid Id and Password");
        }
        else{
            res.json("Login Successful");
        }

    }
    catch(e){
        res.json("fail");
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const check=await collection.findOne({email:email});

        if(check){
            res.json("exist");
        }
        else{
            await collection.create({email, password})
            res.json("register successful");            
        }
    }
    catch(e){
        res.json("fail");
    }
})

app.use('/api', detailRoutes);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});