let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(); // Display the current tab

let answers = {};

function showTab() {
    // TODO: All functions get tabs. Maybe it should be a separate function?
    let tabs = document.getElementsByClassName("tab");
    tabs[currentTab].style.display = "block";
    if (tabs[currentTab].id === "summary") {
        for (let i = 0; i < 5; i++) {
            const answer = document.getElementById("answer" + (i + 1));
            answer.innerText = answers[i];
        }
    }
    // ... and fix the Previous/Next buttons:
    if (currentTab === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (currentTab === tabs.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    if (currentTab !== 5) fixStepIndicator(currentTab)
}

function nextPrev(change) {
    // This function will figure out which tab to display
    let tabs = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (currentTab !== 5) if (change === 1 && !validateForm()) return false;
    // Hide the current tab:
    tabs[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + change;

    // if you have reached the end of the form... :
    if (currentTab >= tabs.length) {
        //...the form gets submitted:
        submitForm()
        return false;
    }
    // Otherwise, display the correct tab:
    showTab();
}

function validateForm() {
    let tabs = document.getElementsByClassName("tab");
    let input = tabs[currentTab].querySelectorAll("input, textarea, select");
    // TODO: Should collecting answers be a separate thing at the end? Since the answers are always there, just hidden.
    let answer = "";
    let valid = true;
    if (input[0].type === "radio") {
        valid = false;
        input[0].className += " error"
        input.forEach(radio => {
            if (radio.checked) {
                answer = radio.value;
                valid = true;
                input[0].className = "";
            }
        });
    } else if (input[0].tagName.toLowerCase() === "select") {
        input[0].className.replace(" error", "");
        answer = input[0].value;
        if (answer === "null") {
            valid = false;
            input[0].className += " error"
        }
    }
    else {
        for (let i = 0; i < input.length; i++) {
            answer = input[i].value;
            if (input[i].value === "") {
                input[i].className += " error";
                valid = false;
            }
        }
    }
    if (valid) {
        let step = document.getElementsByClassName("step")[currentTab];
        step.className += " steps-completed";
        let stepToComplete = step.childNodes[1];
        stepToComplete.className = "material-icons steps-icon";
        stepToComplete.innerHTML = "check";
        answers[currentTab] = answer.trim();
    }
    return valid;
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" steps-ongoing steps-selected", "");
        for (let node of x[i].childNodes) {
            if (i !== n) {
                if (node.className === 'steps-sub-title') node.style.display = "none"
            }
        }
    }
    //... and adds the "active" class to the current step:
    x[n].className += " steps-ongoing steps-selected";
}

function submitForm() {
    const form = document.getElementById("regForm");
    form.style.display = "none";
    const submissionPage = document.getElementById("form-success");
    submissionPage.style.display = "";
    return false;
}

function initForm() {
    const submissionPage = document.getElementById("intro");
    submissionPage.style.display = "none";
    const fieldSet = document.getElementById("fieldset");
    fieldSet.style.display = "";
}
