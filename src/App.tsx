import './App.css';
//components
import Posts from './components/posts';
import { Component, ReactNode } from 'react';
//interfaces
import { AppState } from './interface';
//utils
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
        <Posts posts={posts} />
      </section>
    )
  }
}

export default App
