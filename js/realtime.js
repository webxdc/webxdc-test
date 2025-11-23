window.addEventListener("load", () => {
  let realtimeChannel = null;

  const output = h("div", {style: "margin-bottom: 1em;"});
  const log = (boldText, normalText) => {
    const line = h("div");
    if (boldText) {
      line.append(h("strong", {}, boldText));
    }
    if (normalText) {
      line.append(normalText);
    }
    output.append(line);
  };

  const joinBtn = h("button", {}, "Join");
  joinBtn.onclick = () => {
    realtimeChannel = window.webxdc.joinRealtimeChannel();
    realtimeChannel.setListener((data) => {
      console.log("Received realtime data: ", data);
      const msg = new TextDecoder().decode(data);
      log("RECEIVED: ", msg);
    });
    log("You joined realtime channel.");
  };

  const leaveBtn = h("button", {}, "Leave");
  leaveBtn.onclick = () => {
    realtimeChannel.leave();
    log("You left realtime channel.");
  };

  const sendBtn = h("button", {}, "Send Data");
  sendBtn.onclick = () => {
    const myId = window.webxdc.selfAddr;
    const msg = `Hello from ${myId}`;
    const data = new TextEncoder().encode(msg);
    console.log("Sending message", data);
    realtimeChannel.send(data);
    log("SENT: ", msg);
  };

  document.getElementById("realtime-output").append(
    createHeader("Realtime Channel"),
    h("div", {class: "container"}, output, joinBtn, leaveBtn, sendBtn)
  );
});
