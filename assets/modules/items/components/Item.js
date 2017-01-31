import React, { Component, PropTypes } from 'react';
import './item.scss'
import Tooltip from '../../core/components/Tooltip/Tooltip'

class Item extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {

        const { item } = this.props;

        if (item == undefined) {
            return (
                <div className="Item ItemEmpty">

                </div>
            )
        }
        return (
            <Tooltip text={item.name}>
                <div className="Item">
                    {item.name}
                </div>
            </Tooltip>
        )
    }
}

Item.propTypes = {
    item: PropTypes.object
};

export default Item;
