import { MouseEventHandler } from "react";
import "./styles.css";

interface ButtonProps {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    disabled: boolean
}

const Button = ({ text, onClick, disabled }: ButtonProps) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
};

export default Button;
