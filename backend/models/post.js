import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        title:{
            type: String
        },
        author:{
            type:String
        },
        description:{
            type:String
        },
        image_url:{
            type:String,
        },
        categories:{
            type:[String]
        }
    },
    {
        timestamps:true
    }
);

const Post = mongoose.model('Post',postSchema);

export default Post;