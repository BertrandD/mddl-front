import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class System extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            transform: {
                x:0,
                y:0,
                k:1
            }
        }
    }

    componentDidMount() {
        this.paint();
    }

    componentDidUpdate() {
        this.paint()
    }

    drawOrbit(context, center, satellite) {
        context.beginPath();
        context.arc(center.x, center.y, satellite.orbit, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.strokeStyle = '#abafaa';
        context.stroke();

        const x = center.x+Math.cos(satellite.angle)*satellite.orbit;
        const y = center.y+Math.sin(satellite.angle)*satellite.orbit;
        const s = {
            ...satellite,
            x,
            y
        };
        this.drawObject(context, s);
    }

    drawObject(context, obj, color) {
        context.beginPath();
        context.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI, false);
        context.fillStyle = color || 'black';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#000';
        context.stroke();
        // objects.push(obj);

        if (obj.satellites) {
            obj.satellites.forEach((s) => {
                this.drawOrbit(context, obj, s);
            })
        }
    }

    paint() {
        const width = 500;
        const height = 300;

        const canvas = d3.select(ReactDOM.findDOMNode(this))
            .attr("width", 500)
            .attr("height", 300)
            .call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom.bind(this)));
        const context = canvas.node().getContext("2d");

        context.clearRect(0, 0, context.width, context.height);

        const centerX = width / 2;
        const centerY = height / 2;

        context.translate(this.state.transform.x, this.state.transform.y);
        context.scale(this.state.transform.k, this.state.transform.k);

        this.drawObject(context, {...this.props.star, x:centerX, y:centerY}, 'yellow');


        function zoom() {
            const transform = d3.event.transform;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.translate(transform.x, transform.y);
            context.scale(transform.k, transform.k);
            this.setState({transform});
            this.drawObject(context, {...this.props.star, x:centerX, y:centerY}, 'yellow');
        }

    }


    render() {
        return <canvas />;
    }
}

System.propTypes = {
    star: PropTypes.object.isRequired
};

export default System;

