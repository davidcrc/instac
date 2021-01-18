import React, { useEffect, useState } from 'react'
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow"
import ModalBasic from "../../../Modal/ModalBasic";
import "./Followers.scss"

export default function Followers(props) {

    const {username} = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

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

    const openFollowers = () => {
        setTitleModal("seguidores");
        setChildrenModal(<div><h3>Lista de segudiores</h3></div>)
        setShowModal(true);
    }

    if(loadingFollowers ) return null;
    const { getFollowers } = dataFollowers
    // console.log(getFollowers)

    return (
        <>
            <div className="followers" >
                <p>
                    <span>**</span> publics
                </p>
                <p className="link" onClick={openFollowers} >
                    <span> {size(getFollowers)} </span> 
                    segudiores
                </p>
                <p className="link" ><span>*</span> seguidos</p>
            </div>

            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}
