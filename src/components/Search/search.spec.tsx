import { fireEvent, render, screen } from "@testing-library/react";
import Search from ".";
import { faker } from "@faker-js/faker";

describe('<Seach />', () => {
    it('Should have a seachValue', () => {
        const fn = jest.fn;
        render(<Search searchValue="testing..." handleChange={fn} />)

        const imput: HTMLInputElement = screen.getByPlaceholderText(/type your search/i)

        expect(imput.value).toBe(`testing...`)
    });

    it('Should call handleChange with number of times equal to the number of letters in text', () => {
        const fn = jest.fn();
        render(<Search handleChange={fn} />)

        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/type your search/i);

        const text = faker.lorem.word();
        for (let i = 0; i < text.length; i++) {
            fireEvent.change(inputElement, { target: { value: inputElement.value + text[i] } });
        }

        expect(fn).toHaveBeenCalledTimes(text.length);
        expect(inputElement.value).toBe(text);
    });
})