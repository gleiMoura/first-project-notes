import './styles.css';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import { Post } from '../../interface';
import { loadPosts } from '../../utils/load-posts';
import { ChangeEventHandler, useEffect, useState } from 'react';
import Search from '../../components/Search';

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const postsPerPage = 10;
  const noMorePosts = page + postsPerPage >= allPosts.length;

  useEffect(() => {
    const init = async () => {
      const postsAndPhotos = await loadPosts()
      setPosts(postsAndPhotos.slice(0, 10))
      setAllPosts(postsAndPhotos);
    };
    init();
  }, []);

  const loadMorePosts: VoidFunction = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage)
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const filteredPosts = !!searchValue ? allPosts.filter((post: Post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  }) : posts;

  return (
    <section className='container'>
      {!!searchValue && (
        <h1>Search Value: {searchValue}</h1>
      )}

      <Search handleChange={handleChange} searchValue={searchValue} />
      <br /><br />

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (<><h1>There is no Post to this search</h1> <br /></>)}

      <Button
        text={"Load more posts"}
        onClick={loadMorePosts}
        disabled={noMorePosts || !!searchValue}
      />
    </section>
  )
}

export default Home;
