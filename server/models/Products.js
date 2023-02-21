const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema ({

name:{
        type:String,
        required:true,
},
description:{
        type:String,
        required:true,

},
stock:{
        type:Number,
        required:true,
},
price:{
        type:Number,
        required:true,
},
category:{
        type:String,
        required:true,
},
date:{
        type:Date,
        required:true,
}
})

const ProductModel = mongoose.model("products", ProductSchema);
module.exports=ProductModel;
