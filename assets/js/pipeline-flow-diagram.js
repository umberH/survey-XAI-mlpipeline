// Pipeline Flow Diagram - Three Layer Sunburst
// Clean configuration for easy text changes

const pipelineConfig = [
  {
    name: "Data Curation",
    children: [
      "Bias detection using causal graphs",
      "Intervention simulation"
    ]
  },
  {
    name: "Feature Engg", 
    children: [
      "Causal feature selection",
      "Concept activation vectors with causal grounding"
    ]
  },
  {
    name: "Model Training",
    children: [
      "Causal regularization",
      "Structural causal models (SCMs)"
    ]
  },
  {
    name: "Evaluation",
    children: [
      "Counterfactual fairness",
      "Causal robustness"
    ]
  },
  {
    name: "Deployment",
    children: [
      "Causal explanations",
      "Actionable insights"
    ]
  },
  {
    name: "Monitoring",
    children: [
      "Causal drift detection",
      "Intervention logging"
    ]
  }
];

// Interactivity layer overlay configuration (similar to governance)
const interactivityConfig = [
  { 
    name: "Stakeholders", 
    angle: 0, 
    sweep: 120,
    description: "Domain experts, developers, end users, regulators",
    components: ["Domain Experts", "Developers", "End Users", "Regulators"]
  },
  { 
    name: "Mechanisms", 
    angle: 120, 
    sweep: 120,
    description: "Participatory design, explanation critique, iterative refinement",
    components: ["Participatory Design", "Explanation Critique", "Iterative Refinement", "Feedback Loops"]
  },
  { 
    name: "Impacts", 
    angle: 240, 
    sweep: 120,
    description: "Data re-curation, feature updates, model improvements",
    components: ["Data Re-curation", "Feature Updates", "Model Updates", "Process Improvement"]
  }
];

// Modern color scheme - stronger, more distinct colors for better readability
const stageColors = [
  '#4A90E2', // Strong blue - Data Curation
  '#7ED321', // Vibrant green - Feature Engineering  
  '#F5A623', // Warm orange - Model Training
  '#D0021B', // Clear red - Evaluation
  '#9013FE', // Purple - Deployment
  '#50E3C2'  // Teal - Monitoring
];
const functionColors = [
  '#A4C8F0', // Lighter blue
  '#B8E6A4', // Lighter green
  '#F5C878', // Lighter orange
  '#E5677A', // Lighter red
  '#B378F0', // Lighter purple
  '#87E6D4'  // Lighter teal
];
const interactivityColors = ['#F5F9FE', '#F4FAF4', '#FFFBF3']; // Keep original for now

// Governance overlay configuration
const governanceConfig = [
  { 
    name: "Regulatory Compliance", 
    angle: 0, 
    sweep: 90,
    description: "Legal frameworks, audit requirements, transparency mandates"
  },
  { 
    name: "Ethical Guidelines", 
    angle: 90, 
    sweep: 90,
    description: "Fairness principles, bias mitigation, responsible AI practices"
  },
  { 
    name: "Privacy & Security", 
    angle: 180, 
    sweep: 90,
    description: "Data protection, anonymization, secure explanation delivery"
  },
  { 
    name: "Quality Assurance", 
    angle: 270, 
    sweep: 90,
    description: "Explanation accuracy, consistency, reliability standards"
  }
];

function createPipelineFlowDiagram(containerId) {
  console.log('=== STARTING PIPELINE DIAGRAM CREATION ===');
  console.log('Container ID:', containerId);
  const container = d3.select(containerId);
  console.log('Container found:', !container.empty());
  if (container.empty()) {
    console.error('Container not found!');
    return;
  }
  
  // Clear existing content
  container.selectAll("*").remove();
  
  // Dimensions - reduced size by bringing everything closer
  const width = 900;
  const height = 900;
  const radius = Math.min(width, height) / 2 - 80;
  
  // Create SVG
  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .style('font-family', '"Segoe UI", "Roboto", "Inter", -apple-system, BlinkMacSystemFont, sans-serif')
    .style('background-color', '#fff');
  
  const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
  // Create hierarchy from config (only two levels now)
  const root = d3.hierarchy({name: "root", children: pipelineConfig})
    .sum(d => d.children ? 0 : 1)
    .sort((a, b) => b.value - a.value);
  
  // Create partition layout with custom sizing for better text space
  const partition = d3.partition()
    .size([2 * Math.PI, radius * radius])
    .padding(0.01);
  
  partition(root);
  const nodes = root.descendants();
  
  // Create arc generator with custom ring sizing for two main layers
  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => {
      if (d.depth === 0) return 0;
      if (d.depth === 1) return radius * 0.1; // Pipeline stages: 20-50% (matches center circle)
      if (d.depth === 2) return radius * 0.45; // Explainability layer: 50-70% (reduced size)
      return Math.sqrt(d.y0);
    })
    .outerRadius(d => {
      if (d.depth === 1) return radius * 0.45; // Pipeline stages end at 50%
      if (d.depth === 2) return radius * 0.65; // Explainability layer end at 70%
      return Math.sqrt(d.y1);
    });
  
  // Create segments from hierarchical data
  const segments = g.selectAll('.segment')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'segment');
  
  
  // Add paths
  segments.append('path')
    .attr('d', arc)
    .attr('fill', d => {
      if (d.depth === 0) return 'white';
      if (d.depth === 1) {
        const index = d.parent.children.indexOf(d);
        return stageColors[index];
      }
      if (d.depth === 2) {
        const parentIndex = d.parent.parent.children.indexOf(d.parent);
        return functionColors[parentIndex];
      }
      return '#ddd';
    })
    .attr('stroke', '#fff')
    .attr('stroke-width', d => d.depth === 0 ? 0 : 0.5)
    .attr('opacity', 0.9)
    .style('cursor', d => d.depth > 0 ? 'pointer' : 'default')
    .on('mouseover', function(event, d) {
      if (d.depth === 0) return;
      d3.select(this)
        .transition().duration(200)
        .attr('opacity', 1)
        .style('filter', 'brightness(1.1)');
      
      // Show tooltip
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'pipeline-tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'white')
        .style('border-radius', '4px')
        .style('padding', '8px 12px')
        .style('font-size', '14px')
        .style('pointer-events', 'none')
        .style('z-index', 1000);
      
      // Get the full name - handle different data structures
      let fullName;
      let layerType;
      if (d.depth === 1) {
        fullName = d.data.name;
        layerType = 'Operational Layer';
      } else if (d.depth === 2) {
        fullName = typeof d.data === 'string' ? d.data : d.data.name;
        layerType = 'Explanation Layer';
      } else if (d.depth === 3) {
        fullName = d.data;
        layerType = 'Interactivity Layer';
      } else {
        fullName = d.data.name || d.data;
        layerType = 'Governance Layer';
      }
      
      tooltip.html(`<strong>${fullName}</strong><br><em>${layerType}</em>`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', function(event, d) {
      if (d.depth === 0) return;
      d3.select(this)
        .transition().duration(200)
        .attr('opacity', 0.9)
        .style('filter', 'brightness(1)');
      
      d3.selectAll('.pipeline-tooltip').remove();
    });
  
  
  // Add text labels
  segments.filter(d => d.depth > 0 && d.depth < 4)
    .append('text')
    .attr('transform', function(d) {
      const angle = (d.x0 + d.x1) / 2;
      let textRadius;
      if (d.depth === 1) {
        // Pipeline stages: center text in first ring
        textRadius = radius * 0.35; // Middle of 0.20 to 0.50
      } else if (d.depth === 2) {
        // Explainability functions: center text in second ring  
        textRadius = radius * 0.55; // Middle of 0.50 to 0.70
      } else if (d.depth === 3) {
        // Interactivity layer: center text in third ring
        textRadius = radius * 0.75; // Middle of 0.70 to 0.95
      } else {
        textRadius = (Math.sqrt(d.y0) + Math.sqrt(d.y1)) / 2;
      }
      const x = Math.cos(angle - Math.PI / 2) * textRadius;
      const y = Math.sin(angle - Math.PI / 2) * textRadius;
      
      // Calculate rotation for text with 90 degree offset
      let rotation = (angle - Math.PI / 2) * 180 / Math.PI + 90;
      
      // Flip text if it would be upside down
      if (rotation > 90 && rotation < 270) {
        rotation += 180;
      }
      
      return `translate(${x}, ${y}) rotate(${rotation})`;
    })
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .style('fill', d => d.depth === 3 ? '#000' : (d.depth === 1 ? '#333' : '#000'))
    .style('font-size', d => {
      if (d.depth === 1) return '18px';  // Pipeline stages: 14px → 16px
      if (d.depth === 2) return '16px';  // Explainability functions: 12px → 14px
      if (d.depth === 3) return '16px';  // Legacy: 10px → 12px
      return '14px';
    })
    .style('font-weight', d => d.depth === 1 ? 'bold' : (d.depth === 2 ? 'bold' : '600'))
    // Text shadows removed for cleaner appearance
    .style('pointer-events', 'none')
    .each(function(d) {
      const text = d3.select(this);
      
      if (d.depth === 1) {
        text.text(d.data.name);
      } else if (d.depth === 2) {
        // For explainability functions, show abbreviated versions
        const shortNames = {
          'Bias detection using causal graphs': 'Bias Det.',
          'Intervention simulation': 'Intervene',
          'Causal feature selection': 'Features',
          'Concept activation vectors with causal grounding': 'Concepts',
          'Causal regularization': 'Regular.',
          'Structural causal models (SCMs)': 'SCMs',
          'Counterfactual fairness': 'Fairness',
          'Causal robustness': 'Robust.',
          'Causal explanations': 'Explain',
          'Actionable insights': 'Insights',
          'Causal drift detection': 'Drift Det.',
          'Intervention logging': 'Logging'
        };
        const dataName = typeof d.data === 'string' ? d.data : d.data.name;
        const shortName = shortNames[dataName] || (dataName ? dataName.split(' ').slice(0, 2).join(' ') : 'Unknown');
        text.text(shortName);
      } else if (d.depth === 3) {
        // For stakeholders, show abbreviated versions
        const stakeholderShort = {
          'Domain Experts': 'Experts',
          'End Users': 'Users', 
          'Developers': 'Devs',
          'Regulators': 'Regulators'
        };
        text.text(stakeholderShort[d.data] || d.data);
      }
    });
  
  // Add overlay layers with proper labels and colors
  console.log('Adding interactivity and governance overlay layers...');
  
  // Interactivity overlay layer (third ring)
    
  // Add simple interactivity arcs
  const simpleInteractivityArc = d3.arc()
    .innerRadius(radius * 0.67)  // Start closer after explainability layer
    .outerRadius(radius * 0.84);
  
  // REDESIGNED INTERACTIVITY LAYER - Much cleaner approach
  const interactivityColors = ['#2E86AB', '#A23B72', '#F18F01']; // Professional colors
  const interactivityLabels = ['Stakeholders', 'Mechanisms', 'Impacts'];
  
  // Create three distinct sections with better spacing
  interactivityConfig.forEach((section, sectionIndex) => {
    const sectionStartAngle = (section.angle - 90) * Math.PI / 180;
    const sectionEndAngle = (section.angle + section.sweep - 90) * Math.PI / 180;
    
    // Main section arc with solid colors and clear borders
    g.append('path')
      .attr('d', simpleInteractivityArc({
        startAngle: sectionStartAngle,
        endAngle: sectionEndAngle
      }))
      .attr('fill', interactivityColors[sectionIndex])
      .attr('fill-opacity', 0.15)
      .attr('stroke', interactivityColors[sectionIndex])
      .attr('stroke-width', 3)
      .attr('stroke-opacity', 0.8)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight on hover
        d3.select(this)
          .transition().duration(200)
          .attr('fill-opacity', 0.3)
          .attr('stroke-width', 4);
        
        // Show detailed tooltip
        showTooltip(event, section.name, section.description, 'Interactivity Layer');
      })
      .on('mouseout', function(event, d) {
        // Reset on mouse out
        d3.select(this)
          .transition().duration(200)
          .attr('fill-opacity', 0.15)
          .attr('stroke-width', 3);
        
        hideTooltip();
      });
    
    // Section title - larger and more prominent
    const sectionTextAngle = (sectionStartAngle + sectionEndAngle) / 2;
    const sectionTextRadius = radius * 0.71;
    const sectionX = Math.sin(sectionTextAngle) * sectionTextRadius;
    const sectionY = -Math.cos(sectionTextAngle) * sectionTextRadius;
    let sectionRotation = sectionTextAngle * 180 / Math.PI;
    
    if (sectionRotation > 90 && sectionRotation < 270) {
      sectionRotation += 180;
    }
    
    g.append('text')
      .attr('transform', `translate(${sectionX}, ${sectionY}) rotate(${sectionRotation})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', interactivityColors[sectionIndex])
      .attr('font-size', '25px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(section.name);
  });
  
  // Add sub-components in a separate, cleaner ring
  const subComponentArc = d3.arc()
    .innerRadius(radius * 0.68)
    .outerRadius(radius * 0.83);
  
  // Create individual sub-component segments
  let globalComponentIndex = 0;
  interactivityConfig.forEach((section, sectionIndex) => {
    const componentsPerSection = section.components.length;
    const sectionAngleSize = section.sweep;
    const componentAngleSize = sectionAngleSize / componentsPerSection;
    
    section.components.forEach((component, compIndex) => {
      const componentStartAngle = (section.angle + componentAngleSize * compIndex - 90) * Math.PI / 180;
      const componentEndAngle = (section.angle + componentAngleSize * (compIndex + 1) - 90) * Math.PI / 180;
      
      // Individual component arc
      g.append('path')
        .attr('d', subComponentArc({
          startAngle: componentStartAngle,
          endAngle: componentEndAngle
        }))
        .attr('fill', interactivityColors[sectionIndex])
        .attr('fill-opacity', 0.25)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .style('cursor', 'pointer')
        .on('mouseover', function(event) {
          // Highlight sub-component
          d3.select(this)
            .transition().duration(150)
            .attr('fill-opacity', 0.4)
            .attr('stroke-width', 2);
          
          // Show component tooltip
          showTooltip(event, component, `Part of ${section.name} category`, 'Sub-component');
        })
        .on('mouseout', function(event) {
          // Reset sub-component
          d3.select(this)
            .transition().duration(150)
            .attr('fill-opacity', 0.25)
            .attr('stroke-width', 1);
          
          hideTooltip();
        });
      
      // Component text
      const compTextAngle = (componentStartAngle + componentEndAngle) / 2;
      const compTextRadius = radius * 0.77;
      const compX = Math.sin(compTextAngle) * compTextRadius;
      const compY = -Math.cos(compTextAngle) * compTextRadius;
      let compRotation = compTextAngle * 180 / Math.PI;
      
      if (compRotation > 90 && compRotation < 270) {
        compRotation += 180;
      }
      
      // Use full component names (no abbreviation)
      let displayText = component;
      
      g.append('text')
        .attr('transform', `translate(${compX}, ${compY}) rotate(${compRotation})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', '#2C3E50')
        .attr('font-size', '16px')
        .attr('font-weight', '500')
        .style('pointer-events', 'none')
        .text(displayText);
      
      globalComponentIndex++;
    });
  });
  
  // Interactivity overlay completed above

  // Add labeled governance overlay sections
  const governanceLabels = ['Regulatory', 'Ethical', 'Privacy', 'Quality'];
  const governanceColors = ['#8E44AD', '#27AE60', '#E74C3C', '#F39C12']; // Royal purple, forest green, strong red, gold
  const governanceArcOuter = d3.arc()
    .innerRadius(radius * 0.85)  // Brought even closer for smaller diagram
    .outerRadius(radius * .94);
  
  for (let i = 0; i < 4; i++) {
    // Make regulatory section (first one) wider
    let sectionStartAngle, sectionEndAngle;
    if (i === 0) {
      // Regulatory: 0 to 99 degrees (10% wider)
      sectionStartAngle = (-90) * Math.PI / 180;
      sectionEndAngle = (9) * Math.PI / 180;
    } else if (i === 1) {
      // Ethical: 99 to 180 degrees (81 degrees)
      sectionStartAngle = (9) * Math.PI / 180;
      sectionEndAngle = (90) * Math.PI / 180;
    } else if (i === 2) {
      // Privacy: 180 to 270 degrees (90 degrees)
      sectionStartAngle = (90) * Math.PI / 180;
      sectionEndAngle = (180) * Math.PI / 180;
    } else {
      // Quality: 270 to 360 degrees (90 degrees)
      sectionStartAngle = (180) * Math.PI / 180;
      sectionEndAngle = (270) * Math.PI / 180;
    }
    const startAngle = sectionStartAngle;
    const endAngle = sectionEndAngle;
    
    // Add arc
    g.append('path')
      .attr('d', governanceArcOuter({
        startAngle: startAngle,
        endAngle: endAngle
      }))
      .attr('fill', governanceColors[i])
      .attr('fill-opacity', 0.2)
      .attr('stroke', '#8B008B') // Dark magenta border
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '2,4') // Clear dotted pattern
      .style('cursor', 'pointer')
      .on('mouseover', function(event) {
        // Highlight governance section
        d3.select(this)
          .transition().duration(200)
          .attr('fill-opacity', 0.35)
          .attr('stroke-width', 4);
        
        // Show governance tooltip
        const govDescriptions = [
          "Legal frameworks, audit requirements, transparency mandates",
          "Fairness principles, bias mitigation, responsible AI practices", 
          "Data protection, anonymization, secure explanation delivery",
          "Explanation accuracy, consistency, reliability standards"
        ];
        showTooltip(event, governanceLabels[i], govDescriptions[i], 'Governance Layer');
      })
      .on('mouseout', function(event) {
        // Reset governance section
        d3.select(this)
          .transition().duration(200)
          .attr('fill-opacity', 0.2)
          .attr('stroke-width', 3);
        
        hideTooltip();
      });
      
    // Add text label
    const textAngle = (startAngle + endAngle) / 2;
    const textRadius = radius * .89; // Center text in governance overlay ring
    const x = Math.sin(textAngle) * textRadius;
    const y = -Math.cos(textAngle) * textRadius;
    let rotation = textAngle * 180 / Math.PI;
    
    // Flip text if upside down
    if (rotation > 90 && rotation < 270) {
      rotation += 180;
    }
    
    g.append('text')
      .attr('transform', `translate(${x}, ${y}) rotate(${rotation})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#4B0082') // Indigo for text
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(governanceLabels[i]);
  }

  // Old complex governance overlay removed - using simplified version above
  
  // Add center circle - reduced size
  const centerRadius = radius * 0.15;
  g.append('circle')
    .attr('r', centerRadius)
    .style('fill', 'white')
    .style('stroke', '#ddd')
    .style('stroke-width', 3);
  
  // Add center text
  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.5em')
    .style('font-size', '20px')  // Increased from 16px
    .style('font-weight', 'bold')
    .style('fill', '#333')
    .text('XAI ML');
  
  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '1em')
    .style('font-size', '20px')  // Increased from 16px
    .style('font-weight', 'bold')
    .style('fill', '#333')
    .text('Pipeline');
  
  // Add title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('font-weight', 'bold')
    .attr('fill', '#333')
    .text('XAI ML Pipeline Architecture');
  
  // Subtitle removed as requested
  
  // Add layer description - moved to left side
  const layerDesc = svg.append('g')
    .attr('transform', `translate(40, ${height - 140})`);
  
  layerDesc.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('font-size', '16px')
    .attr('font-weight', 'bold')
    .attr('fill', '#333')
    .text('Architecture Layers:');
  
  const layers = [
    'Inner Ring: Operational Layer',
    'Middle Ring: Explanation Layer', 
    'Interactivity Overlay: Stakeholder Engagement',
    'Governance Overlay: Controls & Compliance'
  ];
  
  layers.forEach((layer, i) => {
    layerDesc.append('text')
      .attr('x', 0)
      .attr('y', 18 + (i * 13))
      .attr('font-size', '14px')
      .attr('fill', i === 0 ? '#4A90E2' : (i === 1 ? '#7ED321' : (i === 2 ? '#FF9800' : '#C9302C')))
      .attr('font-weight', i >= 2 ? 'bold' : 'normal')
      .text(layer);
  });
  
  // Overlay descriptions removed as requested
  
  // Add instructions (will be hidden during export)
  svg.append('text')
    .attr('class', 'export-exclude')
    .attr('x', width / 2)
    .attr('y', height - 20)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', '#666')
    .text('Hover over segments for details • Interactive feedback mechanisms');
  
  // Add export functionality
  addExportButton(containerId);
  
  console.log('Created four-layer architecture with:');
  console.log('- Pipeline stages:', pipelineConfig.length);
  console.log('- Explainability functions:', pipelineConfig.reduce((sum, stage) => sum + stage.children.length, 0));
  console.log('- Interactivity sections:', interactivityConfig.length);
  console.log('- Governance sections:', governanceConfig.length);
  console.log('All layers rendered successfully');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  createPipelineFlowDiagram('#pipeline-flow-diagram');
});

// Interactive tooltip functions
function showTooltip(event, title, description, category) {
  // Remove any existing tooltips
  d3.selectAll('.interactive-tooltip').remove();
  
  // Create new tooltip
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'interactive-tooltip')
    .style('position', 'absolute')
    .style('background', 'rgba(44, 62, 80, 0.95)')
    .style('color', 'white')
    .style('padding', '12px 16px')
    .style('border-radius', '8px')
    .style('font-size', '14px')
    .style('font-family', '"Segoe UI", "Roboto", "Inter", sans-serif')
    .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')
    .style('pointer-events', 'none')
    .style('z-index', 1000)
    .style('max-width', '280px')
    .style('opacity', 0);

  // Add content
  tooltip.html(`
    <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${title}</div>
    <div style="font-size: 12px; color: #3498db; margin-bottom: 8px;">${category}</div>
    <div style="line-height: 1.4;">${description}</div>
  `);
  
  // Position tooltip
  const rect = tooltip.node().getBoundingClientRect();
  tooltip
    .style('left', (event.pageX + 15) + 'px')
    .style('top', (event.pageY - rect.height - 10) + 'px')
    .transition().duration(200)
    .style('opacity', 1);
}

function hideTooltip() {
  d3.selectAll('.interactive-tooltip')
    .transition().duration(200)
    .style('opacity', 0)
    .remove();
}

// Add click interactions for layer toggling
function addLayerControls(containerId) {
  const container = d3.select(containerId);
  
  // Add control panel
  const controls = container.insert('div', 'svg')
    .style('margin-bottom', '10px')
    .style('text-align', 'center');
  
  // Layer toggle buttons
  const layers = [
    { name: 'Operational', class: 'operational-layer', color: '#4A90E2' },
    { name: 'Explanation', class: 'explanation-layer', color: '#7ED321' },
    { name: 'Interactivity', class: 'interactivity-layer', color: '#F18F01' },
    { name: 'Governance', class: 'governance-layer', color: '#8E44AD' }
  ];
  
  layers.forEach(layer => {
    controls.append('button')
      .style('margin', '0 5px')
      .style('padding', '8px 12px')
      .style('border', 'none')
      .style('border-radius', '4px')
      .style('background', layer.color)
      .style('color', 'white')
      .style('cursor', 'pointer')
      .style('font-size', '12px')
      .text(`Toggle ${layer.name}`)
      .on('click', function() {
        // Toggle layer visibility (this would need more implementation)
        console.log(`Toggling ${layer.name} layer`);
      });
  });
}

// Add export functionality
function addExportButton(containerId) {
  const container = d3.select(containerId);
  
  // Add export button
  const exportButton = container.insert('div', 'svg')
    .style('text-align', 'right')
    .style('margin-bottom', '10px')
    .append('button')
    .style('padding', '8px 16px')
    .style('background', '#4CAF50')
    .style('color', 'white')
    .style('border', 'none')
    .style('border-radius', '4px')
    .style('cursor', 'pointer')
    .style('font-size', '14px')
    .text('📄 Download PNG for LaTeX')
    .on('click', function() {
      downloadSVGAsPNG(containerId, 'xai-pipeline-diagram', 2); // 2x scale for high quality
    });
}

// Function to convert SVG to PNG and download
function downloadSVGAsPNG(containerId, filename, scale = 1) {
  const svg = d3.select(containerId).select('svg');

  // Temporarily hide elements marked for export exclusion
  const excludedElements = svg.selectAll('.export-exclude');
  excludedElements.style('display', 'none');

  const svgNode = svg.node();

  // Clone SVG to avoid modifying the original during serialization
  const clonedSvg = svgNode.cloneNode(true);

  // Remove export-exclude elements from clone
  const clonedExcluded = clonedSvg.querySelectorAll('.export-exclude');
  clonedExcluded.forEach(el => el.remove());

  const svgData = new XMLSerializer().serializeToString(clonedSvg);

  // Restore hidden elements in original
  excludedElements.style('display', null);

  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Get SVG dimensions from attributes (not bounding box)
  const width = parseInt(svgNode.getAttribute('width')) || 900;
  const height = parseInt(svgNode.getAttribute('height')) || 900;
  canvas.width = width * scale;
  canvas.height = height * scale;
  
  // Create image from SVG
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    // Set white background for LaTeX
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Scale and draw image
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    
    // Convert to PNG and download
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.download = filename + '.png';
      link.href = URL.createObjectURL(blob);
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  };
  
  img.src = url;
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createPipelineFlowDiagram, pipelineConfig };
}