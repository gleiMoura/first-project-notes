import { Photo, Post } from "../interface";


export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postResponse, photoResponse]);

    const postsJson: Post[] = await posts.json();
    const photosJson: Photo[] = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
        return {
            ...post, cover: photosJson[index].url
        }
    });

    return postsAndPhotos;
}