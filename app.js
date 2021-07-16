const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "Login and Register Secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 

mongoose.connect('mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/ReEngineDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const sellSchema = {
  name: String, 
  itemName: String,
  quantity: String,
  price: String,
  address: String,
  phone: String,
  email: String,
  description: String,
  image: String,
  category: String
}

const demandSchema = {
  itemName: String,
  itemBrand: String,
  itemQuantity: String,
  itemPrice: String,
  itemDescription: String,
  name: String,
  phone: String,
  email: String,
  address: String
}

const Sell = mongoose.model("Sell", sellSchema);
const Demand = mongoose.model("Demand", demandSchema);
const Phone = mongoose.model("Phone", sellSchema);
const Computer = mongoose.model("Computer", sellSchema);
const Laptop = mongoose.model("Laptop", sellSchema);
const Electronic = mongoose.model("Electronic", sellSchema);
const Drafter = mongoose.model("Drafter", sellSchema);
const Labcoat = mongoose.model("Labcoat", sellSchema);
const Other = mongoose.model("Other", sellSchema);


app.get("/home", function(req, res){
  if(req.isAuthenticated()){
    Sell.find({}, function(err, personSell){
      res.render("home", {
        personSell: personSell
        });
    });
  } else {
    res.render("login");
  }
});

app.get("/", function(req, res){
  if(req.isAuthenticated()){
    Sell.find({}, function(err, personSell){
      res.render("home", {
        personSell: personSell
        });
    });
  } else {
    res.render("dashboard");
  }
})

app.get("/login", function(req, res){
  res.render("login");
})
app.get("/register", function(req, res){
  res.render("register");
})

app.get("/personSell", function(req, res){
  if(req.isAuthenticated()){
    res.render("personSell");
  } else {
    res.render("login")
  }  
});

app.get("/manual", function(req, res){
    res.render("manual"); 
});

app.get("/demands", function(req, res){
  if(req.isAuthenticated()){
    Demand.find({}, function(err, personBuy){
      res.render("demands", {personBuy: personBuy});
    });
  } else {
    res.render("login");
  }  
});

app.get("/consumer", function(req, res){
  if(req.isAuthenticated()){
    res.render("consumer");
  } else {
    res.render("login");
  }
});

app.get("/category", function(req, res){
  if(req.isAuthenticated()){
    res.render("category");
  } else {
    res.render("login");
  }
});

app.get("/phones", function(req, res){
  if(req.isAuthenticated()){
    Phone.find({}, function(err, phones){
      res.render("categoryDetail", {
        item: phones,
        name: "MOBILES"
      });
    });
  } else {
    res.render("login");
  } 
});

app.get("/computers", function(req, res){
  if(req.isAuthenticated()){
    Computer.find({}, function(err, computers){
      res.render("categoryDetail", {
        item: computers,
        name: "COMPUTERS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/laptops", function(req, res){
  if(req.isAuthenticated()){
    Laptop.find({}, function(err, laptops){
      res.render("categoryDetail", {
        item: laptops,
        name: "LAPTOPS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/electronics", function(req, res){
  if(req.isAuthenticated()){
    Electronic.find({}, function(err, electronics){
      res.render("categoryDetail", {
        item: electronics,
        name: "ELECTRONICS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/drafters", function(req, res){
  if(req.isAuthenticated()){
    Drafter.find({}, function(err, drafters){
      res.render("categoryDetail", {
        item: drafters,
        name: "DRAFTERS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/labCoats", function(req, res){
  if(req.isAuthenticated()){
    Labcoat.find({}, function(err, labCoats){
      res.render("categoryDetail", {
        item: labCoats,
        name: "LABCOATS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/others", function(req, res){
  if(req.isAuthenticated()){
    Other.find({}, function(err, others){
      res.render("categoryDetail", {
        item: others,
        name: "OTHER PRODUCTS"
      });
    });
  } else {
    res.render("login");
  }
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
})

app.post("/register", function(req, res){
   User.register({username: req.body.username}, req.body.password, function(err, user){
     if(err){
       console.log(err);
       res.render("register");
     } else {
       passport.authenticate("local")(req, res, function(){
         res.redirect("/");
       })
     }
   })
});

app.post("/login", function(req, res){
   const user = new User({
     username: req.body.username,
     password: req.body.password
   });
   req.login(user, function(err){
     if(err){
       console.log(err);
     } else {
       passport.authenticate("local")(req, res, function(){
         res.redirect("/");
       });
     }
   });
});


app.post("/personSell", function(req, res){
  const type = req.body.category;
  const sell = new Sell({
    name: req.body.personName,
    itemName: req.body.itemName,
    quantity: req.body.itemQuantity,
    price: req.body.itemPrice,
    address: req.body.personAddress,
    phone: req.body.personPhone,
    email: req.body.PersonEmail,
    description: req.body.itemDescription,
    image: req.body.itemImage,
    category: req.body.category
  });
  sell.save(function(err){
    if(!err){
      console.log(Sell);
    }
  });
  if(type == "phones"){
    const phone = new Phone({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    phone.save(function(err){
      if(!err){
        console.log(Phone);
      }
    })
  }  else if(type == "computers"){
    const computer = new Computer({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    computer.save(function(err){
      if(!err){
        console.log(Computer);
      }
    })
  } else if(type == "laptops"){
    const laptop = new Laptop({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    laptop.save(function(err){
      if(!err){
        console.log(Laptop);
      }
    })
  } else if(type == "electronics"){
    const electronic = new Electronic({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    electronic.save(function(err){
      if(!err){
        console.log(Electronic);
      }
    })
  } else if(type == "drafters"){
    const drafter = new Drafter({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    drafter.save(function(err){
      if(!err){
        console.log(Drafter);
      }
    })
  } else if(type == "labCoats"){
    const labcoat = new Labcoat({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    labcoat.save(function(err){
      if(!err){
        console.log(Labcoat);
      }
    })
  } else {
    const other = new Other({
      name: req.body.personName,
      itemName: req.body.itemName,
      quantity: req.body.itemQuantity,
      price: req.body.itemPrice,
      address: req.body.personAddress,
      phone: req.body.personPhone,
      email: req.body.PersonEmail,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category: req.body.category
    });
    other.save(function(err){
      if(!err){
        console.log(Other);
      }
    })
  }
  res.redirect("/");
});

app.post("/demands", function(req, res){
  const demand = new Demand({
    itemName: req.body.itemName,
    itemBrand: req.body.itemBrand,
    itemQuantity: req.body.itemQuantity,
    itemPrice: req.body.itemPrice,
    itemDescription: req.body.itemDescription,
    name: req.body.yourName,
    phone: req.body.yourPhone,
    email: req.body.yourEmail,
    address: req.body.yourAddress
  });
  demand.save(function(err){
    if(!err){
      res.redirect("/demands");
    }
  })
});

app.post("/search", function(req, res){
  if(req.isAuthenticated()){
    const requestedItem = _.lowerCase(req.body.search);
  let x = 0;
  Sell.find({}, function(err, personSell){
    personSell.forEach(function(item){
      const storedTitle = _.lowerCase(item.itemName);
      if (storedTitle === requestedItem) {
        res.render("product", {
          SellerName: item.name,
          ItemName: item.itemName,
          Quantity: item.quantity,
          Price: item.price,
          Address: item.address,
          Phone: item.phone,
          Email: item.email,
          Description: item.description,
          Image: item.image,
          Category: item.category
        });
        x=1;
      }
    });
    if(x==0){
      res.render("notFound");
    }
  });
  } else {
    res.render("login");
  }
});

app.get("/products/:productName", function(req, res){
  const requestedItem = req.params.productName;
  Sell.find({}, function(err, personSell){
    personSell.forEach(function(item){
      const mainName = item.itemName;
      if(mainName === requestedItem){
        res.render("product", {
          SellerName: item.name,
          ItemName: item.itemName,
          Quantity: item.quantity,
          Price: item.price,
          Address: item.address,
          Phone: item.phone,
          Email: item.email,
          Description: item.description,
          Image: item.image,
          Category: item.category
        });
      }
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log(`Server has started successfully on port ${port}`);
});
