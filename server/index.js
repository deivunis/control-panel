const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const UserModel=require('./models/Users');
const ProductModel=require('./models/Products');
const cors=require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://admin:Nesakysiu147!@127.0.0.1:27017/DB?retryWrites=true&w=majority');

//testing connectivity
mongoose.connection.once('connected', function() {
        console.log("Database connected successfully")
});
app.listen(3001, () => {

console.log("Serveris tinkamai veikia");

});

//GET
app.get("/getUsers", (req, res)=>{
UserModel.find({}, (err, result)=>{
if (err) {
	res.json(err);
}else {
	res.json(result);
}
});
});

//POST
app.post("/createUser", async (req, res)=>{
const user = req.body;
const newUser = new UserModel (user);
await newUser.save();
res.json(user)
});

//DELETE
app.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await UserModel.deleteOne({ _id: userId });
  res.json(user);
});

//PUT
app.put("/updateUser/:id", async (req, res)=>{
  const userId = req.params.id;
  const user = req.body;
  
  const updateUser = await UserModel.findByIdAndUpdate({ _id: userId}, user);

  res.json(updateUser);
  });


//PRODUCTS
//GET
app.get("/getProducts", (req, res)=>{
  ProductModel.find({}, (err, result)=>{
  if (err) {
    res.json(err);
  }else {
    res.json(result);
  }
  });
  });
  
  //POST
  app.post("/createProduct", async (req, res)=>{
  const product = req.body;
  const newProduct = new ProductModel (product);
  await newProduct.save();
  res.json(product)
  });
  
  //DELETE
  app.delete("/deleteProduct/:id", async (req, res) => {
    const productId = req.params.id;
  
    const product = await ProductModel.deleteOne({ _id: productId });
    res.json(product);
  });
  
  //PUT
  app.put("/updateProduct/:id", async (req, res)=>{
    const productId = req.params.id;
    const product = req.body;
    
    const updateProduct = await ProductModel.findByIdAndUpdate({ _id: productId}, product);
  
    res.json(updateProduct);
    });
