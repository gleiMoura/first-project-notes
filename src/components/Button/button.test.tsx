import { render, screen } from "@testing-library/react"
import Button from ".";

describe('<Button />', () => {
    it("Should render the button with text 'Load more'", () => {
        render(<Button text="Load more" />);

        const button = screen.getByRole('button', { name: /load more/i })

        expect(button).toBeInTheDocument();
    })
})