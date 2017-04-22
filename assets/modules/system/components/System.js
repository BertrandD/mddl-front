import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import './system.scss'
import PlanetPattern from "./PlanetPattern";

class System extends Component {

    constructor(props, context) {
        super(props, context);
        const transform = d3.zoomIdentity.translate(0, 0).scale(1);

        this.state = {transform};
        this.handleMouseover = this.handleMouseover.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        // this.paint()
    }

    drawOrbit(g, center, satellite) {

        if (this.displayOrbit) {
            const arc = d3.arc()
                .innerRadius(satellite.orbit*5-0.05)
                .outerRadius(satellite.orbit*5+0.05)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            g.append("path")
                .attr("fill", "#abafaa")
                .attr("d", arc)
                .attr("transform", "translate("+center.x+","+center.y+")");
        }

        const x = center.x+Math.cos(satellite.angle)*satellite.orbit*5;
        const y = center.y+Math.sin(satellite.angle)*satellite.orbit*5;
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
            .attr("id", obj.id)
            .attr("class", "planet")
            .attr("data-size", obj.size)
            .attr("fill", obj.type === 'Planet' ? 'url(#planet)' : (color || '#404040'))
            .attr("r", "60")
            .attr("cx", "60")
            .attr("cy", "60")
            .attr("transform", " scale("+obj.size/5+") translate(-60,-60)");

        //
        // node.append("circle")
        //     // .attr("cx", obj.x)
        //     // .attr("cy", obj.y)
        //     .attr("id", obj.id)
        //     .attr("fill", color || 'black')
        //     .attr("r", obj.size);


        node.append("text")
            .attr("dy", ".35em")
            .attr("fill", "#abafaa")
            .text(obj.name)
            .attr("font-size", function() {
                return Math.min(2 * obj.size*5, (obj.size) / this.getComputedTextLength() * 128) + "px"; });

        if (obj.satellites) {
            obj.satellites.forEach((s) => {
                this.drawOrbit(g, obj, s);
            })
        }
    }


    handleClick(g, centerX, centerY) {
        // const d = d3.event.target;

        const mouseX = d3.event.clientX // TODO use target center instead of mouse position
        const mouseY = d3.event.clientY

        // const size = d3.select(d).attr("data-size")

        // const scale = 5/size
        // console.log("zer",scale - currentTransform.k + 1);
        // const moveX = currentTransform.x - (scale-currentTransform.k+1) * mouseX
        // const moveY = currentTransform.y - (scale-currentTransform.k+1) * mouseY
        const moveX = this.currentTransform.x - mouseX
        const moveY = this.currentTransform.y - mouseY

        g.transition()
            .duration(500)
            .call(this.zoom.transform, d3.zoomIdentity.translate(moveX,moveY).scale(this.currentTransform.k))
    }

    toggleDisplayOrbit() {
        this.displayOrbit = !this.displayOrbit
        this.paint()
    }

    init() {
        this.zoom = d3.zoom().scaleExtent([1, 100]).on("zoom", this.zoomed.bind(this))

        this.svg = d3.select(ReactDOM.findDOMNode(this))
            .select("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .call(this.zoom);

        this.g = this.svg.select("g");
        this.defs = this.svg.select("defs");
        this.centerX = this.svg.style("width").replace("px", "") / 2;
        this.centerY = this.svg.style("height").replace("px", "") / 2;

        this.currentTransform = {
            x: this.centerX,
            y: this.centerY,
            k: 1
        }
        this.g.attr("transform", this.state.transform);
        this.paint()
        this.displayOrbit = false;
    }

    paint() {
        this.g.selectAll("*").remove();
        this.defs.selectAll("*").remove();

        this.drawObject(this.g, {...this.props.star, x:this.centerX, y:this.centerY}, 'yellow');

        this.g.selectAll("circle").on("mouseover", this.handleMouseover);
        this.g.selectAll("circle").on("click", this.handleClick.bind(this, this.svg, this.centerX, this.centerY));

    }

    zoomed() {
        const transform = d3.event.transform;
        this.currentTransform.x = this.centerX + d3.event.transform.x
        this.currentTransform.y = this.centerY + d3.event.transform.y
        this.currentTransform.k = d3.event.transform.k
        this.g.attr("transform", transform);
        // this.setState({transform});
    }

    handleMouseover() {
        this.props.onOverObject(d3.event.target.id);
    }


    render() {
        return <div className="System"><button onClick={this.toggleDisplayOrbit.bind(this)}>Toggle display orbits</button><svg><g /></svg><PlanetPattern /></div>;
    }
}

System.propTypes = {
    star: PropTypes.object.isRequired,
    onOverObject: PropTypes.func.isRequired
};

export default System;

