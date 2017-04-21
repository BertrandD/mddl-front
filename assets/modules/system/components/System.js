import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import './system.scss'
let first = true;

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
            .innerRadius(satellite.orbit-0.05)
            .outerRadius(satellite.orbit+0.05)
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


        node.append("g")
            .attr("transform", "")
            .append("circle")
            .attr("id", obj.id)
            .attr("fill", obj.type === 'Planet' ? 'url(#planet)' : (color || '#404040'))
            .attr("r", "60")
            .attr("cx", "60")
            .attr("cy", "60")
            .attr("transform", " scale("+obj.size/30+") translate(-60,-60)");

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
                return Math.min(2 * obj.size, (obj.size) / this.getComputedTextLength() * 24) + "px"; });

        if (obj.satellites) {
            obj.satellites.forEach((s) => {
                this.drawOrbit(g, obj, s);
            })
        }
    }

    definePatterns(defs) {
        const planetPattern = defs.append("pattern")
            .attr("id", "planet")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1")
            .attr("height", "1")
            .append("g")
            .attr("transform", "translate(60,60)")

        const planetRadius = 30;
        planetPattern.append('circle')
            .attr("r", planetRadius)
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("fill", '#0B6B84');

        const ratio = planetRadius * 10 / 35;

        const arcs = [
            {r: planetRadius+3*ratio, s: 0, e: 230, v: 1},
            {r: planetRadius+2*ratio, s: 200, e: 390, v: -2},
            {r: planetRadius+2*ratio, s: 50, e: 160, v: -2},
            {r: planetRadius+ratio, s: 0, e: -230, v: 1},
        ]

        const count = 10
        for(let i=0;i<count;i++) {
            const s = i * 360/10;
            const e = s + 360/10/1.2;

            arcs.push({
                r: planetRadius-1, s: s, e: e, v: -1, c: '#0B6B84'
            })
        }

        const arcsSvg = []

        arcs.forEach(function(a) {
            const arc = d3.arc()
                .innerRadius(a.r)
                .outerRadius(a.r+3)
                .startAngle(a.s * (Math.PI/180)) //converting from degs to radians
                .endAngle(a.e * (Math.PI/180)) //just radians

            arcsSvg.push(
                planetPattern.append("path")
                    .attr("class", "circl")
                    .attr("d", arc)
                    .attr("fill", a.c ? a.c : "#19C2D3")
                    .attr("data-rotate", a.v)
            )
        })

        const t0 = Date.now();

        d3.timer(function() {
            const delta = (Date.now() - t0);
            arcsSvg.forEach((arc) => {
                arc.attr("transform", "rotate("+arc.attr("data-rotate")*delta*5/700+")");
            })
        });

        // planetPattern.selectAll(".circl")[0].forEach(function(d) {
        //     d3.timer(function() {
        //         const delta = (Date.now() - t0);
        //         const arc = d3.select(d)
        //         arc.attr("transform", "rotate("+arc.attr("data-rotate")*delta*5/700+")");
        //     })
        // })
    }

    paint() {

        const svg = d3.select(ReactDOM.findDOMNode(this))
            .attr("width", "100%")
            .attr("height", "100%")
            .call(d3.zoom().scaleExtent([1, 100]).on("zoom", zoom.bind(this)));
        const g = svg.select("g");

        g.selectAll("*").remove();

        const defs = svg.select("defs");
        defs.selectAll("*").remove();
        this.definePatterns(defs)


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
        return <svg><defs /><g /></svg>;
    }
}

System.propTypes = {
    star: PropTypes.object.isRequired,
    onOverObject: PropTypes.func.isRequired
};

export default System;

