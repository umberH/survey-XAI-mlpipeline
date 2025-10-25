// Interactive XAI Taxonomy D3.js Visualization
class TaxonomyDiagram {
    constructor(containerId) {
        this.container = d3.select(containerId);
        this.width = 1000;
        this.height = 3500;
        this.margin = { top: 20, right: 90, bottom: 20, left: 90 };
        this.i = 0;

        // Taxonomy data structure
        this.data = {
            name: "Dimensions of XAI",
            children: [
                {
                    name: "Input",
                    children: [
                        { name: "Image" },
                        { name: "Vectors" },
                        { name: "Tabular" },
                        { name: "Graphs" },
                        { name: "Text" },
                        { name: "Time Series" }
                    ]
                },
                {
                    name: "Type of Explanation",
                    children: [
                        { name: "Feature Attribution" },
                        { name: "Rules" },
                        { name: "Textual" },
                        { name: "Visualization" },
                        { name: "Mixed" }
                    ]
                },
                {
                    name: "Stage of Explanation",
                    children: [
                        { name: "Intrinsic" },
                        { name: "Post-hoc" }
                    ]
                },
                {
                    name: "Strategy for Explanation",
                    children: [
                        { name: "User Centered" },
                        { name: "Goal Driven" },
                        { name: "Data Driven" }
                    ]
                },
                {
                    name: "Cognitive Alignment",
                    children: [
                        { name: "Interactive" },
                        { name: "Narrative" },
                        { name: "Contrastive" },
                        { name: "Counterfactual" },
                        { name: "Analogical" }
                    ]
                },
                {
                    name: "Reflexive Explainability-Centric ML",
                    children: [
                        { name: "Operational Layer" },
                        { name: "Explanation Layer" },
                        { name: "Interactivity Layer" },
                        { name: "Governance Layer" }
                    ]
                },
                {
                    name: "Application Domain",
                    children: [
                        { name: "Finance" },
                        { name: "Healthcare" },
                        { name: "Industry 5.0" },
                        { name: "Aviation" },
                        { name: "Education" },
                        { name: "Cyber Security" },
                        { name: "Miscellaneous" }
                    ]
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        // Clear container
        this.container.selectAll("*").remove();
        
        // Create SVG
        this.svg = this.container
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("font-family", "var(--md-text-font, 'Roboto', sans-serif)")
            .style("font-size", "12px");
            
        // Create main group
        this.g = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left},${600})`);
        
        // Create tree layout
        this.treemap = d3.tree()
            .nodeSize([100, 200])
            .separation((a, b) => a.parent == b.parent ? 1 : 2);
        
        // Create hierarchy
        this.root = d3.hierarchy(this.data, d => d.children);
        this.root.x0 = (this.height - this.margin.top - this.margin.bottom) / 2;
        this.root.y0 = 0;
        
        // Collapse all children initially
        this.root.children.forEach(this.collapse.bind(this));
        
        // Initial render
        this.update(this.root);
        
        // Add title
        this.svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .style("fill", "var(--md-primary-fg-color, #526cfe)")
            .text("Interactive XAI Taxonomy");
    }
    
    collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse.bind(this));
            d.children = null;
        }
    }
    
    update(source) {
        // Compute the new tree layout
        const treeData = this.treemap(this.root);
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);
        
        // Normalize for fixed-depth
        nodes.forEach(d => d.y = d.depth * 200);
        
        // Update nodes
        const node = this.g.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++this.i));
        
        // Enter new nodes
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${source.y0},${source.x0})`)
            .on('click', this.click.bind(this));
        
        // Add circles for nodes
        nodeEnter.append('circle')
            .attr('class', 'node-circle')
            .attr('r', 1e-6)
            .style('fill', d => d._children ? '#526cfe' : '#fff')
            .style('stroke', '#526cfe')
            .style('stroke-width', '3px')
            .style('cursor', 'pointer');
        
        // Add labels for nodes
        nodeEnter.append('text')
            .attr('class', 'node-text')
            .attr('dy', '.35em')
            .attr('x', d => d.children || d._children ? -25 : 25)
            .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
            .attr('transform', d => d.depth === 0 ? 'rotate(-90)' : '')
            .text(d => d.data.name)
            .style('fill-opacity', 1e-6)
            .style('font-size', d => d.depth === 0 ? '18px' : '16px')
            .style('font-weight', d => d.depth === 0 ? 'bold' : 'normal')
            .style('cursor', 'pointer');
        
        // Update
        const nodeUpdate = nodeEnter.merge(node);
        
        // Transition to proper position
        nodeUpdate.transition()
            .duration(750)
            .attr('transform', d => `translate(${d.y},${d.x})`);
        
        // Update circle
        nodeUpdate.select('circle.node-circle')
            .transition()
            .duration(750)
            .attr('r', d => d.depth === 0 ? 20 : 15)
            .style('fill', d => d._children ? '#526cfe' : '#fff')
            .style('stroke', '#526cfe')
            .style('stroke-width', '3px');
        
        // Update text
        nodeUpdate.select('text.node-text')
            .transition()
            .duration(750)
            .style('fill-opacity', 1);
        
        // Remove exiting nodes
        const nodeExit = node.exit().transition()
            .duration(750)
            .attr('transform', d => `translate(${source.y},${source.x})`)
            .remove();
        
        nodeExit.select('circle')
            .attr('r', 1e-6);
        
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);
        
        // Update links
        const link = this.g.selectAll('path.link')
            .data(links, d => d.id);
        
        // Enter new links
        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d => {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o);
            })
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', '2px');
        
        // Update
        const linkUpdate = linkEnter.merge(link);
        
        // Transition to proper position
        linkUpdate.transition()
            .duration(750)
            .attr('d', d => this.diagonal(d, d.parent));
        
        // Remove exiting links
        link.exit().transition()
            .duration(750)
            .attr('d', d => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o);
            })
            .remove();
        
        // Store old positions
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }
    
    diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                     C ${(s.y + d.y) / 2} ${s.x},
                       ${(s.y + d.y) / 2} ${d.x},
                       ${d.y} ${d.x}`;
        return path;
    }
    
    click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
    }
}

// Initialize taxonomy diagram when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the page to fully load
    setTimeout(() => {
        const taxonomyContainer = document.getElementById('taxonomy-diagram');
        if (taxonomyContainer) {
            new TaxonomyDiagram('#taxonomy-diagram');
        }
    }, 500);
});