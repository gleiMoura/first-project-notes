import { fireEvent, render, screen } from "@testing-library/react"
import Button from ".";

describe('<Button />', () => {
    it("It should render the button with text 'Load more'", () => {
        render(<Button text="Load more" onClick={() => { }} disabled={false} />);

        const button = screen.getByRole('button', { name: /load more/i })

        expect(button).toBeInTheDocument();
    });

    it("It should call function on Button Click", () => {
        const fn = jest.fn();
        render(<Button text="Load More" onClick={fn} disabled={false} />);

        const button = screen.getByRole("button", { name: /load more/i });
        fireEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("It should be disabled when disabled is true", () => {
        render(<Button text="Load More" onClick={() => { }} disabled />);

        const button = screen.getByRole("button", { name: /load more/i });
        expect(button).toBeDisabled();
    });

    it("It should be enabled when disabled is false", () => {
        render(<Button text="Load More" onClick={() => { }} disabled={false} />);

        const button = screen.getByRole("button", { name: /load more/i });
        expect(button).toBeEnabled();
    });

    it("It should match snapshot", () => {
        const { container } = render(<Button text="Load More" onClick={() => { }} disabled={false} />);

        expect(container).toMatchSnapshot();
    });
})