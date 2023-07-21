window.addEventListener("load", () => {
    let container = h("div", {class: "container"});
    document.getElementById("unload-output").append(createHeader("Document Events"), container);
    let events = ["unload", "beforeunload", "visibilitychange", "pagehide"];
    let getInt = (key) => parseInt(window.localStorage.getItem(key) || 0);
    /**
     * Count how many times `sendUpdate` has successfully finished after
     * getting called from each of the event listeners.
     */
    const eventNameToNumWebxdcUpdatesFromIt = {};
    for (const eventName of events) {
        eventNameToNumWebxdcUpdatesFromIt[eventName] = 0;
    }
    window.anotherWebxdcUpdateListener = function (update) {
        if (!update.payload?.isEventCounterUpdate) {
            return;
        }
        const { eventName } = update.payload;
        const newCount =
            eventNameToNumWebxdcUpdatesFromIt[eventName] += 1;
        updateWebxdcUpdatesFromListenerElement(eventName, newCount);
    }
    events.forEach(eventName => {
        container.append(
            h("strong", {}, eventName), " triggered ", h("strong", {id: eventName + "-counter"}, getInt(`docEvent.${eventName}`)), " times",
            ", webxdc.sendUpdate() worked ",
            h("strong", { id: eventName + "-counter-sendUpdate" }, ''),
            " times",
            h("br"),
        );
        updateWebxdcUpdatesFromListenerElement(
            eventName,
            eventNameToNumWebxdcUpdatesFromIt[eventName]
        );
        window.addEventListener(eventName, () => {
            let storageKey = `docEvent.${eventName}`;
            let count = getInt(storageKey) + 1;
            window.localStorage.setItem(storageKey, count);
            document.getElementById(eventName + "-counter").innerHTML = count;

            webxdc.sendUpdate({
                payload: {
                    isEventCounterUpdate: true,
                    eventName: eventName,
                }
            }, `${eventName} event counter`);
        });
    });

    function updateWebxdcUpdatesFromListenerElement(eventName, newWebxdcUpdateCount) {
        const el = document.getElementById(eventName + "-counter-sendUpdate");
        el.innerHTML = newWebxdcUpdateCount;
        const eventCount = getInt(`docEvent.${eventName}`);
        // TODO but this is not updated when only `eventCount` changes.
        // Maybe it makes sense to re-render the whole element.
        el.style.color = eventCount !== newWebxdcUpdateCount
            ? 'red'
            : '';
    }
});
