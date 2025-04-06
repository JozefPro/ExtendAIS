document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const index = parseInt(params.get("index"));
    const idInput = document.getElementById("module-id");
    const nameInput = document.getElementById("module-name");
    const creditsInput = document.getElementById("module-credits");
    const marksContainer = document.getElementById("marks-container");

    function createMarkRow(mark = { name: "", percentage: "", value: "" }) {
        const div = document.createElement("div");
        div.className = "mark-row";
        div.innerHTML = `
            <input placeholder="Mark Name" value="${mark.name || ""}">
            <input type="number" placeholder="%" value="${mark.percentage || ""}">
            <input type="number" placeholder="Value" value="${mark.value || ""}">
            <button class="remove">Remove</button>
        `;
        div.querySelector(".remove").addEventListener("click", () => div.remove());
        marksContainer.appendChild(div);
    }

    chrome.storage.local.get("modules", (data) => {
        const modules = data.modules || [];
        const mod = modules[index];

        idInput.value = mod.id;
        nameInput.value = mod.name;
        creditsInput.value = mod.credits;

        mod.marks.forEach(m => createMarkRow(m));

        document.getElementById("save").addEventListener("click", () => {
            mod.name = nameInput.value;
            mod.credits = parseFloat(creditsInput.value);
            mod.marks = [];

            const rows = marksContainer.querySelectorAll(".mark-row");
            rows.forEach(row => {
                const inputs = row.querySelectorAll("input");
                mod.marks.push({
                    name: inputs[0].value,
                    percentage: parseFloat(inputs[1].value),
                    value: inputs[2].value !== "" ? parseFloat(inputs[2].value) : ""
                });
            });

            chrome.storage.local.set({ modules }, () => window.close());
        });
    });

    document.getElementById("add-mark").addEventListener("click", () => createMarkRow());
    document.getElementById("close").addEventListener("click", () => window.close());
});
