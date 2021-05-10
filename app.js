const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const homeStartingContent = "This is a collabarative site for developers and coders who often and obviously get stuck at a point during their development journey.This platform can help those who are seeking answers and those who are able to give correct answers."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect('mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/ReEngineDB', {useNewUrlParser: true, useUnifiedTopology: true});


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


app.get("/", function(req, res){
  Sell.find({}, function(err, personSell){
    res.render("home", {
      startingContent: homeStartingContent,
      personSell: personSell
      });
  });
});


app.get("/personSell", function(req, res){
  res.render("personSell");
});

app.get("/manual", function(req, res){
  res.render("manual");
});

app.get("/demands", function(req, res){
  Demand.find({}, function(err, personBuy){
    res.render("demands", {personBuy: personBuy});
  });
});

app.get("/consumer", function(req, res){
  res.render("consumer");
});

app.get("/category", function(req, res){
  res.render("category");
});

app.get("/phones", function(req, res){
  Phone.find({}, function(err, phones){
    res.render("categoryDetail", {
      item: phones,
      name: "MOBILES"
    });
  });
});

app.get("/computers", function(req, res){
  Computer.find({}, function(err, computers){
    res.render("categoryDetail", {
      item: computers,
      name: "COMPUTERS"
    });
  });
});

app.get("/laptops", function(req, res){
  Laptop.find({}, function(err, laptops){
    res.render("categoryDetail", {
      item: laptops,
      name: "LAPTOPS"
    });
  });
});

app.get("/electronics", function(req, res){
  Electronic.find({}, function(err, electronics){
    res.render("categoryDetail", {
      item: electronics,
      name: "ELECTRONICS"
    });
  });
});

app.get("/drafters", function(req, res){
  Drafter.find({}, function(err, drafters){
    res.render("categoryDetail", {
      item: drafters,
      name: "DRAFTERS"
    });
  });
});

app.get("/labCoats", function(req, res){
  Labcoat.find({}, function(err, labCoats){
    res.render("categoryDetail", {
      item: labCoats,
      name: "LABCOATS"
    });
  });
});

app.get("/others", function(req, res){
  Other.find({}, function(err, others){
    res.render("categoryDetail", {
      item: others,
      name: "OTHER PRODUCTS"
    });
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
  console.log("Server has started successfully");
});
