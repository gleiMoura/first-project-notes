import { Post } from "../../interface";
import { PostCard } from "../Postcard";

const Posts = ({ posts }:{posts: Post[]}) => {
    return (
        <div className='posts'>
            {posts.map((post, _) => {
                return (
                    <PostCard post={post} key={post.id} />
                )
            })}
        </div>
    )
};

export default Posts;
