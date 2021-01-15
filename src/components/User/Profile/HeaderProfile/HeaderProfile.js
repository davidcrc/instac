import React from 'react'
import { Button } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { IS_FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss"

export default function HeaderProfile(props) {

    const { getUser, auth, handlerModal } = props
    const { data, loading } = useQuery(IS_FOLLOW, {
        variables: {
            username: getUser.username
        }
    });
    // console.log(data)
    const buttonFollow = () => {
        if(data.isFollow) {
            return <Button className="btn-danger" >
                Dejar de seguir
            </Button>
        }else {
            return <Button className="btn-action" >
                Seguir
            </Button>
        }
    }

    return (
        <div className="header-profile" >
            <h2>{getUser.username}</h2>
            {
                getUser.username === auth.username ? (
                    <Button onClick={() => handlerModal("settings")} >Ajustes</Button>
                ) : (
                    !loading && buttonFollow()

                )
            }
        </div>
    )
}
