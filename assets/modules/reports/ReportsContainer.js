import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import Date from '../core/components/Date'

class ReportsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderSpyReport(report) {
        return (
            <tr key={report.id}>
                <td><Date timestamp={report.date}/></td>
                <td>{report.type}</td>
                <td>{report.baseSrc.name}</td>
                <td>{report.baseTarget.name} ({report.baseTarget.owner.name})</td>
                <td>
                    {map(report.entries, (entry, key) => (
                        <div>
                            {key} :
                            <ul>
                                {entry.map((e) => (
                                    <li>
                                        {e.name} : {e.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </td>
            </tr>
        )
    }

    renderPlanetScanReport(report) {
        return (
            <tr key={report.id}>
                <td><Date timestamp={report.date}/></td>
                <td>{report.type}</td>
                <td>{report.baseSrc.name}</td>
                <td>{report.planet.name}</td>
                <td>
                    {map(report.entries, (entry, key) => (
                        <div>
                            {key} :
                            <ul>
                                {entry.map((e) => (
                                    <li>
                                        {e.name} : {e.value.owner.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </td>
            </tr>
        )
    }

    render() {
        const { reports } = this.props;

        return (
            <div className="Block">
                <div className="BlockTitle">
                    Reports
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th colSpan="5">Reports</th>
                    </tr>
                    </thead>
                    <tbody>
                    {map(sortBy(reports, (o) => -o.date), (report) => {
                        switch (report.type) {
                            case "SPY_BASE":
                                return this.renderSpyReport(report);
                            case "PLANET_SCAN":
                                return this.renderPlanetScanReport(report);
                        }
                    })}
                    </tbody>
                </table>
            </div>
        );

    }
}

import { getReports } from 'reducers/reportReducer'

function mapStateToProps(state) {
    return { reports: getReports(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);

