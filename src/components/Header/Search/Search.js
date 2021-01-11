import React, { useState } from 'react'
import { Search as SearchSUi } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import "./Search.scss"

export default function Search() {

    const [search, setSearch] = useState(null);
    // console.log(search)
    const {data, loading} = useQuery(SEARCH, {
        variables: { search }
    })

    // console.log(data);

    const onChange = (e) => {
        if(e.target.value)
            setSearch(e.target.value)
        else
            setSearch(null)
    }

    return (
        <SearchSUi 
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            onSearchChange={ onChange }
        />
    )
}
