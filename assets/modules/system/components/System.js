import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import './system.scss'

class System extends Component {

    constructor(props, context) {
        super(props, context);
        const transform = d3.zoomIdentity.translate(0, 0).scale(1);

        this.state = {transform};
        this.handleMoseover = this.handleMoseover.bind(this);
    }

    componentDidMount() {
        this.paint();
    }

    componentDidUpdate() {
        // this.paint()
    }

    drawOrbit(g, center, satellite) {
        const arc = d3.arc()
            .innerRadius(satellite.orbit-0.08)
            .outerRadius(satellite.orbit+0.08)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        g.append("path")
            .attr("fill", "#abafaa")
            .attr("d", arc)
            .attr("transform", "translate("+center.x+","+center.y+")");

        const x = center.x+Math.cos(satellite.angle)*satellite.orbit;
        const y = center.y+Math.sin(satellite.angle)*satellite.orbit;
        const s = {
            ...satellite,
            x,
            y
        };
        this.drawObject(g, s);
    }

    drawObject(g, obj, color) {
        const node = g.append("g")
                .attr("transform", "translate("+obj.x+","+obj.y+")");
        node.append("circle")
            // .attr("cx", obj.x)
            // .attr("cy", obj.y)
            .attr("id", obj.id)
            .attr("fill", color || 'black')
            .attr("r", obj.size);
        node.append("text")
            .attr("dy", ".35em")
            .attr("fill", "#abafaa")
            .text(obj.name)
            .attr("font-size", function() {
                return Math.min(2 * obj.size, (obj.size) / this.getComputedTextLength() * 24) + "px"; });

        if (obj.satellites) {
            obj.satellites.forEach((s) => {
                this.drawOrbit(g, obj, s);
            })
        }
    }

    paint() {

        const svg = d3.select(ReactDOM.findDOMNode(this))
            .attr("width", "100%")
            .attr("height", "100%")
            .call(d3.zoom().scaleExtent([1, 30]).on("zoom", zoom.bind(this)));
        const g = svg.select("g");

        g.selectAll("*").remove();

        const centerX = svg.style("width").replace("px", "") / 2;
        const centerY = svg.style("height").replace("px", "") / 2;

        g.attr("transform", this.state.transform);

        this.drawObject(g, {...this.props.star, x:centerX, y:centerY}, 'yellow');

        g.selectAll("circle").on("mouseover", this.handleMoseover);

        function zoom() {
            const transform = d3.event.transform;
            g.attr("transform", transform);
            this.setState({transform});
        }
    }

    handleMoseover() {
        this.props.onOverObject(d3.event.target.id);
    }


    render() {
        return <svg><g /></svg>;
    }
}

System.propTypes = {
    star: PropTypes.object.isRequired,
    onOverObject: PropTypes.func.isRequired
};

export default System;

