import React, { Component, PropTypes } from 'react';
import map from 'lodash/map'

class PlayerFriends extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { player, players } = this.props;

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
                            {friend.requester.id === player.id && (
                                <span>
                                    {request.requested.name} - en attente de sa réponse
                                </span>
                            ) || (
                                <span>
                                    {request.requester.name} - <span className="cursor-pointer" onClick={this.acceptFriend.bind(null, request)}>Accepter</span>
                                </span>
                            )}  
                        </li>
                    )) || (<li>Aucune demande en attente</li>)}
                </ul>


                <h2>Les autres joueurs :</h2>
                <ul>
                    {map(players, player => (
                        <li key={player.id}>
                            {player.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

PlayerFriends.propTypes = {
    player: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    acceptFriend: PropTypes.func.isRequired
};

export default PlayerFriends;
