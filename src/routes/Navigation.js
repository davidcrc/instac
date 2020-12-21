import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

export default function Navigation() {
    return (
        <Router>
            <Switch>
                {/* Bucle que mapea nuestras routes
                en cada iteracion tomamos 1 route y su index */}
                {map(routes, (route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) =>  (
                            <route.layout>
                                <route.component {...props} />

                            </route.layout>
                        ) }
                    />
                ))}
            </Switch>
        </Router>
    )
}
