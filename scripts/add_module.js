document.addEventListener("DOMContentLoaded", () => {
    const idInput = document.getElementById("module-id");
    const nameInput = document.getElementById("module-name");
    const creditsInput = document.getElementById("module-credits");
    const marksContainer = document.getElementById("marks-container");

    function createMarkRow(mark = { name: "", percentage: "", value: "" }) {
        const div = document.createElement("div");
        div.className = "mark-row";
        div.innerHTML = `
            <input placeholder="Mark Name" value="${mark.name}">
            <input type="number" placeholder="%" value="${mark.percentage}">
            <input type="number" placeholder="Value" value="${mark.value}">
            <button class="remove">🗑️</button>
        `;
        div.querySelector(".remove").addEventListener("click", () => div.remove());
        marksContainer.appendChild(div);
    }
    

    document.getElementById("add-mark").addEventListener("click", () => createMarkRow());

    document.getElementById("save").addEventListener("click", () => {
        const newModule = {
            id: idInput.value,
            name: nameInput.value,
            credits: parseFloat(creditsInput.value),
            marks: []
        };

        const rows = marksContainer.querySelectorAll(".mark-row");
        rows.forEach(row => {
            const inputs = row.querySelectorAll("input");
            newModule.marks.push({
                name: inputs[0].value,
                percentage: parseFloat(inputs[1].value),
                value: inputs[2].value !== "" ? parseFloat(inputs[2].value) : ""
            });
        });

        chrome.storage.local.get("modules", (data) => {
            const modules = data.modules || [];
            modules.push(newModule);
            chrome.storage.local.set({ modules }, () => window.close());
        });
    });

    document.getElementById("close").addEventListener("click", () => window.close());
});
