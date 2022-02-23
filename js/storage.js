function isStorageSupported(storageType) {
    var testKey = "__test__";

    try {
        var storage = (storageType === "localStorage")? window.localStorage : window.sessionStorage;
        storage.setItem(testKey, "1");
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

function testStorage(output, storageType) {
    var storage = (storageType === "localStorage")? window.localStorage : window.sessionStorage;
    output.innerHTML += "<h2>" + storageType + "</h2>";
    if (isStorageSupported(storageType)) {
        var counterKey = storageType + "_storageCounter";
        var count = parseInt(storage.getItem(counterKey) || 0) + 1;
        var counter = document.createElement("span");
        counter.id = storageType + "-counter";
        counter.innerHTML = count;

        output.innerHTML += "Counter: ";
        output.append(counter);
        storage.setItem(counterKey, count);
        window.addEventListener('storage', (event) => {
            console.log("[Storage] WARNING: got a new event: " + event.key + "=" + JSON.stringify(event.newValue));
            if (event.key === counterKey) {
                document.getElementById(counter.id).innerHTML = event.newValue;
            }
        });
    } else {
        output.innerHTML += "<strong class=\"red\">WARNING: </strong>" + storageType + " is not supported.";
    }
}

function testIndexedDB(output) {
    output.innerHTML += "<h2>indexedDB</h2>";
    var div = document.createElement("div");
    div.id = "indexeddb-counter";
    output.append(div);

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (indexedDB) {
        var open = indexedDB.open("__testDatabase", 1);

        open.onupgradeneeded = function () {
            var db = open.result;
            var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
            store.createIndex("NameIndex", ["counter"]);
        };

        open.onsuccess = function () {
            var db = open.result;
            var tx = db.transaction("MyObjectStore", "readwrite");
            var store = tx.objectStore("MyObjectStore");

            var getter = store.get(12345);

            getter.onsuccess = function () {
                var cnt = 0;
                if (typeof getter.result == "undefined") {
                    cnt = 1;
                } else {
                    cnt = parseInt(getter.result.counter) + 1;
                }
                document.getElementById("indexeddb-counter").innerHTML = "Counter: " + cnt;
                store.put({id: 12345, counter: cnt});
            };

            tx.oncomplete = function () {
                db.close();
            };
        }
    } else {
        div.innerHTML = "<strong class=\"red\">WARNING: </strong>IndexDB not available.";
    }
}

window.addEventListener("load", () => {
    var output = document.getElementById("storage-output");
    output.innerHTML = "<h1>Storage</h1>";

    testStorage(output, "localStorage");
    testStorage(output, "sessionStorage");
    testIndexedDB(output);
    output.innerHTML += "<hr>";
});
