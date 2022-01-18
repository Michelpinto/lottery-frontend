import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";

export default class App extends Component {
    render() {
        web3.eth.getAccounts().then(console.log);

        return (
            <div className="App">
                <h1>Gm world 🦾</h1>
            </div>
        );
    }
}
