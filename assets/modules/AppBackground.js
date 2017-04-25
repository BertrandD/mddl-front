import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class AppBackground extends Component {

    constructor(props, context) {
        super(props, context);
        const transform = d3.zoomIdentity.translate(0, 0).scale(1);

        this.state = {transform};
    }

    componentDidMount() {
        this.paint();
    }

    componentDidUpdate() {
        this.paint()
    }

    definePatterns(defs) {
        const pattern = defs.append("pattern")
            .attr("id","hash4_4").attr("width","8").attr("height","8").attr("patternUnits","userSpaceOnUse").attr("patternTransform","rotate(-45)")
            .append("rect")
            .attr("width","0.2")
            .attr("height","8")
            .attr("transform","translate(0,0)")
            .attr("fill","#88AAEE")

    }

    paint() {

        const svg = d3.select(ReactDOM.findDOMNode(this))
            .attr("width", "100%")
            .attr("height", window.innerHeight-5);

        const defs = svg.select("defs");
        defs.selectAll("*").remove();
        this.definePatterns(defs);

        const g = svg.select("g");
        g.selectAll("*").remove();

        g.append("g").attr("id","shape")
            .append("circle")
            .attr({cx:"60",cy:"60",r:"50", fill:"url(#hash4_4)" });


        const width = svg.style("width").replace("px", "");
        const height = svg.style("height").replace("px", "");
        const centerX = width / 2;
        const centerY = height / 2;

        g.attr("transform", this.state.transform);


        g.append("rect")
            .style("fill", "url(#hash4_4)")
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", height)
            .attr("width", width)
    }

    render() {
        return <svg><defs /><g /></svg>;
    }
}

export default AppBackground;

