console.log("GPA Tracker Content Script Loaded!");

const observer = new MutationObserver(() => {
    const studentElement = document.querySelector('p.navbar-text.pull-right');
    if (studentElement) {
        let studentData = studentElement.innerText;
        console.log("Raw Student Data:", studentData);
        
        let regex = /\S+/g;
        let studentDataArray = studentData.match(regex);
        //console.log("Student Data Array:", studentDataArray);

        let studentName = studentDataArray[1] + " " + studentDataArray[2];
        let studentID = studentDataArray[0];

        chrome.storage.local.set({ studentDataArray }, () => 
        {
            console.log("Student data saved:", studentDataArray[1] + " " + studentDataArray[2] + " " + studentDataArray[0]);
        });
        
        observer.disconnect(); // Stop observing once found
    }
});

observer.observe(document.body, { childList: true, subtree: true });