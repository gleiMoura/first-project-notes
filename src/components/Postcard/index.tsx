import { Post } from "../../interface";

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className='post' >
            <img src={post.cover} alt={post.body} />
            <div className='post-content'>
                <h3>{post.title}</h3>
                <h5>{post.body}</h5>
            </div>
        </div>
    )
};


