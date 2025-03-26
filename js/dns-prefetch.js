const getInput = () => document.getElementById("dns-prefetch-domain-input");

function dnsPrefetchUpdateLocation() {
    let domain = getInput().value;
    top.location = "https://" + domain
    alert('Please check DNS record')
}

function dnsPrefetchAddIframe() {
    const domain = getInput().value;
    const iframe = document.createElement('iframe')
    iframe.src = "https://" + domain
    getInput().parentElement.appendChild(iframe)
}

function dnsPrefetchAddPrefetch() {
    const domain = getInput().value;
    document.getElementById('dns-prefetch-frame').srcdoc =
        `<link rel="dns-prefetch" href="https://${domain}" /> dns prefetch: ${domain}`;
}
