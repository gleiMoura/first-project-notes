import './styles.css';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import { AppState } from '../../interface';
import { loadPosts } from '../../utils/load-posts';
import { ChangeEventHandler, Component, ReactNode } from 'react';
class Home extends Component {
  state: AppState = {
    searchValue: "",
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
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
  };

  handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  }

  render(): ReactNode {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;


    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className='container'>
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}

        <input
          onChange={this.handleChange}
          value={searchValue}
          type="search"
          style={{
            padding: "10px",
            borderRadius: "5px"
          }}
        /> <br /><br />

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (<><h1>There is no Post to this search</h1> <br /></>)}

        <Button
          text={"Load more posts"}
          onClick={this.loadMorePosts}
          disabled={noMorePosts || !!searchValue}
        />
      </section>
    )
  }
}

export default Home;
