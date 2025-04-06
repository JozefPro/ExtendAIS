document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculate");
    const resetBtn = document.getElementById("reset");
    const errorMsg = document.getElementById("error");
    const studentDataEl = document.getElementById("student-data");
    const moduleContainer = document.getElementById("module-table-container");
    const minBtn = document.getElementById("min");
    const maxBtn = document.getElementById("max");
    const configBtn = document.getElementById("config");

    moduleContainer.style.display = "none"; // Hide module list on load

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        if (!currentTab.url.includes("uais.cr.ktu.lt")) {
            calculateBtn.disabled = true;
            resetBtn.disabled = true;
            calculateBtn.hidden = true;
            resetBtn.hidden = true;
            studentDataEl.hidden = true;
            errorMsg.hidden = false;
            minBtn.hidden = true;  
            maxBtn.hidden = true;   
            configBtn.hidden = true;  
            errorMsg.textContent = "This extension only works on KTU AIS.";
            return;
        } else {
            errorMsg.hidden = true;
            calculateBtn.hidden = false;
            resetBtn.hidden = false;
            studentDataEl.hidden = false;
            minBtn.hidden = false;  
            maxBtn.hidden = false;   
            configBtn.hidden = false;  
        }
    });

    // Save hardcoded modules
    chrome.storage.local.set({ modules: getHardcodedModules() }, () => {
        console.log("Hardcoded modules saved.");
    });

    function displayModules() {
        moduleContainer.style.display = "block"; // Show when triggered
        moduleContainer.innerHTML = "";

        chrome.storage.local.get("modules", (data) => {
            const modules = data.modules || [];
            let totalCredits = 0;
            let totalWeighted = 0;

            for (const mod of modules) {
                const avg = Math.round(mod.marks.reduce((acc, m) => acc + (m.percentage / 100) * m.value, 0));
                totalCredits += mod.credits || 6;
                totalWeighted += avg * (mod.credits || 6);

                const details = document.createElement("details");
                details.className = "collapsible-module module-bubble";

                const summary = document.createElement("summary");
                summary.innerHTML = `
                    <span>${mod.name}</span>
                    <span class="m1">vidurkis: ${avg}</span>
                `;
                details.appendChild(summary);

                const markList = document.createElement("ul");
                for (const mark of mod.marks) {
                    const li = document.createElement("li");
                    li.textContent = `${mark.name}: ${mark.value}`;
                    markList.appendChild(li);
                }

                details.appendChild(markList);
                moduleContainer.appendChild(details);
            }

            const final = (totalWeighted / totalCredits).toFixed(2);
            const totalEl = document.createElement("div");
            totalEl.className = "gpa-total";
            totalEl.innerHTML = `<h3>BENDRAS: ${final}</h3>`;
            moduleContainer.appendChild(totalEl);
        });
    }

    calculateBtn.addEventListener("click", function () {
        chrome.storage.local.get("studentDataArray", function (data) {
            if (data.studentDataArray) {
                const [id, name, surname] = data.studentDataArray;
                studentDataEl.textContent = `Student name: ${name} ${surname}, Student ID: ${id}`;
                displayModules();
            } else {
                studentDataEl.textContent = "Student data not found.";
            }
        });
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

    document.getElementById("min").addEventListener("click", function () {
        alert("MIN button functionality to be implemented");
    });

    document.getElementById("max").addEventListener("click", function () {
        alert("MAX button functionality to be implemented");
    });

    document.getElementById("config").addEventListener("click", function () {
        chrome.windows.create({
            url: "config.html",
            type: "popup",
            width: 600,
            height: 500
        });
    });
});
