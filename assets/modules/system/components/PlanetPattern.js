import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class PlanetPattern extends Component {

    constructor(props, context) {
        super(props, context);
        this.t0 = getServerTime();
    }

    componentDidMount() {
        this.definePatterns();
    }

    definePatterns() {
        const defs = d3.select(ReactDOM.findDOMNode(this))

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
            {r: planetRadius + 3 * ratio, s: 0, e: 230, v: 1},
            {r: planetRadius + 2 * ratio, s: 200, e: 390, v: -2},
            {r: planetRadius + 2 * ratio, s: 50, e: 160, v: -2},
            {r: planetRadius + ratio, s: 0, e: -230, v: 1},
        ]

        const count = 10
        for (let i = 0; i < count; i++) {
            const s = i * 360 / 10;
            const e = s + 360 / 10 / 1.2;

            arcs.push({
                r: planetRadius - 1, s: s, e: e, v: -1, c: '#0B6B84'
            })
        }

        const arcsSvg = []

        arcs.forEach(function (a) {
            const arc = d3.arc()
                .innerRadius(a.r)
                .outerRadius(a.r + 3)
                .startAngle(a.s * (Math.PI / 180)) //converting from degs to radians
                .endAngle(a.e * (Math.PI / 180)) //just radians

            arcsSvg.push(
                planetPattern.append("path")
                    .attr("class", "circl")
                    .attr("d", arc)
                    .attr("fill", a.c ? a.c : "#19C2D3")
                    .attr("data-rotate", a.v)
            )
        })

        d3.timer(function () {
            const delta = (getServerTime() - this.t0);
//            arcsSvg.forEach((arc) => {
  //              arc.attr("transform", "rotate(" + arc.attr("data-rotate") * delta * 5 / 700 + ")");
    //        })
        }.bind(this));

        // planetPattern.selectAll(".circl")[0].forEach(function(d) {
        //     d3.timer(function() {
        //         const delta = (getServerTime() - t0);
        //         const arc = d3.select(d)
        //         arc.attr("transform", "rotate("+arc.attr("data-rotate")*delta*5/700+")");
        //     })
        // })
    }

    render() {
        return (
            <svg height="0" width="0">
                <defs>
                </defs>
            </svg>
        );
    }
}

export default PlanetPattern;

