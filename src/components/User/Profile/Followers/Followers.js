import React, { useEffect } from 'react'
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow"
import "./Followers.scss"

export default function Followers(props) {

    const {username} = props;
    const {
        data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers
    } = useQuery(GET_FOLLOWERS, {
        variables: {
            username
        }
    });

    useEffect(() => {
        startPollingFollowers(3000)

        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, startPollingFollowers])


    if(loadingFollowers ) return null;
    const { getFollowers } = dataFollowers
    // console.log(getFollowers)

    return (
        <div className="followers" >
            <p>
                <span>**</span> publics
            </p>
            <p className="link" ><span> {size(getFollowers)} </span> segudiores</p>
            <p className="link" ><span>*</span> seguidos</p>
        </div>
    )
}
