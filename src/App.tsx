import './App.css';
import { Component, ReactNode } from 'react';
import { PostCard } from './components/Postcard';
import { AppState } from './interface';
import { loadPosts } from './utils/load-posts';

class App extends Component {
  state: AppState = {
    counter: 0,
    posts: []
  };

  //function of life cycle when component is starting its life
  async componentDidMount(): Promise<void> {
    const posts = await loadPosts()
    this.setState({ posts });
  };

  render(): ReactNode {
    const { posts } = this.state;

    return (
      <section className='container'>
        <div className='posts'>
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
