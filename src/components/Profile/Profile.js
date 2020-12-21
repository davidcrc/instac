import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import "./Profile.scss"

export default function Profile(props) {
    const {username} = props;
    // const result = useQuery(GET_USER , {
    const {data, loading, error } = useQuery(GET_USER , {
        variables: { username }
    })
    
    if(loading) return null;
    if(error) return <h1>Usuario no encontrado</h1>;
    
    const {getUser} = data;
    
    
    console.log(getUser)
    
    return (
        <div>
            <h1>Profile... {getUser.name}</h1>
        </div>
    )
}
