import './styles.css';
import Posts from '../../components/Posts';
import { AppState } from '../../interface';
import { loadPosts } from '../../utils/load-posts';
import { Component, ReactNode } from 'react';


class Home extends Component {
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

export default Home;
