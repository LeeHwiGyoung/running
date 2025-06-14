'use client';
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import { formatPace, formatTime } from '@/utils/format';

interface Geometry {
  type: string;
  coordinates: number[]; // [경도, 위도, 고도(선택 사항)]
}

// 개별 지점의 속성 데이터 타입
interface Properties {
  id: number;
  timestamp: string; // ISO 8601 형식의 날짜/시간 문자열
  elapsedTimeSeconds: number; // 경과 시간 (초)
  distanceFromPrevKm: number; // 이전 지점으로부터의 거리 (km)
  cumulativeDistanceKm: number; // 누적 거리 (km)
  instantPaceSecondsPerKm: number; // 순간 페이스 (초/km)
  instantPaceFormatted: string; // 순간 페이스 (분:초 형식)
  averagePaceSecondsPerKm: number; // 평균 페이스 (초/km)
  averagePaceFormatted: string; // 평균 페이스 (분:초 형식)
}

// 전체 Feature 객체 타입
interface PaceFeature {
  geometry: Geometry;
  properties: Properties;
}

interface LineGraphProps {
    data :  PaceFeature[];
    xKey : string;
    yKey : string;
    width: number;
    height : number;
    marginTop ?: number;
    marginBottom ?: number;
    marginRight ?: number;
    marginLeft ?: number;
    setAvg : React.Dispatch<React.SetStateAction<string>>;
    setHoveredSegmentId : React.Dispatch<React.SetStateAction<number|null>>
}
export default function LineGraph({data , xKey , yKey , width =400 ,height=200, marginBottom= 20, marginLeft=20, marginRight=20 , marginTop= 20 , setAvg , setHoveredSegmentId}:LineGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(()=> {
    const processedData = data.slice(1); 
    const svg = d3
    .select(svgRef.current)
    .attr('width' , width) //width 설정
    .attr('height', height) //height 설정
    .attr('viewBox', [0,0,width, height])
    .attr('style', 'max-width : 100%; height : auto')

    svg.selectAll('*').remove(); //svg 초기화

    const xMaxDistance = d3.max(processedData, d => d.properties[xKey]) || 0;

    const yMin = d3.min(processedData, d => d.properties[yKey]) || 0;
    const yMax = d3.max(processedData, d => d.properties[yKey]) || 0;

    const x = d3
    .scaleLinear()
    .domain([0, xMaxDistance])
    .range([marginLeft , width - marginRight])
    
    const y = d3
    .scaleLinear()
    .domain([yMax , yMin])
    .range([height - marginBottom , marginTop])


    const line = d3.line<PaceFeature>()
      .x(d => x(d.properties.cumulativeDistanceKm)) // X 좌표: 누적 거리
      .y(d => y(d.properties.averagePaceSecondsPerKm)) // Y 좌표: 평균 페이스
      .curve(d3.curveBasis);

    svg
    .append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => { g.selectAll('line').remove()})
    .style("-webkit-user-select", "none")
    .style("-moz-user-select", "none")
    .style("-ms-user-select", "none")
    .style("user-select", "none")

    svg.append("g")
      .attr('transform', `translate(${marginLeft} , 0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => formatPace(d as number)))
      .style("-webkit-user-select", "none")
      .style("-moz-user-select", "none")
      .style("-ms-user-select", "none")
      .style("user-select", "none")
    
    svg
    .append('path')
    .datum(processedData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
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
       setAvg(null);
       setHoveredSegmentId(null); }) // 마우스 아웃 시 툴팁 숨기기
    .on("mousemove", mousemove)

    function mousemove(event : MouseEvent) {
      const mouseX = x.invert(d3.pointer(event)[0]); //마우스 x 좌표를 데이터 x값으로 변환
      const bisect = d3.bisector((d : PaceFeature) => d.properties.cumulativeDistanceKm).left;
      const i = bisect(processedData, mouseX , 1)
      const d0 = processedData[i - 1];
      const d1 = processedData[i];
      let d : PaceFeature;

      if (!d1) { // d1이 undefined (즉, x0가 모든 데이터보다 크거나 같을 때)
        d = d0; // d0가 마지막 데이터이므로 d0를 선택
      } else if (!d0) { // d0가 undefined (즉, x0가 첫 데이터보다 작을 때, i=0인 경우)
        d = d1; // d1이 첫 데이터이므로 d1을 선택 (사실 processedData.slice(1)을 쓰므로 이 경우는 발생 가능성 낮음)
      } else { // d0와 d1이 모두 유효할 때, 더 가까운 데이터 선택
        d = mouseX - d0.properties.cumulativeDistanceKm > d1.properties.cumulativeDistanceKm - mouseX ? d1 : d0;
      }
      
      const tooltipX = x(d.properties.cumulativeDistanceKm);
      focus.attr("transform", `translate(${tooltipX})`)
      focus.select('.x-hover-text')
       .attr('x', 0) // focus 그룹 기준 X=0 (즉, 수직선 바로 위)
       .attr('y', 15)
       .text(`${formatTime(d.properties.elapsedTimeSeconds)}`)

       setAvg(d.properties.averagePaceFormatted)
       setHoveredSegmentId(d.properties.id)

    }
  }, [])

  return (
    <svg ref={svgRef}></svg>
  )
}
