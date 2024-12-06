'use client'

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import DEFAULT_AVATAR from '@/assets/images/default-avatar-new.png'

interface PropsModel {
  nodes?: {
    id?: number
    group?: number
    size?: number
    img?: string
  }[]
  links?: {
    source?: number
    target?: number
    value?: string
    distance?: number
  }[]
}

const BubbleMap: React.FC<PropsModel> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (nodes && links) {
      console.log(nodes, links)

      const data = { nodes, links }
      const width = window.innerWidth
      const height = window.innerHeight
      const padding = 14 // Padding between the image and the circle boundary

      const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)
      const zoomableContainer = svg.append('g').attr('class', 'zoomable-container')

      // Add a group to contain all graph elements
      const graphGroup = zoomableContainer.append('g').attr('class', 'graph-group')

      // Define zoom behavior
      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 2]) // Min and max zoom scale
        .on('zoom', (event: any) => {
          graphGroup.attr('transform', event.transform) // Apply zoom/pan transform to the graph group
        })

      // Apply zoom behavior to the SVG
      svg.call(zoom)

      const simulation = d3
        .forceSimulation(data.nodes)
        .force(
          'link',
          d3
            .forceLink(data.links)
            .id((d: any) => d.id)
            .distance((d: any) => d.distance),
        )
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))

      const link = graphGroup
        .append('g')
        .selectAll('line')
        .data(data.links)
        .enter()
        .append('line')
        .style('stroke', '#aaa')
        .attr('class', 'link')
        .style('stroke', '#1278FA')
        .style('stroke-width', 2)

      const node = graphGroup
        .append('g')
        .selectAll('g')
        .data(data.nodes)
        .enter()
        .append('g')
        .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

      // Add circles for the outer bubble with padding
      node
        .append('circle')
        .attr('r', (d: any) => d.size / 2 + padding) // Add padding to the radius
        .attr('fill', '#1278FA1A')
        .attr('class', 'animated-node')
        .style('stroke', '#1278FA')

      // Add circular clipping paths for the images
      node
        .append('clipPath')
        .attr('id', (d: any) => `clip-${d.id}`)
        .append('circle')
        .attr('r', (d: any) => d.size / 2) // Inner circle radius for the image
        .attr('cx', 0) // Center the clipping path
        .attr('cy', 0)

      // Add images clipped to the circular shape
      const images = node
        .append('image')
        .attr('class', 'animated-node')
        .attr('xlink:href', (d: any) => d.img)
        .attr('width', (d: any) => d.size)
        .attr('height', (d: any) => d.size)
        .attr('x', (d: any) => -d.size / 2) // Center the image
        .attr('y', (d: any) => -d.size / 2) // Center the image
        .attr('clip-path', (d: any) => `url(#clip-${d.id})`)
        .attr('preserveAspectRatio', 'xMidYMid slice') // Apply the circular clip

      images.on('error', function (event: any) {
        const element = event.currentTarget as SVGImageElement
        d3.select(element).attr('xlink:href', DEFAULT_AVATAR.src) // Replace with default avatar
      })

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y)

        node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      })

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event: any, d: any) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      const handleResize = () => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        svg.attr('width', newWidth).attr('height', newHeight)
        simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2)).restart()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        svg.selectAll('*').remove() // Clean up SVG on component unmount
      }
    }
  }, [nodes, links])

  return (
    <>
      <style>
        {`
    .link {
      stroke-dasharray: 5, 5; /* Dashed pattern: 5px dash, 5px gap */
      stroke-dashoffset: 0; /* Start position of the dash */
      animation: dashMove 0.5s linear infinite; /* Animate the dashes */
    }

    @keyframes dashMove {
      to {
        stroke-dashoffset: -10; /* Move the dashes along the line */
      }
    }

    .animated-node {
            animation: moveUpDown 2s ease-in-out infinite;
          }

    @keyframes moveUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
  `}
      </style>
      <div style={{ height: 'calc(100vh - 50px)' }}>
        <svg ref={svgRef}></svg>
      </div>
    </>
  )
}

export default BubbleMap