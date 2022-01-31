import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

export default class App extends Component {
    state = {
        manager: "",
        players: [],
        balance: "",
        value: "",
        message: "",
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({
            manager,
            players,
            balance,
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success... ⏳" });

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, "ether"),
        });

        this.setState({ message: "You have been entered! 🥳" });
    };

    onClick = async () => {
        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: "Waiting on transaction success... ⏳",
        });

        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });

        this.setState({ message: "A winner has been picked! 🎉" });
    };

    render() {
        return (
            <div className="App">
                <div className="div-1">
                    <h2>Lottery Contract 🤑</h2>

                    <p>
                        This contract is managed by <b>{this.state.manager}</b>
                        .<br /> There are currently {
                            this.state.players.length
                        }{" "}
                        people entered.
                        <br /> Competing to win{" "}
                        <b>
                            {web3.utils.fromWei(this.state.balance, "ether")}{" "}
                            ether
                        </b>
                        !
                    </p>
                </div>

                <hr />

                <form onSubmit={this.onSubmit}>
                    <h3>Want to try your luck?</h3>

                    <div className="small-div">
                        <label>Amount of ether to enter</label>
                        <div>
                            <input
                                value={this.state.value}
                                onChange={(e) =>
                                    this.setState({ value: e.target.value })
                                }
                            />
                            <button className="small-button">Add</button>
                        </div>
                    </div>
                </form>

                <hr />

                <div className="div-2">
                    <h3 className="h3">Ready to pick a winner?</h3>
                    <button className="big-button" onClick={this.onClick}>
                        Pick a winner!
                    </button>

                    {/* <hr /> */}
                </div>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}
