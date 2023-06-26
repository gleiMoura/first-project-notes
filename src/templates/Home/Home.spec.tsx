import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Home from ".";
import { rest } from "msw";
import { setupServer } from "msw/node"

import createMock from "../../components/Postcard/mock";

const post1 = createMock();
const post2 = createMock();
const post3 = createMock();

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(ctx.json([post1, post2, post3]));
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(ctx.json([{ url: post1.cover }, { url: post2.cover }, { url: post3.cover }]));
  }),

];

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  })

  it('Should render search, posts and load more button', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There is no Post to this search');

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug()
  });
});
