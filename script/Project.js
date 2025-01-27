const groupSizeEl = document.getElementById("GroupSize");
const discRateEl = document.getElementById("discRate");
const lnameEl = document.getElementById("lastname");
const fnameEl = document.getElementById("firstname");
const adviceEl = document.getElementById("advice");
const [addBtn, delBtn, sortBtn] = document.getElementsByClassName("buttons");
const DAILY_RATE_PER_PERSON = 50;
const membersEl = document.getElementById("members");
const beeEl = document.getElementById("bee");
const perchEL = document.getElementById("perch");


function checkForGroupMemberInput() {
    if (lnameEl.value === "" || fnameEl.value === " ") {
        throw ("Please enter a group member's  name");
    }
}

function checkForGroupSizeInput() {
    if ((isNaN(groupSizeEl.value))) {
        throw ("Invalid input. please enter a numeric value for group size.");
    }
    if (groupSizeEl.value === "") {
        throw "Group size is empty. please enter a number."
    }
    return parseInt(groupSizeEl.value);
}

function calcDiscountedAmount(groupSize, rate) {
    if (groupSize >= 5 && groupSize <= 10) {
        return rate * 0.90;
    } else if (groupSize >= 11 && groupSize <= 24) {
        return rate * 0.80;
    } else if (groupSize >= 25) {
        return rate * 0.75
    }
    return rate
}

function calcGroupDiscount() {
    try {
        const size = checkForGroupSizeInput();
        discRateEl.value = calcDiscountedAmount(size, DAILY_RATE_PER_PERSON)
    } catch (error) {
        alert(error)
    }

}

function addGroupMember() {

    try {
        checkForGroupMemberInput();
        const name = `${lnameEl.value}, ${fnameEl.value}`
        membersEl.options[membersEl.options.length] = new Option(name, name);
        fnameEl.value = "";
        lnameEl.value = "";
        lnameEl.focus();
    } catch (error) {
        alert(error)
    }
}

function removeGroupMember() {
    if (membersEl.options.length === 0) {
        alert("There are no group members to delete!");
        return;
    }
    membersEl.remove(membersEl.selectedIndex);
}

function sortGroupMembers() {
    const oldOptions = [...membersEl.options];
    oldOptions.sort((a, b) => a.value > b.value ? 1 : -1);
    membersEl.innerHTML = ""
    oldOptions.forEach((option, idx) => membersEl[idx] = option);
}

//used promise to make bee visible after 10 seconds.
const makeBeeVisible = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            beeEl.style.visibility = "visible"
            return resolve('resolved!')
        }, 10000);
    })
}


function flyingBee() {
    const beeMovement = beeEl.animate([
        {transform: `translate(930px,230px)`}
    ], {duration: 5000, fill: 'forwards'});
    beeMovement.addEventListener('finish', () =>
        adviceEl.style.display = "block"
    )
}


addBtn.addEventListener('click', addGroupMember);
groupSizeEl.addEventListener('blur', calcGroupDiscount)
delBtn.addEventListener('click', removeGroupMember);
sortBtn.addEventListener('click', sortGroupMembers);
//made the bee visible and then make it fly.
makeBeeVisible().then(() => flyingBee());
