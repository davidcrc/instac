import React from 'react'
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import "./Publications.scss"

export default function Publications(props) {
    const { getPublications } = props;
    console.log(getPublications)
    return (
        <div className="publications" >
            <h1>Publicaciones</h1>
            <Grid>
                {map(getPublications, (publication, index) => (
                    <Grid.Column key={index}>{publication.id}</Grid.Column>
                ) )}
            </Grid>
        </div>
    )
}
