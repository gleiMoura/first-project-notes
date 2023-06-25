import { Post } from "../../interface";
import createMock from "../Postcard/mock";

const post_1: Post = createMock();
const post_2: Post = createMock();
const post_3: Post = createMock();

const posts: Post[] = [post_1, post_2, post_3];

export default posts;