#!/usr/bin/env python3
# Add dashboard button to navigation.js

file_path = r'c:\Users\dumb_\Documents\GitHub\survey-XAI-mlpipeline\assets\js\navigation.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

search_text = "    document.body.appendChild(toggleBtn);"

replacement_text = """    document.body.appendChild(toggleBtn);

    // Create header dashboard button
    const headerDashboardBtn = document.createElement('a');
    headerDashboardBtn.href = 'https://xai-dashboard-deploy.streamlit.app/';
    headerDashboardBtn.target = '_blank';
    headerDashboardBtn.className = 'header-dashboard-link';
    headerDashboardBtn.title = 'XAI Dashboard';
    headerDashboardBtn.innerHTML = `
        <svg class="dashboard-icon" viewBox="0 0 24 24">
            <path d="M3,13H11V3H3M3,21H11V15H3M13,21H21V11H13M13,3V9H21V3"/>
        </svg>
        <span>Dashboard</span>
    `;
    document.body.appendChild(headerDashboardBtn);"""

updated_content = content.replace(search_text, replacement_text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Dashboard button added successfully!")
