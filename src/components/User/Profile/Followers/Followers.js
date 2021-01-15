import React from 'react'
import "./Followers.scss"

export default function Followers(props) {

    const {username} = props;

    return (
        <div className="followers" >
            <p>
                <span>**</span> publics
            </p>
            <p className="link" ><span>**</span> segudiores</p>
            <p className="link" ><span>*</span> seguidos</p>
        </div>
    )
}
