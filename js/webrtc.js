//@ts-check
/**
 * @typedef {{
 *   type: 'connected',
 *   candidate: RTCIceCandidate,
 * } | {
 *   type: 'executionError',
 *   error: any
 * } | {
 *   type: 'noCandidates',
 *   candidates: string,
 * }} IceLeakTestResult
 */

/**
 * @returns {Promise<IceLeakTestResult>}
 */
function tryIceLeak(RTCPeerConnectionClass) {
    return new Promise(async resolve => {
        try {
            const pc = new RTCPeerConnectionClass({
                iceServers: [
                    { urls: ['stun:stun.l.google.com:19302'] },
                    // stun.l.google.com, but by IP, in case DNS doesn't work.
                    { urls: ['stun:173.194.76.127:19302'] },
                    { urls: ['stun:stun.voipgate.com:3478'] },
                    // This will not generate candidates,
                    // because it's not a TURN server.
                    // But this helps see e.g. with Wireshark
                    // whether the browser will attempt to gather
                    // relay (TURN) candidates.
                    {
                        urls: ['turn:173.194.76.127:19302'],
                        username: 'foo',
                        credential: 'bar',
                    },
                ]
            });
            
            /**
             * @param {RTCIceCandidate} candidate
             */
            function isCandidateReflexive(candidate) {
                // This includes `prflx`, `srflx`, `relay`.
                // `candidate.type` is not implemented in e.g. Firefox.
                return (
                    (candidate.type && candidate.type !== 'host')

                    || candidate.candidate.includes(' srflx')
                    || candidate.candidate.includes(' relay')
                    || candidate.candidate.includes(' prflx')
                );
            }
            /**
             * @param {RTCIceCandidate} candidate
             */
            function resolveConnected(candidate) {
                resolve({ type: 'connected', candidate });
            }
            const allCandidates = [];
            pc.addEventListener('icecandidate', e => {
                allCandidates.push(e.candidate && e.candidate.candidate);
                if (e.candidate == null || e.candidate.candidate === '') {
                    // Gathering completed.
                    // If `resolve` hasn't been called yet, resolve with `noCandidates`.
                    resolve({
                        type: 'noCandidates',
                        candidates: allCandidates.join('\n'),
                    });

                    return;
                }
                if (isCandidateReflexive(e.candidate)) {
                    return resolveConnected(e.candidate);
                }
            });

            // So that an offer is actually generated.
            pc.createDataChannel('dummyName');
            
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
        } catch (error) {
            resolve({ type: 'executionError', error })
        }
    });
}

window.addEventListener("load", () => {
    // TODO try to do this inside an iframe, in case someone simply did
    // `window.RTCPeerConnection = null`.
    // A fresh iframe should have its `window.RTCPeerConnection` untouched.
    // https://docs.ipdata.co/docs/how-to-get-a-clients-ip-address-using-javascript

    /** @type {HTMLIFrameElement} */
    const iframeRegularEl = document.getElementById('iframe-regular');
    const iframeRegularWindow = iframeRegularEl?.contentWindow;
    /** @type {HTMLIFrameElement} */
    const iframeAllowSameOrigin = document.getElementById('iframe-allow-same-origin');
    const iframeAllowSameOriginWindow = iframeAllowSameOrigin?.contentWindow?.window;
    const iframeRegularElDoc = iframeRegularEl.contentDocument
    iframeRegularElDoc.body.innerHTML += "<iframe id=i></iframe>"
    const iframeNotInitedWindow = iframeRegularElDoc?.getElementById("i").contentWindow.window;
    const tests = [
        ["RTCPeerConnection", window.RTCPeerConnection],
        ["mozRTCPeerConnection", window.mozRTCPeerConnection],
        ["webkitRTCPeerConnection", window.webkitRTCPeerConnection],
        ["iframe allow-same-origin RTCPeerConnection", iframeAllowSameOriginWindow?.RTCPeerConnection],
        ["iframe allow-same-origin mozRTCPeerConnection", iframeAllowSameOriginWindow?.mozRTCPeerConnection],
        ["iframe allow-same-origin webkitRTCPeerConnection", iframeAllowSameOriginWindow?.webkitRTCPeerConnection],
        ["iframe regular RTCPeerConnection", iframeRegularWindow?.RTCPeerConnection],
        ["iframe regular mozRTCPeerConnection", iframeRegularWindow?.mozRTCPeerConnection],
        ["iframe regular webkitRTCPeerConnection", iframeRegularWindow?.webkitRTCPeerConnection],
        ["iframe regular uninitialized RTCPeerConnection", iframeNotInitedWindow?.RTCPeerConnection],
        ["iframe regular uninitialized mozRTCPeerConnection", iframeNotInitedWindow?.mozRTCPeerConnection],
        ["iframe regular uninitialized webkitRTCPeerConnection", iframeNotInitedWindow?.webkitRTCPeerConnection],
    ];
    const elements = [];
    const testPromises = [];
    let allPassed = true;
    for (const [RTCPCName, RTCPeerConnectionClass] of tests) {
        const resultEl = document.createElement('span');
        const wrapperEl = h("p", {},
            h("strong", {}, `${RTCPCName}: `),
            resultEl,
        );
        wrapperEl.style.display = 'none';
        elements.push(wrapperEl);
        resultEl.innerText = 'checking...';
        const p = tryIceLeak(RTCPeerConnectionClass).then(res => {
            switch (res.type) {
                case 'connected': {
                    resultEl.style.color = 'red';
                    const str = (
                        res.candidate.address
                        && res.candidate.type
                    )
                        ? `your IP: ${res.candidate.address}, ${res.candidate.type}`
                        : res.candidate.candidate;
                    resultEl.innerText = `BAD: connected: ${str}`;
                    wrapperEl.style.display = '';
                    allPassed = false;
                    break;
                }
                case 'executionError': {
                    resultEl.innerText = `GOOD: execution error: ${res.error}`;
                    break;
                }
                case 'noCandidates': {
                    resultEl.innerText = `GOOD: got no reflexive candidates:\n${res.candidates}`;
                    break;
                }
            }
        });
        testPromises.push(p);
    }
    const resultsHeader = h("strong", {}, "checking...")
    Promise.all(testPromises).then(() => {
        resultsHeader.innerText = allPassed
            ? `GOOD: passed all ${tests.length} tests`
            : "Leaking via ...";
    });

    document.getElementById("webrtc-output").append(
        createHeader("webrtc-sidechannel"),
        h(
            "p",
            {},
            "RTCPeerConnection object: " + globalThis.__capturedWebRTCObj,
        ),
        h("div", {class: "container"},
            resultsHeader,
            ...elements
        )
    );
});
