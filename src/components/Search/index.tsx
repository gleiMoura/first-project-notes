import { ChangeEventHandler } from "react";

interface SearchProps {
    handleChange: ChangeEventHandler<HTMLInputElement>,
    searchValue: string
}

const Search = ({ handleChange, searchValue }: SearchProps) => {
    return (
        <input
            onChange={handleChange}
            value={searchValue}
            type="search"
            style={{
                padding: "10px",
                borderRadius: "5px"
            }}
        />
    )
};

export default Search;