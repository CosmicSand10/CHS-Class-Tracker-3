/*==================================================
    CTE DASHBOARD PRO
    APP.JS
==================================================*/


/*==================================================
    APPLICATION STATE
==================================================*/

const STORAGE_KEY = "cte-dashboard-pro-v1";

const STATE = {

    day: "gold",

    schedule: "regular",

    mode: "auto",

    selectedClass: 0,

    scores: [0,0,0,0,0,0],

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

    modeIndicator: document.getElementById("modeIndicator")

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

    Object.assign(

        STATE,

        JSON.parse(saved)

    );

}



/*==================================================
    HELPERS
==================================================*/

function currentClasses(){

    return CONFIG.classes.filter(

        c=>c.day===STATE.day

    );

}



function currentClass(){

    return CONFIG.classes.find(

        c=>c.id===STATE.selectedClass

    );

}



function currentScore(){

    return STATE.scores[STATE.selectedClass];

}



function totalPoints(){

    return STATE.scores.reduce(

        (a,b)=>a+b,

        0

    );

}



function leaderboard(){

    return CONFIG.classes

        .map(c=>({

            ...c,

            score:STATE.scores[c.id]

        }))

        .sort(

            (a,b)=>b.score-a.score

        );

}



/*==================================================
    CLOCK
==================================================*/

function updateClock(){

    UI.clock.textContent =

        new Date().toLocaleTimeString([],{

            hour:"numeric",

            minute:"2-digit"

        });

}



/*==================================================
    STARTUP
==================================================*/

loadState();

updateClock();

setInterval(updateClock,1000);

/*==================================================
    RENDER FUNCTIONS
==================================================*/

function renderTabs(){

    UI.classTabs.innerHTML = "";

    currentClasses().forEach(c=>{

        const button = document.createElement("button");

        button.className = "classTab";

        button.textContent = c.short;

        button.style.borderColor = c.color;

        if(c.id === STATE.selectedClass){

            button.classList.add("selected");

        }

        button.onclick = ()=>{

            STATE.selectedClass = c.id;

            STATE.mode = "manual";

            saveState();

            render();

        };

        UI.classTabs.appendChild(button);

    });

}



function renderDashboard(){

    const c = currentClass();

    const score = currentScore();

    UI.className.textContent = c.name;

    UI.className.style.color = c.color;

    UI.score.textContent = score;



    const percent = Math.min(

        score / CONFIG.maxPoints * 100,

        100

    );

    UI.progressFill.style.width = percent + "%";

    UI.progressFill.style.background = c.color;



    let stage = CONFIG.stages[0];

    CONFIG.stages.forEach(s=>{

        if(score >= s.points){

            stage = s;

        }

    });

    UI.constructionStage.textContent = stage.name;



    const reward = CONFIG.rewards.find(

        r=>score < r.points

    );



    if(reward){

        UI.rewardName.textContent = reward.name;

        UI.rewardRemaining.textContent =

            `${reward.points-score} Points Remaining`;

    }else{

        UI.rewardName.textContent =

            "🏆 All Rewards Unlocked";

        UI.rewardRemaining.textContent =

            "Congratulations!";

    }

}



function renderLeaderboard(){

    UI.leaderboard.innerHTML = "";

    const medals = ["🥇","🥈","🥉"];

    leaderboard().forEach((c,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `

            <span>

                ${medals[index] || index+1} ${c.short}

            </span>

            <strong>${c.score}</strong>

        `;

        UI.leaderboard.appendChild(li);

    });

}



function renderRewards(){

    UI.rewardList.innerHTML = "";

    const score = currentScore();

    CONFIG.rewards.forEach(r=>{

        const row = document.createElement("div");

        row.className =

            score >= r.points

            ? "rewardItem rewardUnlocked"

            : "rewardItem rewardLocked";

        row.innerHTML = `

            <span>${r.name}</span>

            <strong>${r.points}</strong>

        `;

        UI.rewardList.appendChild(row);

    });

}



function renderCompetition(){

    UI.totalPoints.textContent = totalPoints();

    const leader = leaderboard()[0];

    UI.leaderName.textContent =

        leader.short;

}



/*==================================================
    MASTER RENDER
==================================================*/

function render(){

    renderTabs();

    renderDashboard();

    renderLeaderboard();

    renderRewards();

    renderCompetition();

}



/*==================================================
    INITIAL DRAW
==================================================*/

render();
window.addEventListener("beforeunload", saveState);
