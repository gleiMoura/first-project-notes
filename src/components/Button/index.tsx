import { Component, ReactNode } from "react";
import { MouseEventHandler } from "react";
import "./styles.css";

interface ButtonProps {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    disabled: boolean
}

class Button extends Component<ButtonProps> {
    render(): ReactNode {
        const { text, onClick, disabled } = this.props;
        return (
            <button className="button" onClick={onClick} disabled={disabled}>
                {text}
            </button>
        )
    }
};

export default Button;
