import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import Date from '../core/components/Date'
import size from 'lodash/size'
import './report.scss'

class ReportsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderSpyReport(report) {
        return (
            <div className="Report" key={report.id}>
                <div className="ReportHeader">
                    <div>
                        Spy report of <span className="text-bold">{report.baseTarget.name}</span> ({report.baseTarget.owner.name}) from <span className="text-bold">{report.baseSrc.name}</span><br/>
                    </div>
                    <div className="ReportDate">
                        <Date timestamp={report.date}/><br/>
                    </div>
                </div>
                <div className="ReportBody">
                    {size(report.entries) > 0 && map(report.entries, (entry, key) => (
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
                    )) || (
                        <div>
                            No entries in spy report
                        </div>
                    )}
                </div>
            </div>
        )
    }

    renderPlanetScanReport(report) {
        console.log(report);
        return (
        <div className="Report" key={report.id}>
            <div className="ReportHeader">
                <div>
                    Scan report of <span className="text-bold">{report.planet.name}</span> from <span className="text-bold">{report.baseSrc.name}</span><br/>
                </div>
                <div className="ReportDate">
                    <Date timestamp={report.date}/><br/>
                </div>
            </div>
            <div className="ReportBody">
                {size(report.entries) > 0 && map(report.entries, (entry, key) => (
                    <div>
                        {key} :
                        <ul>
                            {entry.map((e) => (
                                <li key={e.name}>
                                    {e.name} ({e.value.owner.name})
                                </li>
                            ))}
                        </ul>
                    </div>
                )) || (
                    <div>
                        No entries in spy report
                    </div>
                )}
            </div>
        </div>
        )
    }

    render() {
        const { reports } = this.props;

        return (
            <div className="Block">
                <div className="BlockTitle">
                    Reports
                </div>
                {map(sortBy(reports, (o) => -o.date), (report) => {
                    switch (report.type) {
                        case "SPY_BASE":
                            return this.renderSpyReport(report);
                        case "PLANET_SCAN":
                            return this.renderPlanetScanReport(report);
                    }
                })}
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

