export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string,
    cover?: string
};

export interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
};

export interface AppState {
    posts: Post[],
    allPosts: Post[],
    page: number,
    postsPerPage: number,  
    counter: number
};