const express = require('express')
const userModel = require('./models/user')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine' , 'ejs')

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/read', async (req,res)=>{
    let allusers = await userModel.find() 
    res.render("read" , {users : allusers })
})

app.post('/create',async(req,res)=>{
    let {name , email , image} = req.body
    let createUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/")
})

app.get('/delete/:id', async (req,res)=>{
    let delet = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read" , {user:delet})
})

app.get('/edit/:userid',async(req,res)=>{
    let user = await userModel.findById(req.params.userid);
    res.render('edit',{user})
})

app.post('/update/:userid',async(req,res)=>{
    let {name , email , image} = req.body
    let user = await userModel.findOneAndUpdate({_id:req.params.userid} ,{name , email , image},{new:true});
    res.redirect("/read" )
})

app.post('/edit/:userid',async(req,res)=>{
    let {name , email , image} = req.body
    let edit = await userModel.findOneUpdate({_id:req.params.id} , {name,email,image})
    res.redirect("/")
})

app.listen(port,()=>{
    console.log("Server is start!")
})