# Survey XAI with Conventional ML Pipeline

A comprehensive, continuously updated collection of research references exploring Explainable Artificial Intelligence (XAI) within traditional Machine Learning workflows and domain-specific implementations.

## Overview

This repository provides a systematic framework that connects automated ML processes with human-interpretable decision-making through principled explainability approaches. We emphasize methodological approaches that introduce transparency and interpretability throughout the entire ML ecosystem—from initial data preprocessing through final model deployment.

## Features

- **Interactive Taxonomy Visualization**: D3.js-powered interactive diagram showing 6 fundamental dimensions of XAI
- **Pipeline Architecture Diagram**: Four-layered architecture for integrating explainability throughout the ML pipeline
- **Comprehensive Papers Database**: 65+ research references with extracted data for searchability
- **Collapsible Navigation**: Clean, unified navigation system with state persistence
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

## Quick Start

### Prerequisites

- Python 3.x installed on your system
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Running the Project

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/YOUR_USERNAME/survey-XAI-mlpipeline.git
   cd survey-XAI-mlpipeline
   ```

2. **Start the local web server**:
   ```bash
   python -m http.server 8000
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

4. **To stop the server**, press `Ctrl+C` in the terminal

### Alternative Methods

#### Using Python 2.x:
```bash
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if you have it installed):
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

## Project Structure

```
survey-XAI-mlpipeline/
├── assets/
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   │   ├── navigation.js
│   │   ├── taxonomy-diagram.js
│   │   └── pipeline-flow-diagram.js
│   └── images/           # Image assets
├── domains/              # Domain-specific XAI applications
├── evaluation/           # Evaluation metrics and methods
├── img/                  # Documentation images
├── ml-algorithms/        # Machine learning algorithm references
├── papers/               # Research papers collection
├── search/               # Search functionality
├── index.html            # Home page
├── extracted_papers_data.js  # Papers database
└── README.md             # This file
```

## Taxonomy Framework

Our proposed taxonomy framework encompasses six fundamental dimensions:

1. **Input Data Characteristics** - Understanding the nature and structure of input data
2. **Explanation Methodologies** - Various approaches to generating explanations
3. **Temporal Stages of Explanation** - When explanations are generated in the ML lifecycle
4. **Strategic Approaches to Explanation** - High-level strategies for explainability
5. **XAI Integration within ML Pipelines** - How XAI fits into existing workflows
6. **Domain-Specific XAI Applications** - Applications across different domains

## Pipeline Architecture

The XAI ML Pipeline consists of four layers:

- **Inner Ring (Blue)**: Operational layer with core ML pipeline stages from data preparation to monitoring
- **Middle Ring (Green)**: Explanation layer with causal XAI functions and techniques
- **Outer Ring (Orange)**: Interactivity layer including stakeholders, feedback mechanisms, and impact assessment
- **Governance Overlay (Red)**: Top-level governance controls including regulatory compliance, ethical guidelines, privacy & security, and quality assurance

## Contributing

We welcome contributions to expand and improve our XAI research collection!

### How to Contribute

1. **Fork the repository** on GitHub
2. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/add-new-references
   ```
3. **Make your changes** (add papers, update documentation, fix issues)
4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add new XAI references for domain X"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/add-new-references
   ```
6. **Create a Pull Request** on GitHub
7. **Discuss and review** - we'll review your PR and provide feedback

### Contribution Guidelines

- Ensure new papers include proper citations and metadata
- Follow the existing format for consistency
- Update the taxonomy diagram if adding new categories
- Test your changes locally before submitting
- Provide clear descriptions in your pull requests

## Technology Stack

- **MkDocs Material**: Documentation framework
- **D3.js**: Interactive data visualizations
- **JavaScript**: Client-side interactivity
- **CSS3**: Styling and responsive design
- **Python**: Local development server

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, try a different port:
```bash
python -m http.server 8080
```
Then access at `http://localhost:8080`

### Server Not Starting
- Ensure Python is installed: `python --version`
- Check if you're in the correct directory
- Verify no firewall blocking the port

### Visualizations Not Loading
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure D3.js CDN is accessible

## License

© 2025 Ambreen Hanif

## Contact

For questions, suggestions, or collaboration inquiries, please open an issue on GitHub.

## Acknowledgments

Built with Materials from MkDocs and powered by D3.js for interactive visualizations.
