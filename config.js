document.addEventListener("DOMContentLoaded", () => {
    const listBody = document.getElementById("module-list-body");

    function loadModules() {
        chrome.storage.local.get("modules", (data) => {
            listBody.innerHTML = "";

            const modules = data.modules || [];
            modules.forEach((mod, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${mod.name}</td>
                    <td>${mod.id}</td>
                    <td>${mod.credits}</td>
                    <td>
                        <button class="edit" data-index="${index}">View and Edit</button>
                        <button class="delete" data-index="${index}">Remove</button>
                    </td>
                `;

                listBody.appendChild(row);
            });

            // Add edit/delete handlers
            document.querySelectorAll(".edit").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.dataset.index;
                    chrome.windows.create({
                        url: `edit_module.html?index=${index}`,
                        type: "popup",
                        width: 600,
                        height: 600
                    });
                });
            });

            document.querySelectorAll(".delete").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.dataset.index;
                    modules.splice(index, 1);
                    chrome.storage.local.set({ modules }, loadModules);
                });
            });
        });
    }

    // Add new module
    document.getElementById("add-module").addEventListener("click", () => {
        chrome.windows.create({
            url: "add_module.html",
            type: "popup",
            width: 600,
            height: 600
        });
    });

    document.getElementById("close").addEventListener("click", () => window.close());

    loadModules();
});
