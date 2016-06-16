import React, { Component, PropTypes } from 'react';

class Duration extends Component {

    toHHMMSS (milliseconds) {
        const sec_num = parseInt(milliseconds, 10) / 1000; // don't forget the second param
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        let str = "";

        if (hours > 0) {
            //if (hours   < 10) {hours   = "0"+hours;}
            str += hours+" h ";
        }
        if (minutes > 0 ) {
            //if (minutes < 10) {minutes = "0"+minutes;}
            str += minutes+" min ";
        }
        if (seconds > 0) {
            //if (seconds < 10) {seconds = "0"+seconds;}
            str += seconds+" sec ";
        }

        return str;
    }

    render() {
        const { milliseconds } = this.props;

        return (<span>{this.toHHMMSS(milliseconds)}</span>);
    }
}

Duration.propTypes = {
    milliseconds: PropTypes.number.isRequired
};

export default Duration;
