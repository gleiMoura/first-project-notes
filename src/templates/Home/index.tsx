import './styles.css';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import { AppState } from '../../interface';
import { loadPosts } from '../../utils/load-posts';
import { Component, ReactNode } from 'react';
class Home extends Component {
  state: AppState = {
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10
  };

  async componentDidMount(): Promise<void> {
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(0, 10),
      allPosts: postsAndPhotos
    });
  };

  loadMorePosts: VoidFunction = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  render(): ReactNode {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    return (
      <section className='container'>
        <Posts posts={posts} />
        <Button
          text={"Load more posts"}
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
        />
      </section>
    )
  }
}

export default Home;
