import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Requirements from '../../../core/components/Requirements'

class ModuleFactory extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { building, sItems, sBuildings, actions, strings } = this.props;


        return (
            <div>
                <h3>
                    { strings.modules.available }
                </h3>

                {building.unlockModules[building.currentLevel] && building.unlockModules[building.currentLevel].map((module) => (
                    <div key={module} className="margin-bottom-inner Block">
                        <span className="color-yellow">
                            {sItems[module].name}
                        </span>
                        &nbsp;
                        <button className="float-right button--primary" onClick={actions.createModule.bind(null, module)}>
                            { strings.modules.create }
                        </button>

                        <div>
                            { strings.requirements.word }

                            <Requirements strings={strings} requirements={[sItems[module].requirement]} level={0} sItems={sItems} sBuildings={sBuildings} />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

ModuleFactory.propTypes = {
    building: PropTypes.object.isRequired
};

import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state, ownProps) {
    return { sItems: getStaticItems(state), sBuildings: getStaticBuildings(state), strings: getStrings(state) };
}

import { createModule } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createModule }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFactory);