import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Home from ".";

import createMock from "../../components/Postcard/mock";

const post1 = createMock();
const post2 = createMock();
const post3 = createMock();

(global.fetch as any) = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([post1, post2, post3])
}));

describe('<Home />', () => {
  it('Should render search, posts and load more button', async () => {
    render(<Home postsPerPage={3} />);
    const noMorePosts = screen.getByText('There is no Post to this search');

    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('Should search for posts', async () => {
    render(<Home postsPerPage={3} />);
    const noMorePosts = screen.getByText('There is no Post to this search');

    expect.assertions(9)

    await waitForElementToBeRemoved(noMorePosts);
    const inputElement: HTMLInputElement = screen.getByPlaceholderText(/type your search/i);

    //Look for post 1 title and only it should be in the document
    fireEvent.change(inputElement, { target: { value: post1.title } });
    expect(screen.getByRole('heading', { name: post1.title })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: post2.title })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: post3.title })).not.toBeInTheDocument();

    //clean the search and everything should be in the document
    fireEvent.change(inputElement, { target: { value: "" } });
    expect(screen.getByRole('heading', { name: post1.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: post2.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: post3.title })).toBeInTheDocument();

    //write something that does not exist and nothing should be in the document
    fireEvent.change(inputElement, { target: { value: "duedue" } });
    expect(screen.queryByRole('heading', { name: post1.title })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: post2.title })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: post3.title })).not.toBeInTheDocument();
  });

  it('Should load more posts by button', async () => {
    render(<Home postsPerPage={2} />);
    const noMorePosts = screen.getByText('There is no Post to this search');

    expect.assertions(4);

    await waitForElementToBeRemoved(noMorePosts);
    const images: HTMLElement[] = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const afterImages: HTMLElement[] = screen.getAllByRole('img');
    expect(afterImages).toHaveLength(3);
    expect(button).toBeDisabled();
  });
});
