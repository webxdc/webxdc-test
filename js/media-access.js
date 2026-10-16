window.addEventListener("load", () => {
    document.getElementById("camera-access").append(
        createHeader("Media Access"),
        h("div", {class: "container"},
          h("button", {style: "padding: 10px;margin: 10px;", onClick: "checkMediaAccess()"}, "Check Camera access"),
          h("button", {style: "padding: 10px;margin: 10px;", onClick: "requestMediaAccess()"}, "Request Camera access"),
          h("button", {style: "padding: 10px;margin: 10px;", onClick: "spamRequestMediaAccess()"}, "Spam Camera access requests"),
          h("video", {style: "display: none;", id: "camera-video", width: "640", height: "480", autoplay: true}),
         )
    );
    window.checkMediaAccess = () => {
        navigator.permissions.query({name:'camera'}).then((result) => {
            if (result.state === "granted") {
                document.getElementById('camera-access').append(h('div', {class: "green", style: "padding: 10px"}, 'Camera access is granted.'));
            } else {
                document.getElementById('camera-access').append(h('div', {class: "red", style: "padding: 10px"}, 'Camera access is not granted.'));
            }
        });
    }

    window.requestMediaAccess = async () => {
        const videoElement = document.getElementById('camera-video');
        let stream
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (error) {
            document.getElementById('camera-access').append(h('div', {class: "red", style: "padding: 10px"}, `Failed to getUserMedia: ${error}`));
            return
        }
        videoElement.style.display = 'block';
        videoElement.srcObject = stream;
    }

    let intervalId = -1
    let timeoutId = -1
    async function doRequest() {
        console.log('permission request spam: requesting permission...')
        try {
            await navigator.mediaDevices.getUserMedia({ video: true })
        } catch (e) {
            console.log('permission request spam: permission denied', e)
            return
        }
        console.log('permission request spam: permission granted')
    }
    const stopSpam = () => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
    }
    window.spamRequestMediaAccess = async () => {
        stopSpam()

        intervalId = setInterval(doRequest, 500)
        timeoutId = setTimeout(stopSpam, 10_000)
        doRequest()
    }
});