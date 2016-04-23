import React, { Component, PropTypes } from 'react';

class PlayerCreation extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleSubmit(e) {
        e.preventDefault();

        const playerName = this.refs.playerName.value;

        this.props.onSubmit({playerName});
    }

    render() {
        return (
            <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="auth__inputs">
                    <label for="playerName">Player name :&nbsp;
                        <input type="text" name="playerName" ref="playerName" placeholder="Player name" autofocus="true" required/>
                    </label>
                </div>
                <button type="submit">
                    Create player
                </button>
            </form>
        )
    }
}

PlayerCreation.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default PlayerCreation;
