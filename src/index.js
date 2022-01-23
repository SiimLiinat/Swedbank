let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

let answers = {};

function showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (x[n].id === "summary") {
        for (let i = 0; i < 5; i++) {
            const answer = document.getElementById("answer" + (i + 1));
            answer.innerText = answers[i];
        }
    }
    // ... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === x.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    if (currentTab !== 5) fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (currentTab !== 5) if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        submitForm()
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].querySelectorAll("input, textarea, select");
    // A loop that checks every input field in the current tab:
    // TODO: Should collecting answers be a separate thing at the end? Since the answers are always there, just hidden.
    let answer = "";
    if (y[0].type === "checkbox") {
        let value = y[0].checked;
        if (!value) valid = false;
        else answer = "True";
    } else if (y[0].type === "radio") {
        valid = false;
        y.forEach(radio => {
            if (radio.checked) {
                answer = radio.value;
                valid = true;
            }
        });
    } else if (y[0].tagName.toLowerCase() === "select") {
        answer = y[0].value;
    }
    else {
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            answer = y[i].value;
            if (y[i].value === "") {
                // add an "invalid" class to the field:
                y[i].className += " invalid";
                valid = false;
            }
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        let step = document.getElementsByClassName("step")[currentTab];
        step.className += " steps-completed";
        let stepToComplete = step.childNodes[1];
        stepToComplete.className = "material-icons steps-icon";
        stepToComplete.innerHTML = "check";
        answers[currentTab] = answer.trim();
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" steps-ongoing steps-selected", "");
        for (let node of x[i].childNodes) {
            if (i !== n) {
                if (node.className === 'steps-sub-title') node.style.display = "none"
            }
        }
    }
    //... and adds the "active" class to the current step:
    x[n].className += " steps-ongoing steps-selected";
    // hides steps-sub-title from non-active tabs
    for (let node of x[n].childNodes) {
        if (node.className === 'steps-sub-title' && node.style.display === 'none') {
            node.style.display = "inline"
        }
    }
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
