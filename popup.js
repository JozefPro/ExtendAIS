document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        if (!currentTab.url.includes("uais.cr.ktu.lt")) {
            document.getElementById("calculate").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("error").hidden = false;
            document.getElementById("error").textContent = "This extension only works on KTU AIS.";
            document.getElementById("calculate").hidden = true;
            document.getElementById("reset").hidden = true;
            document.getElementById("student-data").hidden = true;
            return;
        } else {
            document.getElementById("error").hidden = true;
            document.getElementById("calculate").hidden = false;
            document.getElementById("reset").hidden = false;
            document.getElementById("student-data").hidden = false;
        }
        });
    });

    document.getElementById("calculate").addEventListener("click", function () {
        chrome.storage.local.get("studentDataArray", function (data) {
            if (data.studentDataArray) {
                document.querySelector("#student-data").textContent = `Student name: ${data.studentDataArray[1]} ${data.studentDataArray[2]}, Student ID: ${data.studentDataArray[0]}`;
            } else {
                document.querySelector("#student-data").textContent = "Student data not found.";
            }
        });
    });

    document.getElementById("reset").addEventListener("click", function () {
        chrome.storage.local.remove("studentDataArray", function () {
            document.querySelector("#student-data").textContent = "Student data reset.";
    
            // Refresh the active tab to ensure content.js runs again
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});