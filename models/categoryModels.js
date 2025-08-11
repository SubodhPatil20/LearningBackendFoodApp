const mongoose =require('mongoose');
const categorySchema=new mongoose.Schema({
   title:{
type:String,
required:[true,'Category is required']
   },
   imgUrl:{
    type:String,
    default:"https://imgs.search.brave.com/CUAKDt4OHsH2rZ8xGtq7gUtjiH073tC-86h-BDsRuPg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMjc4/NDMyODcyL3N0b2Nr/LXBob3RvLWluZGlh/bi1mb29kLXBsYXR0/ZXItaGluZHUtdmVn/LXRoYWxpLXNlbGVj/dGl2ZS1mb2N1cw"
   },
    status: {
    type: String,
    default: "inactive",
  },
},{timestamps:true});


module.exports = mongoose.model("Category",categorySchema);