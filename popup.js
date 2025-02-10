document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        if (!currentTab.url.includes("uais.cr.ktu.lt")) {
            
            document.getElementById("calculate").disabled = true;
            document.getElementById("result").textContent = "This extension only works on AIS.";
            return;
        }


        document.getElementById("calculate").addEventListener("click", function () 
        {
            let num1 = parseFloat(document.getElementById("num1").value) || 0;
            let num2 = parseFloat(document.getElementById("num2").value) || 0;
            let op = document.getElementById("op").value;

            let result;
            switch (op) 
            {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 == 0)
                    {
                        result = "Dalyba iš nulio negalima";
                    }
                    else
                    {
                        result = num1 / num2;
                    }
                    break;
            }
            document.getElementById("result").textContent = result;
        });
    });
});