/*==================================================
    CTE DASHBOARD PRO
==================================================*/


/*==================================================
    STORAGE
==================================================*/

const STORAGE_KEY = "cte-dashboard-pro-v1";


/*==================================================
    APPLICATION STATE
==================================================*/

const STATE = {

    day: "gold",

    schedule: "regular",

    mode: "auto",

    selectedClass: 0,

    currentBlock: null,

    scores:[0,0,0,0,0,0],

    lastChange: null,

    controlsLocked: false,

    champions: []

};
/*==================================================
    UI CACHE
==================================================*/
const UI = {

    classTabs: document.getElementById("classTabs"),

    className: document.getElementById("className"),

    score: document.getElementById("score"),

    progressFill: document.getElementById("progressFill"),

    constructionStage: document.getElementById("constructionStage"),

    rewardName: document.getElementById("rewardName"),

    rewardRemaining: document.getElementById("rewardRemaining"),

    leaderboard: document.getElementById("leaderboard"),

    rewardList: document.getElementById("rewardList"),

    totalPoints: document.getElementById("totalPoints"),

    leaderName: document.getElementById("leaderName"),

    clock: document.getElementById("clock"),

    modeIndicator: document.getElementById("modeIndicator"),

    classView: document.getElementById("classView"),

    statusView: document.getElementById("statusView"),

    statusIcon: document.getElementById("statusIcon"),

    statusTitle: document.getElementById("statusTitle"),

    statusMessage: document.getElementById("statusMessage"),

    teacherOverlay: document.getElementById("teacherOverlay"),

    teacherButton: document.getElementById("teacherButton"),

    closeTeacher: document.getElementById("closeTeacher"),

    monthlyReset: document.getElementById("monthlyReset"),

    lockButton: document.getElementById("lockButton")
};


/*==================================================
    STORAGE
==================================================*/

function saveState(){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(STATE)

    );

}


function loadState(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(!saved){

        return;

    }

    const data = JSON.parse(saved);

    Object.assign(STATE,data);

}


/*==================================================
    HELPERS
==================================================*/

function currentClass(){

    return CONFIG.classes.find(

        c=>c.id===STATE.selectedClass

    );

}


function currentClasses(){

    return CONFIG.classes.filter(

        c=>c.day===STATE.day

    );

}


function currentScore(){

    return STATE.scores[STATE.selectedClass];

}


function leaderboard(){

    return CONFIG.classes

        .map(c=>({

            ...c,

            score:STATE.scores[c.id]

        }))

        .sort((a,b)=>b.score-a.score);

}


function totalPoints(){

    return STATE.scores.reduce(

        (a,b)=>a+b,

        0

    );

}


function currentStage(){

    let stage = CONFIG.stages[0];

    CONFIG.stages.forEach(s=>{

        if(currentScore()>=s.points){

            stage=s;

        }

    });

    return stage;

}


function nextReward(){

    return CONFIG.rewards.find(

        r=>currentScore()<r.points

    );

}


/*==================================================
    CLOCK
==================================================*/

function updateClock(){

    const now = new Date();

    console.log(now);

    UI.clock.textContent = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

}

/*==================================================
    COMMIT CHANGES
==================================================*/

function commit(){

    saveState();

    render();

}

/*==================================================
    STATUS SCREEN
==================================================*/

function renderStatusScreen(){

    const screens = {

        before: {
            icon: "☀️",
            title: "GOOD MORNING!",
            message: "Have an amazing day!"
        },

        passing: {
            icon: "🚶",
            title: "PASSING PERIOD",
            message: "Welcome your next class!"
        },

        lunch: {
            icon: "🍔",
            title: "LUNCH",
            message: "Enjoy your lunch!"
        },

        prep: {
            icon: "📚",
            title: "PREP PERIOD",
            message: "Time to plan and recharge."
        },

        after: {
            icon: "🌙",
            title: "SCHOOL'S OUT",
            message: "Have a great afternoon!"
        }

    };

    const screen = screens[STATE.currentBlock];

    if(!screen) return;

    UI.statusIcon.textContent = screen.icon;
    UI.statusTitle.textContent = screen.title;
    UI.statusMessage.textContent = screen.message;

}

/*==================================================
    CONFIGURATION DISPLAY
==================================================*/

function renderConfiguration(){

    document.title =
        CONFIG.dashboard.title;

    const pageTitle =
        document.getElementById("pageTitle");

    const dashboardTitle =
        document.getElementById("dashboardTitle");

    const dashboardSubtitle =
        document.getElementById("dashboardSubtitle");

    if(pageTitle){

        pageTitle.textContent =
            CONFIG.dashboard.title;

    }

    if(dashboardTitle){

        dashboardTitle.textContent =
            CONFIG.dashboard.title;

    }

    if(dashboardSubtitle){

        dashboardSubtitle.textContent =
            CONFIG.dashboard.subtitle;

    }

}
/*==================================================
    RENDER FUNCTIONS
==================================================*/

function renderTabs(){

    UI.classTabs.innerHTML = "";

    currentClasses().forEach(c=>{

        const button = document.createElement("button");

        button.className = "classTab";

        if(c.id === STATE.selectedClass){
            button.classList.add("selected");
        }

        button.textContent = c.short;

        button.style.borderColor = c.color;

        button.addEventListener("click",()=>{

            STATE.selectedClass = c.id;

            STATE.mode = "manual";

            saveState();

            render();

        });

        UI.classTabs.appendChild(button);

    });

}



function renderDashboard(){

    const c = currentClass();

    UI.className.textContent = c.name;

    UI.className.style.color = c.color;

    UI.score.textContent = currentScore();



    const percent =

        (currentScore() / CONFIG.maxPoints) * 100;

    UI.progressFill.style.width =

        Math.min(percent,100) + "%";

    UI.progressFill.style.background = c.color;



    UI.constructionStage.textContent =

        currentStage().name;



    const reward = nextReward();

    if(reward){

        UI.rewardName.textContent = reward.name;

        UI.rewardRemaining.textContent =

            `${reward.points-currentScore()} Points Remaining`;

    }else{

        UI.rewardName.textContent =

            "🏆 All Rewards Unlocked";

        UI.rewardRemaining.textContent =

            "Completed!";

    }

}



function renderLeaderboard(){

    UI.leaderboard.innerHTML = "";

    const medals = ["🥇","🥈","🥉"];

    leaderboard().forEach((c,index)=>{

        const li = document.createElement("li");

        li.innerHTML =

        `

        <span>

            ${medals[index] || index+1} ${c.short}

        </span>

        <strong>

            ${c.score}

        </strong>

        `;

        UI.leaderboard.appendChild(li);

    });

}



function renderRewards(){

    UI.rewardList.innerHTML = "";

    CONFIG.rewards.forEach(reward=>{

        const row = document.createElement("div");

        row.className =

            currentScore() >= reward.points

            ? "rewardItem rewardUnlocked"

            : "rewardItem rewardLocked";

        row.innerHTML =

        `

        <span>${reward.name}</span>

        <strong>${reward.points}</strong>

        `;

        UI.rewardList.appendChild(row);

    });

}



function renderCompetition(){

    UI.totalPoints.textContent =

        totalPoints();

    UI.leaderName.textContent =

        leaderboard()[0].short;

}



/*==================================================
    MASTER RENDER
==================================================*/

function render(){

    renderConfiguration();

    renderTabs();

    renderDashboard();

    renderLeaderboard();

    renderRewards();

    renderCompetition();

    updateSelectedButtons();

}
/*==================================================
    BUTTON HELPERS
==================================================*/

function updateSelectedButtons(){

    document.querySelectorAll("#controls .segmented button")
        .forEach(button => button.classList.remove("selected"));

    document
        .getElementById(STATE.day === "gold" ? "goldButton" : "redButton")
        .classList.add("selected");

    document
        .getElementById(STATE.schedule + "Button")
        .classList.add("selected");

    document
        .getElementById(STATE.mode + "Button")
        .classList.add("selected");

    UI.modeIndicator.textContent =
        STATE.mode === "auto"
            ? "🟢 AUTO"
            : "🟡 MANUAL";

}


/*==================================================
    SCORE
==================================================*/

function changeScore(amount){

    if(STATE.controlsLocked) return;

    const id = STATE.selectedClass;

    STATE.lastChange = amount;

    STATE.scores[id] += amount;

    STATE.scores[id] = Math.max(
        0,
        Math.min(CONFIG.maxPoints, STATE.scores[id])
    );

    commit();

}


/*==================================================
    POINT BUTTONS
==================================================*/

document.querySelectorAll(".pointButton").forEach(button=>{

    button.addEventListener("click",()=>{

        changeScore(Number(button.dataset.points));

    });

});


/*==================================================
    UNDO
==================================================*/

document
.getElementById("undoButton")
.addEventListener("click",()=>{

    if(STATE.lastChange===null) return;

    changeScore(-STATE.lastChange);

    STATE.lastChange=null;

});


/*==================================================
    DAY BUTTONS
==================================================*/

document
.getElementById("goldButton")
.addEventListener("click",()=>{

    STATE.day="gold";
    STATE.selectedClass=0;

    commit();

});


document
.getElementById("redButton")
.addEventListener("click",()=>{

    STATE.day="red";
    STATE.selectedClass=3;

    commit();

});


/*==================================================
    SCHEDULE
==================================================*/

["regular","wednesday","dwsd"].forEach(schedule=>{

    document
    .getElementById(schedule+"Button")
    .addEventListener("click",()=>{

        STATE.schedule=schedule;

        commit();

    });

});


/*==================================================
    MODE
==================================================*/

document
.getElementById("autoButton")
.addEventListener("click",()=>{

    STATE.mode="auto";

    commit();

});


document
.getElementById("manualButton")
.addEventListener("click",()=>{

    STATE.mode="manual";

    commit();

});

/*==================================================
    TEACHER MENU
==================================================*/

UI.teacherButton.addEventListener("click",()=>{

    UI.teacherOverlay.classList.remove("hidden");

});


UI.closeTeacher.addEventListener("click",()=>{

    UI.teacherOverlay.classList.add("hidden");

});
/*==================================================
    MONTHLY RESET
==================================================*/

UI.monthlyReset.addEventListener("click",()=>{

    if(!confirm("Reset all classes for a new month?")){

        return;

    }

    STATE.scores = STATE.scores.map(()=>0);

    STATE.lastChange = null;

    commit();

});

/*==================================================
    LOCK CONTROLS
==================================================*/

UI.lockButton.addEventListener("click",()=>{

    STATE.controlsLocked = !STATE.controlsLocked;

    UI.lockButton.textContent =

        STATE.controlsLocked

        ? "🔓 Unlock Controls"

        : "🔒 Lock Controls";

    commit();

});

/*==================================================
    TIME HELPERS
==================================================*/

function timeToMinutes(time){

    const [h,m]=time.split(":").map(Number);

    return h*60+m;

}



function currentMinutes(){

    const now=new Date();

    return now.getHours()*60+now.getMinutes();

}

/*==================================================
    FIND CURRENT BLOCK
==================================================*/

function getCurrentBlock(){

    const schedule =
        CONFIG.schedules[STATE.schedule][STATE.day];

    const now=currentMinutes();

    for(const block of schedule){

        const start=timeToMinutes(block.start);

        const end=timeToMinutes(block.end);

        if(now>=start && now<end){

            return block;

        }

    }

    return null;

}
/*==================================================
    AUTO SCHEDULER
==================================================*/

/*==================================================
    AUTO SCHEDULER
==================================================*/

function updateAutomaticClass(){

    if(STATE.mode !== "auto"){
        return;
    }

    const block = getCurrentBlock();

    if(!block){
        return;
    }

    if(block.classId === undefined){
        return;
    }

    if(STATE.selectedClass !== block.classId){

        STATE.selectedClass = block.classId;

        commit();

    }

}
/*==================================================
    TEST MODE
==================================================*/

function initializeTestButtons(){

    UI.testButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const status = button.dataset.status;

            if(status === "auto"){

                STATE.mode = "auto";

                updateAutomaticClass();

                return;

            }

            STATE.mode = "manual";

            STATE.currentBlock = status;

            render();

        });

    });

}
/*==================================================
    INITIALIZE
==================================================*/

window.addEventListener("beforeunload", saveState);

loadState();

updateClock();

updateAutomaticClass();

setInterval(updateClock,1000);

setInterval(updateAutomaticClass,30000);

render();
