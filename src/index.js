let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

let answers = {};

function showTab(n) {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    console.log(x[n].id)
    if (x[n].id == "summary") {
        for (let i = 0; i < 6; i++) {
            x[n].appendChild(document.createTextNode("\n" + answers[i]))
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
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    let answer = ""
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        answer += " " + y[i].value;
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    answers[currentTab] = answer.trim();
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        let step = document.getElementsByClassName("step")[currentTab];
        step.className += " steps-completed";
        let stepToComplete = step.childNodes[1];
        stepToComplete.className = "material-icons steps-icon";
        stepToComplete.innerHTML = "check";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" steps-ongoing steps-selected", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " steps-ongoing steps-selected";
}
