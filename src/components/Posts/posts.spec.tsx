import { render } from "@testing-library/react"
import posts from "./mock";
import Posts from ".";
import { Post } from "../../interface";
import { screen } from "@testing-library/react";

describe("<Posts />", () => {
    it("Should render Posts", () => {
        render(<Posts posts={posts} />);

        posts.forEach((item: Post) => {
            expect(screen.getByText(item.title));
            expect(screen.getByText(item.body));
            expect(screen.getByRole('img', { name: item.title })).toHaveAttribute('src', item.cover)
        })
    })
})