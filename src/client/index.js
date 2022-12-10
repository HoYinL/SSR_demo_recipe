import React from "react";
import * as ReactDOM from 'react-dom/client';
import store from "../common/store";
import { Provider } from 'react-redux';
import Router from "../common/route/Route";
import { BrowserRouter } from "react-router-dom";
import theme from "../common/breakpoint";
import { MuiThemeProvider } from "@material-ui/core/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(   
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
)

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept('../common/route/Route', function(){
        root.render(   
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        )
    });
}
    