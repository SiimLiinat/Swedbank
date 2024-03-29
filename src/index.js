let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(); // Display the current tab

let answers = {};

function showTab() {
    // TODO: All functions get tabs. Maybe it should be a separate function?
    let tabs = document.getElementsByClassName("tab");
    tabs[currentTab].style.display = "block";
    if (tabs[currentTab].id === "summary") {
        for (let i = 0; i < 5; i++) {
            if (i === 4) {
                const answer1 = document.getElementById("answer" + (i + 1) + "-1");
                answer1.checked = answers[i][0];
                const answer2 = document.getElementById("answer" + (i + 1) + "-2");
                answer2.checked = answers[i][1];
            } else {
                const answer = document.getElementById("answer" + (i + 1));
                answer.innerText = answers[i];
            }
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
    fixStepIndicator();
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
        document.getElementById("purpose-alert").style.display = valid ? "none" : "";
    } else if (input[0].tagName.toLowerCase() === "select") {
        input[0].className.replace(" error", "");
        answer = input[0].value;
        if (answer === "null") {
            valid = false;
            const leaseTypeAlert = document.getElementById("lease-type-alert");
            leaseTypeAlert.style.display = "";
        }
    } else if (input[0].type === "checkbox") {
        answer = [input[0].checked, input[1].checked];
    } else {
        for (let i = 0; i < input.length; i++) {
            answer = input[i].value.trim();
            if (!log(input[i])) {
                valid = false;
            }
        }
    }
    let step = document.getElementsByClassName("step")[currentTab];
    let stepToComplete = step.childNodes[1];
    if (valid) {
        // TODO: Separate function for every class appendment
        if (!step.className.includes("steps-completed")) step.className += " steps-completed";
        stepToComplete.className = "material-icons steps-icon";
        stepToComplete.innerHTML = "check";
        answers[currentTab] = answer;
    } else {
        step.className = step.className.replace(" steps-completed", " steps-selected steps-ongoing");
        stepToComplete.className = "steps-number";
        stepToComplete.innerHTML = currentTab + 1;
    }
    return valid;
}

function fixStepIndicator() {
    // This function removes the "active" class of all steps...
    let step = document.getElementsByClassName("step");
    for (let i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(" steps-ongoing", "");
        step[i].className = step[i].className.replace(" steps-selected", "");
    }
    //... and adds the "active" class to the current step:
    if (currentTab !== 5) {
        if (!step[currentTab].className.includes("steps-completed")) step[currentTab].className += " steps-ongoing steps-selected";
        else {
            step[currentTab].className += " steps-selected";
        }
    }
}

function submitForm() {
    const form = document.getElementById("regForm");
    form.className += " d-none";
    const submissionPage = document.getElementById("form-success");
    submissionPage.className = submissionPage.className.replace("d-none", "");
    return false;
}

function initForm() {
    const submissionPage = document.getElementById("intro");
    submissionPage.style.display = "none";
    document.getElementById("fieldset").className = "";
}

function log(target) {
    if (target.type === "text" || target.type === "textarea") {
        const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const value = target.value;
        if ((value.length === 0 || (target.type === "text" && format.test(value)))) {
            if (!target.parentNode.className.includes("has-error")) target.parentNode.className += " has-error";
            return false;
        }
        else if (target.parentNode.className.includes("has-error")) event.target.parentNode.className = event.target.parentNode.className.replace("has-error", "");
        return true;
    } else if (target.type === "select-one") {
        const leaseTypeAlert = document.getElementById("lease-type-alert");
        if (target.value === "null") {
            leaseTypeAlert.className = leaseTypeAlert.className.replace("d-none", "");
        } else if (!leaseTypeAlert.className.includes("d-none")) {
            leaseTypeAlert.className += " d-none"
        }
    } else if (target.type === "radio") {
        const purposeAlert = document.getElementById("purpose-alert");
        purposeAlert.className = purposeAlert.className.replace("d-none", "");
    }
}
