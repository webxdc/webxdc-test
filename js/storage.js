function isStorageSupported(storageType) {
    let testKey = "__test__";

    try {
        let storage = (storageType === "localStorage")? window.localStorage : window.sessionStorage;
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

function testStorage(output, storageType) {
    let storage = (storageType === "localStorage")? window.localStorage : window.sessionStorage;
    output.appendChild(h("h3", {}, storageType));
    if (isStorageSupported(storageType)) {
        let counterKey = storageType + "_storageCounter";
        let count = parseInt(storage.getItem(counterKey) || 0) + 1;

        output.append("Counter: ", h("span", {id: counterKey}, count));
        storage.setItem(counterKey, count);
        window.addEventListener('storage', (event) => {
            console.log("[Storage] WARNING: got a new event: " + event.key + "=" + JSON.stringify(event.newValue));
            if (event.key === counterKey) {
                document.getElementById(counterKey).innerHTML = event.newValue;
            }
        });
    } else {
        output.append(h("strong", {class: "red"}, "WARNING: "), storageType + " is not supported.");
    }
}

function testIndexedDB(output) {
    output.appendChild(h("h3", {}, "indexedDB"));

    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (indexedDB) {
        output.append("Counter: ", h("span", {id: "indexeddb-counter"}));
        let open = indexedDB.open("__testDatabase", 1);

        open.onupgradeneeded = function () {
            let db = open.result;
            let store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
            store.createIndex("NameIndex", ["counter"]);
        };

        open.onsuccess = function () {
            let db = open.result;
            let tx = db.transaction("MyObjectStore", "readwrite");
            let store = tx.objectStore("MyObjectStore");

            let getter = store.get(12345);

            getter.onsuccess = function () {
                let cnt = 0;
                if (typeof getter.result == "undefined") {
                    cnt = 1;
                } else {
                    cnt = parseInt(getter.result.counter) + 1;
                }
                document.getElementById("indexeddb-counter").innerHTML = cnt;
                store.put({id: 12345, counter: cnt});
            };

            tx.oncomplete = function () {
                db.close();
            };
        }
    } else {
        output.append(h("strong", {class: "red"}, "WARNING: "), "IndexDB not available.");
    }
}

/**
 * @param {HTMLElement} output
 */
async function testCacheStorage(output) {
    output.appendChild(h("h3", {}, "CacheStorage"));

    const appendErr = (err) => {
        output.append(h("strong", {class: "red"}, "WARNING: "), "CacheStorage is not supported." + err);
    }
    if (!globalThis.caches) {
        appendErr(`globalThis.caches is ${globalThis.caches}`);
        return;
    }

    try {
        const cache = await caches.open("test-cache");
        const key = 'test-url';
        const res1 = await cache.match(key);
        const initialValue = parseInt(
            res1 != undefined ? await res1.text() : "0"
        );
        await cache.put(key, new Response(initialValue + 1));

        const res2 = await cache.match(key);
        if (res2 == undefined) {
            appendErr('Failed to fetch the value that we just stored');
        }
        const retreived2 = await res2.text()

        output.append("Counter: ", h("span", {}, retreived2));
    } catch (err) {
        appendErr(err);
        return;
    }
}

window.addEventListener("load", () => {
    let div = h("div", {class: "container"});
    testStorage(div, "localStorage");
    testStorage(div, "sessionStorage");
    testIndexedDB(div);
    testCacheStorage(div);
    document.getElementById("storage-output").append(createHeader("Storage"), div);
});
