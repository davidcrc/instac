import React from 'react'
import { Search as SearchSUi } from "semantic-ui-react";
import "./Search.scss"

export default function Search() {
    return (
        <SearchSUi 
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: "left" }}
        />
    )
}
