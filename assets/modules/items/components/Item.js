import React, { Component, PropTypes } from 'react';
import './item.scss'

class Item extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        if (item == undefined) {
            return (
                <div>
                    <div className="Item ItemEmpty">

                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="Item">
                    {item.name}
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    item: PropTypes.object
};

export default Item;
