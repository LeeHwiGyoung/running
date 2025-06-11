'use client';
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

interface DataItem {
    [key: string]: string | number;
}
interface GraphProps {
    data :  DataItem[];
    xKey : string;
    yKey : string;
    width: number;
    height : number;
    marginTop ?: number;
    marginBottom ?: number;
    marginRight ?: number;
    marginLeft ?: number;
    onClickBar ?: (index : number) => void; 
}

export default function BarGraph({
    data, xKey, yKey, width=400 , height=200, marginBottom = 20,marginLeft = 20,marginRight = 20,marginTop = 20, onClickBar,
}:GraphProps) {
  const svgRef = useRef<SVGSVGElement|null>(null);

  useEffect(()=> {
    const svg = d3
    .select(svgRef.current)
    .attr('width', width) //width 설정
    .attr('height', height) //height 설정
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll('*').remove(); //초기화

    const x = d3
    .scaleBand()
    .domain(data.map(d=> String(d[xKey])))
    .range([marginLeft, width - marginRight])
    .padding(0.3);

    const y = d3
    .scaleLinear()
    .domain([0 , d3.max(data, d => Number(d[yKey]))])
    .nice()
    .range([height - marginBottom , marginTop])

    svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => { g.selectAll('line').remove()})
    .selectAll('text')
    .attr('font-size', '12px');


    const yAxisGenerator = d3
    .axisLeft(y)
    .ticks(5)
    .tickSize(-(width - marginLeft - marginRight))
    
    svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(yAxisGenerator)
    .call(g => g.select(".domain").remove())
    .selectAll('.tick line')
    .attr('stroke-dasharray', '2 2')
    .selectAll('.tick line:last-of-type')
    .remove()
    .selectAll('text')
    .attr('font-size', '12px');
    
    const bars = svg.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', d => x(d[xKey]))
    .attr('y', d=> y(d[yKey]))
    .attr('width', x.bandwidth())
    .attr('height', d=> height - marginBottom  - y(d[yKey]))
    .attr('data-index', (_, i) => i)
    .attr('fill', 'teal');
  
    bars.on('mouseover', (event, )=> //그래프에 마우스를 올렸을 때
    d3.select(event.currentTarget).attr('fill', 'black'));
    bars.on('mouseout', (event, )=> //그래프에서 마우스가 나갔을 때때
    d3.select(event.currentTarget).attr('fill', 'teal'));

    if(onClickBar) {
      bars.on('click', (event, d)=> {
        event.stopPropagation()
        onClickBar(d.id)
      })
    }
  }, [data, xKey, yKey, width, height, marginLeft, marginRight, marginBottom, marginTop, onClickBar])
  
  return (
    <svg ref={svgRef}></svg>
  )
}
