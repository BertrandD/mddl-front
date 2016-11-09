import React, { Component, PropTypes } from 'react';

class BaseCreation extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleSubmit(e) {
        e.preventDefault();

        const baseName = this.refs.baseName.value;
        const player = this.props.player.id;

        this.props.onSubmit({baseName, player});
    }

    render() {
        return (
            <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="auth__inputs">
                    <label for="baseName">Base name :&nbsp;
                        <input type="text" name="baseName" ref="baseName" placeholder="Base name" autofocus="true" required/>
                    </label>
                </div>
                <button type="submit">
                    Create base
                </button>
            </form>
        )
    }
}

BaseCreation.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
};

export default BaseCreation;
