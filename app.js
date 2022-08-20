const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/emgdb",{useNewUrlParser: true});

const numberSchema = {
  key: String,
  name:String,
  covidhelpline:String,
  bloodbank:String,
  ambulanehelpline:String,
  disastermanagment:String
}

const Contacts = mongoose.model("Contacts", numberSchema);

app.get("/contacts", function(req,res){
  Contacts.find(function(err, foundcon){
    if(!err){
      res.send(foundcon);
    }
    else{
      res.send(err);
    }
  });
});

app.post("/contacts", function(req, res){
  const newContact = new Contacts({
    key: req.body.key,
    name: req.body.name,
    covidhelpline: req.body.covidhelpline,
    bloodbank: req.body.bloodbank,
    ambulanehelpline: req.body.ambulanehelpline,
    disastermanagment: req.body.disastermanagment
  });

  newContact.save(function(err){
    if(!err){
      res.send("Sucess");
    }
    else{
      res.send(err);
    }
  });
});

app.delete("/contacts", function(req, res){
  Contacts.deleteMany(function(err){
    if(!err){
      res.send("Sucessfull deleted all helpline numbers");
    }
    else{
      res.send(err);
    }
  });
});

app.get("/contacts/:keys", function(req, res){
  Contacts.findOne({key:req.params.keys},function(err,foundc){
    if(!err){
      res.send(foundc);
    }
    else{
      res.send(err);
    }
  });
});

app.put("contacts/:keys", function(req,res){
  Contacts.update(
    {key: req.params.keys},
    {
      key: req.body.key,
      name: req.body.name,
      covidhelpline: req.body.covidhelpline,
      bloodbank: req.body.bloodbank,
      ambulanehelpline: req.body.ambulanehelpline,
      disastermanagment: req.body.disastermanagment
    },
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Put data sucessfull");
      }
      else{
        res.send(err);
      }
    }
  );
});

app.patch("contacts/:keys", function(req,res){
  Contacts.update(
    {key: req.params.keys},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Patch sucessfull");
      }
      else{
        res.send(err);
      }
    }
  );
});

app.delete("contacts/:keys", function(req,res){
  Contacts.deleteOne(
    {key: req.params.keys},
    function(err){
      if(!err){
       res.send("Sucessfull deleted specified data");
      }
      else{
        res.send(err);
      }
    }
  );
});

app.listen(3000,function(){
  console.log("Server is running at port3000");
});
