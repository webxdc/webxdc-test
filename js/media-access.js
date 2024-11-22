window.addEventListener("load", () => {
    window.askForMediaAccess = () => {
        navigator.permissions.query({name:'camera'}).then((result) => {
            const videoElement = document.getElementById('camera-video');
            async function startCamera() {
                try {
                    videoElement.style.display = 'block';
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoElement.srcObject = stream;
                } catch (error) {
                    console.error('Error accessing the camera', error);
                }
            }
            if (result.state === "granted") {
                document.getElementById('camera-access').append(h('div', {class: "green", style: "padding: 10px"}, 'Camera access is granted.'));
                startCamera();
            } else {
                document.getElementById('camera-access').append(h('div', {class: "red", style: "padding: 10px"}, 'Camera access is not granted.'));
            }
        });
    }
});