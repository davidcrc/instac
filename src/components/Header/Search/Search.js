import React, { useEffect, useState } from 'react'
import { Image, Search as SearchSUi } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/user";
import ImageNotFound from "../../../assets/avatar.png"
import "./Search.scss"

export default function Search() {

    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([])
    // console.log(search)
    const {data, loading} = useQuery(SEARCH, {
        variables: { search }
    })

    // console.log(data);
    // console.log(results)
    // Cambiara la vista solo si la variable data es modificada con nuevos datos
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

    // Mira el cambio dentro del input
    const onChange = (e) => {
        if(e.target.value)
            setSearch(e.target.value)
        else
            setSearch(null)
    }

    // Borra los datos de buscados en el input
    const handleResultSelect = () => {
        setSearch(null)
        setResults([]);
    }

    return (
        <SearchSUi 
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            loading={loading}
            value={search || ""}
            onSearchChange={ onChange }
            onResultSelect={handleResultSelect}
            results={results}
            resultRenderer={(e) => <ResulSearch data={e} /> }
        />
    )
}


function ResulSearch(props) {
    const { data } = props

    return (
        <Link className="search-users__item" to={`/${data.username}`} >
            <Image src={data.avatar || ImageNotFound} />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}