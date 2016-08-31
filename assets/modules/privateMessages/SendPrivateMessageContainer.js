import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import map from 'lodash/map'
import filter from 'lodash/filter'
import "./PrivateMessage.scss"

class SendPrivateMessageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleSubmit(e) {
        e.preventDefault();

        const message = this.refs.message.value;
        const receiver = this.refs.receiver.value;

        this.props.actions.sendMessage(this.props.players[receiver], message);
    }

    render() {
        const { player } = this.props;

        const players = filter(this.props.players, p => p.id !== player.id);  // Me

        return (
            <div className="Block SendPrivateMessage">
                <h1>Envoyer un message</h1>
                <form onSubmit={this.handleSubmit.bind(this)} className="form">
                    <label for="receiver">Destinataire :</label>
                    <select name="receiver" id="receiver" ref="receiver">
                        {map(players, (player, id) => (
                            <option value={player.id} key={id}>
                                {player.name}
                            </option>
                        ))}
                    </select>

                    <label for="message">Message : </label>
                    <textarea name="message" id="message" ref="message" cols="30" rows="10">
                    </textarea>

                    <div className="form-buttons">
                        <Link to="/messenger"><button type="button" className="button--ghost-default">Annuler</button></Link>
                        <button type="submit" className="button--primary">Envoyer</button>
                    </div>
                </form>
            </div>
        );
    }
}

import { getAllPlayers, getcurrentPlayer } from '../player/reducers/playerReducer'

function mapStateToProps(state) {
    return { players: getAllPlayers(state), player: getcurrentPlayer(state) };
}

import { sendMessage } from './actions/privateMessagesActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ sendMessage }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SendPrivateMessageContainer);

