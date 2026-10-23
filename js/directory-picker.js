// AI-generated.

window.addEventListener("load", () => {
    const DB_NAME = "__directoryPickerTest";
    const STORE = "handles";
    const KEY = "dir";

    const output = document.getElementById("directory-picker-output");
    const log = (cls, text) =>
        output.append(h("div", { class: cls, style: "padding: 10px" }, text));

    function openDb() {
        return new Promise((resolve, reject) => {
            const open = indexedDB.open(DB_NAME, 1);
            open.onupgradeneeded = () => open.result.createObjectStore(STORE);
            open.onsuccess = () => resolve(open.result);
            open.onerror = () => reject(open.error);
        });
    }

    async function idb(mode, op) {
        const db = await openDb();
        try {
            return await new Promise((resolve, reject) => {
                const tx = db.transaction(STORE, mode);
                const req = op(tx.objectStore(STORE));
                tx.oncomplete = () => resolve(req.result);
                tx.onerror = tx.onabort = () => reject(tx.error);
            });
        } finally {
            db.close();
        }
    }

    const saveHandle = (handle) => idb("readwrite", (s) => s.put(handle, KEY));
    const loadHandle = () => idb("readonly", (s) => s.get(KEY));

    async function listDir(handle) {
        const names = [];
        for await (const [name, entry] of handle.entries()) {
            names.push(entry.kind === "directory" ? name + "/" : name);
        }
        return names;
    }

    async function showHandle(handle, { requestPermission }) {
        const opts = { mode: "read" };
        let state = await handle.queryPermission(opts);
        if (state !== "granted" && requestPermission) {
            state = await handle.requestPermission(opts);
        }
        if (state !== "granted") {
            log(
                "red",
                `Directory "${handle.name}": permission is "${state}". Click "Restore saved directory" to re-request.`,
            );
            return;
        }
        const names = await listDir(handle);
        log(
            "green",
            `Directory "${handle.name}" (${names.length} entries): ${names.join(", ")}`,
        );
    }

    window.pickDirectory = async () => {
        if (!window.showDirectoryPicker) {
            log("red", "showDirectoryPicker is not supported.");
            return;
        }
        try {
            const handle = await window.showDirectoryPicker();
            await saveHandle(handle);
            log("green", "Saved the directory handle to IndexedDB.");
            await showHandle(handle, { requestPermission: false });
        } catch (error) {
            log("red", `Failed to pick directory: ${error}`);
        }
    };

    window.restoreDirectory = async () => {
        try {
            const handle = await loadHandle();
            if (!handle) {
                log("red", "No directory handle saved in IndexedDB.");
                return;
            }
            await showHandle(handle, { requestPermission: true });
        } catch (error) {
            log("red", `Failed to restore directory: ${error}`);
        }
    };

    window.showGrantedFolders = async () => {
        if (!window.webxdc?.getGrantedFolders) {
            log("red", "webxdc.getGrantedFolders is not supported.");
            return;
        }
        try {
            const folders = Array.from(await window.webxdc.getGrantedFolders());
            log("green", `getGrantedFolders() returned ${folders.length} folder(s).`);
            for (const handle of folders) {
                await showHandle(handle, { requestPermission: false });
            }
        } catch (error) {
            log("red", `getGrantedFolders() failed: ${error}`);
        }
    };

    output.append(
        createHeader("showDirectoryPicker"),
        h(
            "div",
            { class: "container" },
            h(
                "button",
                {
                    style: "padding: 10px;margin: 10px;",
                    onClick: "pickDirectory()",
                },
                "Pick directory",
            ),
            h(
                "button",
                {
                    style: "padding: 10px;margin: 10px;",
                    onClick: "restoreDirectory()",
                },
                "Restore saved directory",
            ),
            h(
                "button",
                {
                    style: "padding: 10px;margin: 10px;",
                    onClick: "showGrantedFolders()",
                },
                "webxdc.getGrantedFolders()",
            ),
        ),
    );

    loadHandle()
        .then((handle) => {
            if (handle) {
                return showHandle(handle, { requestPermission: false });
            }
        })
        .catch((error) => log("red", `Failed to load saved handle: ${error}`));
});
