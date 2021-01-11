import React, { useEffect, useState } from 'react'
import { Search as SearchSUi } from "semantic-ui-react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import "./Search.scss"

export default function Search() {

    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([])
    // console.log(search)
    const {data, loading} = useQuery(SEARCH, {
        variables: { search }
    })

    // console.log(data);
    console.log(results)
    useEffect(() => {
        if(size(data?.search) > 0 ) {
            const users = []

            data.search.forEach((user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                });
            });

            setResults(users)
        }
        else {
            setResults([])
        }
    }, [data])

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
            loading={loading}
            value={search || ""}
            onSearchChange={ onChange }
            results={results}
            resultRenderer={(e) => <ResulSearch data={e} /> }
        />
    )
}


function ResulSearch(props) {
    const { data } = props

    return (
        <div>
            <h2>{data.title}</h2>
            <h3>{data.username}</h3>
        </div>
    )
}