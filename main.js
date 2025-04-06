let fillMode = "calc"; // "calc", "min", "max"

document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculate");
    const resetBtn = document.getElementById("reset");
    const minBtn = document.getElementById("min");
    const maxBtn = document.getElementById("max");
    const configBtn = document.getElementById("config");
    const errorMsg = document.getElementById("error");
    const studentDataEl = document.getElementById("student-data");
    const moduleContainer = document.getElementById("module-table-container");

    moduleContainer.style.display = "none";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const isKtuAis = currentTab.url.includes("uais.cr.ktu.lt");

        if (!isKtuAis) {
            calculateBtn.disabled = true;
            resetBtn.disabled = true;
            minBtn.hidden = true;
            maxBtn.hidden = true;
            calculateBtn.hidden = true;
            resetBtn.hidden = true;
            studentDataEl.hidden = true;
            errorMsg.hidden = false;
            errorMsg.textContent = "This extension only works on KTU AIS.";
            return;
        } else {
            errorMsg.hidden = true;
            calculateBtn.hidden = false;
            resetBtn.hidden = false;
            minBtn.hidden = false;
            maxBtn.hidden = false;
            studentDataEl.hidden = false;
        }
    });

    chrome.storage.local.set({ modules: getHardcodedModules() }, () => {
        console.log("Hardcoded modules saved.");
    });

    calculateBtn.addEventListener("click", function () {
        fillMode = "calc";
        runGpaCalculation();
    });

    minBtn.addEventListener("click", function () {
        fillMode = "min";
        runGpaCalculation();
    });

    maxBtn.addEventListener("click", function () {
        fillMode = "max";
        runGpaCalculation();
    });

    resetBtn.addEventListener("click", function () {
        chrome.storage.local.remove("studentDataArray", function () {
            studentDataEl.textContent = "Press calculate GPA.";
            moduleContainer.innerHTML = "";
            moduleContainer.style.display = "none";

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs[0]) chrome.tabs.reload(tabs[0].id);
            });
        });
    });

    configBtn.addEventListener("click", function () {
        chrome.windows.create({
            url: "config.html",
            type: "popup",
            width: 500,
            height: 700
        });
    });
});

function runGpaCalculation() {
    chrome.storage.local.get("studentDataArray", function (data) {
        const studentDataEl = document.getElementById("student-data");
        if (data.studentDataArray) {
            const [id, name, surname] = data.studentDataArray;
            studentDataEl.textContent = `Student name: ${name} ${surname}, Student ID: ${id}`;
            displayModules();
        } else {
            studentDataEl.textContent = "Student data not found.";
        }
    });
}

function displayModules() {
    const moduleContainer = document.getElementById("module-table-container");
    moduleContainer.style.display = "block";
    moduleContainer.innerHTML = "";

    chrome.storage.local.get("modules", (data) => {
        const modules = data.modules || [];
        let totalCredits = 0;
        let totalWeighted = 0;

        for (const mod of modules) {
            let avg = 0;
            let totalWeight = 0;

            for (const m of mod.marks) {
                let value = m.value;

                if (value === null || value === "" || isNaN(value)) {
                    if (fillMode === "calc") value = 0;
                    if (fillMode === "min") value = 5;
                    if (fillMode === "max") value = 10;
                }

                avg += (m.percentage / 100) * value;
                totalWeight += m.percentage;
            }

            if (totalWeight > 0) {
                avg = avg * (100 / totalWeight);
            } else {
                avg = 0;
            }
            

            totalCredits += mod.credits || 6;
            totalWeighted += Math.round(avg) * (mod.credits || 6);

            const details = document.createElement("details");
            details.className = "collapsible-module module-bubble";

            const summary = document.createElement("summary");
            summary.innerHTML = `
                <span>${mod.name}</span>
                <span class="m1">vidurkis: ${Math.round(avg)}</span>
            `;
            details.appendChild(summary);

            const markList = document.createElement("ul");
            for (const mark of mod.marks) {
                const li = document.createElement("li");
                const value = mark.value === "" || mark.value == null || isNaN(mark.value)
                    ? fillMode === "calc" ? 0
                    : fillMode === "min" ? 5
                    : 10
                    : mark.value;
                li.textContent = `${mark.name}: ${value}`;
                markList.appendChild(li);
            }

            details.appendChild(markList);

            const rawAvgParagraph = document.createElement("p");
            rawAvgParagraph.style.marginTop = "8px";
            rawAvgParagraph.style.fontSize = "13px";
            rawAvgParagraph.style.color = "#555";
            rawAvgParagraph.textContent = `Tikslus vidurkis: ${avg.toFixed(2)}`;
            details.appendChild(rawAvgParagraph);

            moduleContainer.appendChild(details);
        }

        const final = (totalWeighted / totalCredits).toFixed(2);
        const totalEl = document.createElement("div");
        totalEl.className = "gpa-total";
        totalEl.innerHTML = `<h3>BENDRAS: ${final}</h3>`;
        moduleContainer.appendChild(totalEl);
    });
}
