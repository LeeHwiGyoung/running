'use client';
import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import { TotalRun } from '@/types/running.types';


interface BarGraphProps {
    data :  TotalRun[];
    xKey : string;
    yKey : string;
    width: number;
    height : number;
    marginTop ?: number;
    marginBottom ?: number;
    marginRight ?: number;
    marginLeft ?: number;
    onClickBar ?: (index : number) => void;
    onClickOutside ?: () => void;
    xAxisFontSize ?: number; // px 단위
    yAxisFontSize ?: number;
    barColor ?: string;
    hoverBarColor ?: string;
}

export default function BarGraph({
    data, xKey, yKey, width=400 , height=200, xAxisFontSize = 16 , yAxisFontSize = 16 , barColor = '#ADD8E6' , hoverBarColor = '#B0C4DE' ,  marginBottom = 20,marginLeft = 20,marginRight = 20,marginTop = 20, onClickBar, onClickOutside
}:BarGraphProps) {
    const svgRef = useRef<SVGSVGElement|null>(null);
    // 클릭된 막대의 인덱스를 ref에 저장하여 리렌더링 시에도 상태를 유지합니다.
    const clickedIndexRef = useRef<number | null>(null);

    useEffect(()=> {
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
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
            // d3.max의 두 번째 인자는 accessor 함수입니다. d[yKey]가 숫자임을 보장합니다.
            .domain([0 , d3.max(data, d => Number(d[yKey]) || 1) as number])
            .nice()
            .range([height - marginBottom , marginTop]);

        svg
            .append('g')
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .call(g => { g.selectAll('line').remove()})
            .selectAll('text')
            .attr('font-size', `${xAxisFontSize}px`);

        const yAxisGenerator = d3
            .axisLeft(y)
            .ticks(5)
            .tickSize(-(width - marginLeft - marginRight));

        const yAxisTick = svg
            .append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .call(yAxisGenerator)
            .call(g => g.select(".domain").remove());

        yAxisTick
            .selectAll('.tick line')
            .attr('stroke-dasharray', '2 2');
        
        
        yAxisTick
            .selectAll('.tick text')
            .attr('font-size' , `${yAxisFontSize}px`);
        
        const bars = svg.append('g')
            .selectAll('rect')
            .data(data.filter(d => Number(d[yKey]) > 0))
            .join('rect')
            .attr('x', d => x(String(d[xKey])) as number)
            .attr('y', d=> y(Number(d[yKey])))
            .attr('width', x.bandwidth())
            .attr('height', d=> height - marginBottom  - y(Number(d[yKey])))
            .attr('fill', `${barColor}`);
    
        const focus = svg
            .append('g')
            .style('display', 'none');

        focus.append('line')
            .attr('class', 'x-click-line')
            .attr('y1', 0)
            .attr('stroke' , `${hoverBarColor}`)
            .attr('stroke-width' , 1);

        bars.on('mouseover', (event)=> {
            d3.select(event.currentTarget).attr('fill', `${hoverBarColor}`);
        });
        bars.on('mouseout', (event)=> {
            // 클릭된 상태가 아닐 때만 원래 색으로 복원
            const index = d3.select(event.currentTarget).data()[0] ? data.indexOf(d3.select(event.currentTarget).data()[0] as TotalRun) : -1;
            if (index !== clickedIndexRef.current) {
                d3.select(event.currentTarget).attr('fill', `${barColor}`);
            }
        });

        function showClickedLine (d: TotalRun, targetElement: SVGRectElement) {
            // 모든 바를 원래 색으로 초기화
            bars.attr('fill', barColor);
            // 클릭된 바만 hover 색으로 변경
            d3.select(targetElement).attr('fill', hoverBarColor);

            const barStartX  = x(String(d[xKey])) as number;
            const barBandWidth = x.bandwidth();
            const barX = barStartX + barBandWidth/2;
            // 수직선의 시작점을 클릭된 막대의 상단 y좌표로 설정
            const barTopY = y(Number(d[yKey]));

            focus.style('display' , null);

            focus
                .select('.x-click-line')
                .attr('y2', barTopY) 
                .attr("transform", `translate(${barX}, 0)`);
        }

        function unShowClickedLine () {
            focus.style('display', 'none');
            // 모든 바를 원래 색으로
            bars.attr('fill', barColor);
        }

        const deselectAll = () => {
            clickedIndexRef.current = null;
            unShowClickedLine();
            if (onClickOutside) {
                onClickOutside();
            }
        }

        // SVG 배경 클릭 시 처리
        svg.on('click', () => {
            deselectAll();
        });

        if(onClickBar) {
            bars.on('click', (event, d)=> {
                event.stopPropagation(); // 배경 클릭 이벤트 전파 방지
                
                const index = data.indexOf(d);
                clickedIndexRef.current = index;

                showClickedLine(d, event.currentTarget);
                onClickBar(index);
            })
        }

        const handleClickOutside = (event: MouseEvent) => {
            // 클릭된 요소가 svgRef 안에 포함되어 있지 않다면 외부 클릭으로 간주
            if (svgRef.current && !svgRef.current.contains(event.target as Node)) {
                deselectAll();
            }
        };

        // document에 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);
        // 리렌더링 후에도 클릭된 상태를 복원
        if (clickedIndexRef.current !== null) {
            const clickedData = data[clickedIndexRef.current];
            if (clickedData) {
                // querySelector를 사용하여 해당 데이터에 맞는 bar 요소를 찾습니다.
                const barElement = bars.filter((d, i) => i === clickedIndexRef.current).node();
                if(barElement) {
                    showClickedLine(clickedData, barElement);
                }
            }
        }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [data, xKey, yKey, width, height, marginLeft, marginRight, marginBottom, marginTop, onClickBar, onClickOutside, xAxisFontSize, yAxisFontSize, barColor, hoverBarColor]);
    
    return (
        <svg ref={svgRef}></svg>
    )
}