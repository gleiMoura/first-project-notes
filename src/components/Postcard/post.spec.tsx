import { render, screen } from "@testing-library/react"
import { PostCard } from ".";
import createMock from "./mock";

describe("<PostCard />", () => {
    it('Should render post card correctly', () => {
        const mock = createMock();
        render(<PostCard post={mock} />);

        expect(screen.getByRole('img', { name: mock.title }))
            .toHaveAttribute('src', mock.cover);
        expect(screen.getByText(mock.body))
            .toBeInTheDocument();
        expect(screen.getByText(mock.title))
            .toBeInTheDocument();
    });
})