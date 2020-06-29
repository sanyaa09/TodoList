const express = require("express");
const bodyparser = require("body-parser");

const app = express();
var workitems = [];
var items = ["Go for a Walk","Water Plants","Prepare breakfast"];

app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    var today = new Date();

    var options = 
{
    weekday:"long",
    day:"numeric",
    month:"long"
};

var day = today.toLocaleDateString("en-US",options);
    
res.render("list",{listTitle :day,newList:items});
});

app.post("/",function(req,res){
    
   var item = ( req.body.newItem);
   if(req.body.list ==="Work"){
       workitems.push(item);
       res.redirect("/work")
   }
   else{
   items.push(item);
   res.redirect("/");
}
});

app.get("/work",function(req,res){
    res.render("List",{listTitle:"Work List",newList:workitems});
});
app.post("/work",function(req,res){
    var item = ( req.body.newItem);
    workitems.push(item);
    res.redirect("/work");
});
app.listen(process.env.PORT||3000,function(){
    console.log("Server has started");
});