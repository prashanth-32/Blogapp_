import express from "express";
import multer from "multer"
import Post from "../models/post.js"

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const name = Date.now()+file.originalname;
    cb(null, name);
  }
})

const upload = multer({ storage: storage })
router.use(express.json());

//To get all posts
router.get('/posts',async (req,res)=>{
    const posts = await Post.find({}).sort({createdAt:-1});
    res.status(200).json({posts});
})

//To get particular post info
router.get('/post/:id',async (req,res)=>{
    const {id} = req.params;
    const data = await Post.find({_id:id})
    res.status(200).json({data});
})


//To upload an image in a post
router.post('/upload', upload.single('file'), function (req, res) {
    // console.log(req.file.filename);
   res.status(200).json({message:req.file.filename});
});


//To upload information about post

router.post('/post',async (req,res)=>{
    try{
        const newPost = new Post(req.body);
        newPost.save();
        res.status(200).json({message:"Created a new post!"});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})

router.put('/post/:id',async (req,res) =>{
  try{
        const {id} = req.params;
        await Post.findOneAndUpdate({_id:id},req.body);
        res.status(200).json({message:"Updated a new post!"});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})

//To get all posts of a particular user
router.get('/userPosts/:id',async (req,res) =>{
    try{
        const {id} = req.params;
        const posts = await Post.find({author:id}).sort({createdAt:-1});
        res.status(200).json({posts});
    }
    catch(err)
    {
        res.status(400).json({message:"Error while fetching user posts"});
    }
})

//To delete a particular post
router.delete('/:id',async (req,res) =>{
    try{
        const {id} = req.params;
        await Post.findOneAndDelete({_id:id});
        res.status(200).json({message:"Sucessfully deleted a post"});
    }
    catch(err)
    {
        res.status(400).json({message:"Error while fetching user posts"});
    }
})


export default router;