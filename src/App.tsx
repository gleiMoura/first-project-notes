import './App.css';
import { Component, ReactNode } from 'react';
import { PostCard } from './components/Postcard';
import { AppState, Post, Photo } from './interface';

class App extends Component {
  state: AppState = {
    counter: 0,
    posts: []
  };

  //function of life cycle when component is starting its life
  componentDidMount(): void {
    this.loadPosts();
  };

  loadPosts = async () => {
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

    this.setState({ posts: postsAndPhotos });
  }

  render(): ReactNode {
    const { posts, counter } = this.state;

    return (
      <section className='container'>
        <div className='posts'>
          <p>{counter}</p>
          {posts.map((post, _) => {
            return (
              <PostCard post={post} key={post.id} />
            )
          })}
        </div>
      </section>
    )
  }
}

export default App
