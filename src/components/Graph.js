import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Histogram({ data, width, height }) {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const x = d3.scaleLinear()
      .domain([1, 10])
      .range([0, innerWidth])
      .nice();

    const bins = d3.histogram()
      .domain(x.domain())
      .value(d => d)
      .thresholds(x.ticks(20))
      (data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([innerHeight, 0])
      .nice();


    const xAxis = d3.axisBottom(x);

    svg.append('g')
      .attr('fill', '#28a745')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .transition() // Animation
      .duration(700)
      .attr('x', d => x(d.x0) + 1)
      .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr('y', d => y(0))
      .attr('height')
      .transition()
      .delay(0)
      .duration(700)
      .attr('y', d => y(d.length))
      .attr('height', d => y(0) - y(d.length));


    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .style('font-family', "Bebas Neue")
      .style('font-size', '20px')
      .call(xAxis);


  }, [data, height, width]);

  return (
    // Not Very Resizeable
    <div style={{ paddingLeft: "150px", paddingTop: "50px" }}>

      <svg ref={ref} width={width} height={height}></svg>
    </div>

  );
}

export default Histogram;
