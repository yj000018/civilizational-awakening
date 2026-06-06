/**
 * Map — D3 force-directed knowledge graph
 * Shows pillars, projects, thinkers, and concepts as interconnected nodes
 * Design: dark canvas, editorial, luminous nodes
 */

import Layout from '@/components/Layout';
import { useContent } from '@/lib/content';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useLocation } from 'wouter';

// ─── Node types and colors ────────────────────────────────────────────────────
const TYPE_CONFIG: Record<string, { color: string; radius: number; label: string }> = {
  pillar:  { color: '#c8a96e', radius: 22, label: 'Pillar' },
  project: { color: '#8ba8c8', radius: 14, label: 'Project' },
  thinker: { color: '#a8c8a0', radius: 12, label: 'Thinker' },
  concept: { color: '#c8a0a8', radius: 12, label: 'Concept' },
};

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  slug: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

function buildGraph() {
  const { getAllContent } = useContent();
  const all = getAllContent();
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const nodeIds = new Set<string>();

  for (const item of all) {
    const type = item.frontmatter.type;
    if (!TYPE_CONFIG[type]) continue;
    const id = `${type}:${item.slug}`;
    if (!nodeIds.has(id)) {
      nodes.push({ id, label: item.frontmatter.title, type, slug: item.slug });
      nodeIds.add(id);
    }
  }

  for (const item of all) {
    const type = item.frontmatter.type;
    if (!TYPE_CONFIG[type]) continue;
    const sourceId = `${type}:${item.slug}`;
    const fm = item.frontmatter as unknown as Record<string, unknown>;

    const addLinks = (field: string, targetType: string) => {
      const targets = (fm[field] as string[]) || [];
      for (const t of targets) {
        const targetId = `${targetType}:${t}`;
        if (nodeIds.has(targetId)) {
          links.push({ source: sourceId, target: targetId });
        }
      }
    };

    addLinks('related_projects', 'project');
    addLinks('related_thinkers', 'thinker');
    addLinks('related_concepts', 'concept');
    addLinks('related_pillars', 'pillar');

    const pillarSlug = fm['pillar'] as string;
    if (pillarSlug) {
      const targetId = `pillar:${pillarSlug}`;
      if (nodeIds.has(targetId)) {
        links.push({ source: sourceId, target: targetId });
      }
    }
  }

  return { nodes, links };
}

export default function MapPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(Object.keys(TYPE_CONFIG)));

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { nodes: allNodes, links: allLinks } = buildGraph();

    const nodes = allNodes.filter((n) => activeTypes.has(n.type));
    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = allLinks.filter(
      (l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string)
    );

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    svg.call(
      d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on('zoom', (event) => g.attr('transform', event.transform))
    );

    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id).distance(90).strength(0.4))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius((d) => (TYPE_CONFIG[d.type]?.radius ?? 12) + 10));

    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'rgba(255,255,255,0.07)')
      .attr('stroke-width', 1);

    const node = g
      .append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append('circle')
      .attr('r', (d) => TYPE_CONFIG[d.type]?.radius ?? 12)
      .attr('fill', (d) => TYPE_CONFIG[d.type]?.color ?? '#888')
      .attr('fill-opacity', 0.8)
      .attr('stroke', (d) => TYPE_CONFIG[d.type]?.color ?? '#888')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.35);

    node
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => (TYPE_CONFIG[d.type]?.radius ?? 12) + 14)
      .attr('fill', 'rgba(255,255,255,0.6)')
      .attr('font-size', (d) => (d.type === 'pillar' ? '11px' : '9px'))
      .attr('font-family', 'Inter, sans-serif')
      .attr('font-weight', (d) => (d.type === 'pillar' ? '500' : '400'))
      .attr('pointer-events', 'none');

    node
      .on('mouseenter', (event, d) => {
        setHovered(d);
        d3.select(event.currentTarget as SVGGElement)
          .select('circle')
          .transition().duration(150)
          .attr('fill-opacity', 1)
          .attr('r', (TYPE_CONFIG[d.type]?.radius ?? 12) * 1.3);
      })
      .on('mouseleave', (event, d) => {
        setHovered(null);
        d3.select(event.currentTarget as SVGGElement)
          .select('circle')
          .transition().duration(150)
          .attr('fill-opacity', 0.8)
          .attr('r', TYPE_CONFIG[d.type]?.radius ?? 12);
      })
      .on('click', (_event, d) => {
        const routes: Record<string, string> = {
          pillar:  `/pillars/${d.slug}`,
          project: `/projects/${d.slug}`,
          thinker: `/thinkers/${d.slug}`,
          concept: `/concepts/${d.slug}`,
        };
        if (routes[d.type]) navigate(routes[d.type]);
      });

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x ?? 0)
        .attr('y1', (d) => (d.source as GraphNode).y ?? 0)
        .attr('x2', (d) => (d.target as GraphNode).x ?? 0)
        .attr('y2', (d) => (d.target as GraphNode).y ?? 0);
      node.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => { simulation.stop(); };
  }, [activeTypes, navigate]);

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  return (
    <Layout>
      <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Header bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ opacity: 0.35, fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
          >
            Knowledge Map
          </span>

          {/* Filter toggles */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-150"
                style={{
                  borderColor: activeTypes.has(type) ? cfg.color : 'var(--border)',
                  backgroundColor: activeTypes.has(type) ? `${cfg.color}18` : 'transparent',
                  color: activeTypes.has(type) ? cfg.color : 'var(--muted-foreground)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <span
                  className="inline-block rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    backgroundColor: activeTypes.has(type) ? cfg.color : 'var(--muted-foreground)',
                  }}
                />
                {cfg.label}s
              </button>
            ))}
          </div>

          <p className="text-xs hidden md:block" style={{ opacity: 0.3, fontFamily: 'Inter, sans-serif' }}>
            Drag · Scroll to zoom · Click to open
          </p>
        </div>

        {/* Graph canvas */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          style={{ backgroundColor: '#0f0e0c' }}
        >
          <svg ref={svgRef} className="w-full h-full" />

          {/* Hover tooltip */}
          {hovered && (
            <div
              className="absolute bottom-6 left-6 p-4 rounded-sm border pointer-events-none"
              style={{
                backgroundColor: 'rgba(15,14,12,0.92)',
                borderColor: TYPE_CONFIG[hovered.type]?.color ?? 'var(--border)',
                backdropFilter: 'blur(8px)',
                maxWidth: 260,
              }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{
                  color: TYPE_CONFIG[hovered.type]?.color,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.1em',
                }}
              >
                {TYPE_CONFIG[hovered.type]?.label}
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {hovered.label}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}
              >
                Click to open →
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
