import React, { Children } from 'react'
import { Container } from "semantic-ui-react";

export default function LayoutBasic(props) {
    // console.log(props);
    const {children} = props

    return (
        <>
            <h1>Header Layout</h1>
            <Container className="layout-basic" >
                {children}
            </Container>
        </>
    )
}

