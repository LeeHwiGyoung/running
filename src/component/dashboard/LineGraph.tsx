'use client';
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import {  formatTime } from '@/utils/format';


interface LineGraphProps<T> {
    id: string;
    data : T[];
    xKey : string;
    yKey : string;
    width: number;
    height : number;
    xAxisFontSize ?: number;
    yAxisFontSize ?: number;
    lineColor ?: string;
    lineWidth ?: number;
    marginTop ?: number;
    marginBottom ?: number;
    marginRight ?: number;
    marginLeft ?: number;
    reverseYAxis ?: boolean;
    tickFormatFunc ?: (value :number|string) => string;
    setButtonText : React.Dispatch<React.SetStateAction<string>>;
    setHoveredSegmentId : React.Dispatch<React.SetStateAction<number|null>>
}
export default function LineGraph<T extends { timestamp: number }>({data , id , xKey , yKey ,reverseYAxis= false , xAxisFontSize= 16, yAxisFontSize = 16, lineColor = '#B0C4DE', lineWidth = 3, width =400 ,height=200, marginBottom= 20, marginLeft=20, marginRight=20 , marginTop= 20 , setButtonText , setHoveredSegmentId, tickFormatFunc}:LineGraphProps<T>) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const startTime = data[0].timestamp;
  
  useEffect(()=> { 
    const svg = d3
    .select(svgRef.current)
    .attr('width' , width) //width 설정
    .attr('height', height) //height 설정
    .attr('viewBox', [0,0, width, height])
    .attr('style', 'max-width : 100%; height : auto');
    
    svg.selectAll('*').remove(); //svg 초기화
    const xMax = d3.max(data, d => d[xKey]) || 0;

    const yMin = d3.min(data, d => d[yKey]) || 0;
    const yMax = d3.max(data, d => d[yKey]) || 0;

    const x = d3
    .scaleLinear()
    .domain([0, xMax])
    .range([marginLeft , width - marginRight])
    
    const y = d3
    .scaleLinear()
    
    if(reverseYAxis){
      y.domain([yMax,yMin])
    }else{
      y.domain([yMin,yMax])
    }
    y.range([height - marginBottom , marginTop])


    const line = d3.line()
      .x(d => x(d[xKey])) // X 좌표
      .y(d => y(d[yKey])) // Y 좌표
      .defined(d => d.curPace !== null)
      .curve(d3.curveBasis);

    svg //x축 생성
    .append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`) 
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => { g.selectAll('line').remove()})
    .style("-webkit-user-select", "none")
    .style("-moz-user-select", "none")
    .style("-ms-user-select", "none")
    .style("user-select", "none")
    .selectAll('.tick text')
    .attr('font-size' , `${xAxisFontSize}px`);

    
    const yAxisSvg = svg.append("g") //y축 생성
      .attr('transform', `translate(${marginLeft} , 0)`);

      if(tickFormatFunc) {
        yAxisSvg.call(d3.axisLeft(y).ticks(5).tickFormat(d => tickFormatFunc(d as number)));
      }else{
        yAxisSvg.call(d3.axisLeft(y).ticks(5))
      }
      
    yAxisSvg
      .style("-webkit-user-select", "none")
      .style("-moz-user-select", "none")
      .style("-ms-user-select", "none")
      .style("user-select", "none")
      .selectAll('.tick text')
      .attr('font-size' , `${yAxisFontSize}px`);

    
    svg //line 그래프 생성
    .append('path')
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", `${lineColor}`)
    .attr("stroke-width", `${lineWidth}`)
    .attr("d",line)

    
    const focus = svg  //툴팁 요소
    .append('g')
    .style('display', 'none');

    focus.append("line") // 마우스 위치에 따른 수직선
    .attr('class', "x-hover-line hover-line")
    .attr('y1', marginTop)
    .attr('y2', height-marginBottom)
    .attr('stroke', 'gray')
    .attr('stroke-width' , 1)

    focus.append('text')
    .attr('class', 'x-hover-text')
    .attr('x' , 0)
    .attr('y', marginTop)
    .attr('text-anchor' ,'middle')
    .attr('fill', 'black')
    .attr('font-size', '12px')

    svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all') //모든 마우스 이벤트를 overlay가 받도록 설정 
    .on("mouseover", () => { focus.style("display", null); }) // 마우스 오버 시 툴팁 보이기
    .on("mouseout", () => {  
       focus.style("display", "none");
       setButtonText(null);
       setHoveredSegmentId(null); }) // 마우스 아웃 시 툴팁 숨기기
    .on("mousemove", mousemove)

    function mousemove(event : MouseEvent) {
      const mouseX = x.invert(d3.pointer(event)[0]); //마우스 x 좌표를 데이터 x값으로 변환
      const bisect = d3.bisector((d) => d[xKey]).left;
      const i = bisect(data, mouseX , 1)
      const d0 = data[i - 1];
      const d1 = data[i];
      let d ;

      if (!d1) { // d1이 undefined (즉, x0가 모든 데이터보다 크거나 같을 때)
        d = d0; // d0가 마지막 데이터이므로 d0를 선택
      } else if (!d0) { // d0가 undefined (즉, x0가 첫 데이터보다 작을 때, i=0인 경우)
        d = d1; // d1이 첫 데이터이므로 d1을 선택 (사실 processedData.slice(1)을 쓰므로 이 경우는 발생 가능성 낮음)
      } else { // d0와 d1이 모두 유효할 때, 더 가까운 데이터 선택
        d = mouseX - d0[xKey] > d1[xKey] - mouseX ? d1 : d0;
      }
      
      const tooltipX = x(d[xKey]);
      focus.attr("transform", `translate(${tooltipX})`)
      focus.select('.x-hover-text')
       .attr('x', 0) // focus 그룹 기준 X=0 (즉, 수직선 바로 위)
       .attr('y', 15)
       .text(`${formatTime((d.timestamp - startTime))}`)

       if(tickFormatFunc){
         setButtonText(tickFormatFunc(d[yKey]))
       }else{
         setButtonText(d[yKey])
       }
       setHoveredSegmentId(d.id)

    }
  }, [ ])

  return (
    <svg id={id} ref={svgRef}></svg>
  )
}
