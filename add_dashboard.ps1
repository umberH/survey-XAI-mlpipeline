$content = Get-Content 'c:\Users\dumb_\Documents\GitHub\survey-XAI-mlpipeline\assets\js\navigation.js' -Raw

$search = "    document.body.appendChild(toggleBtn);"
$newCode = @"
    document.body.appendChild(toggleBtn);

    // Create header dashboard button
    const headerDashboardBtn = document.createElement('a');
    headerDashboardBtn.href = 'https://xai-dashboard-deploy.streamlit.app/';
    headerDashboardBtn.target = '_blank';
    headerDashboardBtn.className = 'header-dashboard-link';
    headerDashboardBtn.title = 'XAI Dashboard';
    headerDashboardBtn.innerHTML = ``
        <svg class="dashboard-icon" viewBox="0 0 24 24">
            <path d="M3,13H11V3H3M3,21H11V15H3M13,21H21V11H13M13,3V9H21V3"/>
        </svg>
        <span>Dashboard</span>
    ``;
    document.body.appendChild(headerDashboardBtn);
"@

$updated = $content -replace [regex]::Escape($search), $newCode
Set-Content 'c:\Users\dumb_\Documents\GitHub\survey-XAI-mlpipeline\assets\js\navigation.js' -Value $updated
