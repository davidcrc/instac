import React from 'react'
import useAuth from "../../hooks/useAuth";

export default function Home() {
    const auth = useAuth();

    console.log(auth)
    return (
        <div>
            <div>
                <h1>Estamos en la Home logueados</h1>
            </div>
        </div>
    )
}
