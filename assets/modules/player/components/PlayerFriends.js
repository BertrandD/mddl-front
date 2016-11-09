import React, { Component, PropTypes } from 'react';
import map from 'lodash/map'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

class PlayerFriends extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { player } = this.props;

        // Filter players to remove me and friends et pendind requests
        const players = filter(this.props.players, p => p.id !== player.id  // Me
                                                    && !player.friendRequests.some(req => req.requester.id === p.id || req.requested.id === p.id) // pending requests
                                                    && !player.friends.some(friend => friend.id === p.id)); // friends

        return (
            <div>

                <h2>Mes amis :</h2>
                <ul>
                    {player.friends.length > 0 && player.friends.map(friend => (
                        <li key={friend.id}>
                            {friend.name}
                        </li>
                    )) || (<li>Aucun ami</li>)}
                </ul>

                <h2>Demandes en attente :</h2>
                <ul>
                    {player.friendRequests.length > 0 && player.friendRequests.map(request => (
                        <li key={request.id}>
                            {request.requester.id === player.id && (
                                <span>
                                    {request.requested.name} - en attente de sa réponse
                                </span>
                            ) || (
                                <span>
                                    {request.requester.name} - <span className="cursor-pointer" onClick={this.props.onAcceptFriend.bind(null, request)}>Accepter</span>
                                </span>
                            )}  
                        </li>
                    )) || (<li>Aucune demande en attente</li>)}
                </ul>

                <h2>Les autres joueurs :</h2>
                <ul>
                    {!isEmpty(players) && map(players, player => (
                        <li key={player.id}>
                            {player.name} - <span className="cursor-pointer" onClick={this.props.onRequestFriend.bind(null, player, 'Hi, could you accept me ?')}>Demander en ami</span>
                        </li>
                    )) || (<li>Aucun autre joueur :/</li>)}
                </ul>
            </div>
        )
    }
}

PlayerFriends.propTypes = {
    player: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    onAcceptFriend: PropTypes.func.isRequired,
    onRequestFriend: PropTypes.func.isRequired
};

export default PlayerFriends;
