chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && typeof tab.url === "string" && tab.url.includes("uais.cr.ktu.lt")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["js/content.js"]
        });
    }
});