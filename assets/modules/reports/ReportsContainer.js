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
                        <th>Date</th>
                        <th>Base source</th>
                        <th>Base target</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {map(sortBy(reports, (o) => -o.date), (report, reportId) => (
                        <tr key={reportId}>
                            <td><Date timestamp={report.date}/></td>
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
                    ))}
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

