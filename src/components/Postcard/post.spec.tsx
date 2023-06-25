import { render, screen } from "@testing-library/react"
import { PostCard } from ".";
import mock from "./mock";

describe("<PostCard />", () => {
    it('Should render post card correctly', () => {
        render(<PostCard post={mock} />);

        expect(screen.getByRole('img', { name: mock.title }))
            .toHaveAttribute('src', mock.cover);
        expect(screen.getByText(mock.body))
            .toBeInTheDocument();
        expect(screen.getByText(mock.title))
            .toBeInTheDocument();
    });

    it('Should match snapshot', () => {
        const { container } = render(<PostCard post={mock} />);
        expect(container.firstChild).toMatchSnapshot();
    })
})