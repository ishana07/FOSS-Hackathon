/* =========================================
   THIRUKKURAL 131 — THE CHOICE QUEST
   GAME LOGIC
========================================= */


/* =========================================
   GAME DATA
========================================= */

const scenarios = [

    {
        icon: "🏫",
        category: "CLASSROOM",
        title: "The Forgotten Homework",

        description:
            "Your friend forgot to complete their homework. The teacher asks who finished it.",

        choices: [
            {
                text: "🤝 Tell the teacher the truth",
                points: 100,
                feedback:
                    "Excellent! You chose honesty even when it was difficult."
            },

            {
                text: "🤫 Say that your friend completed it",
                points: 20,
                feedback:
                    "Helping a friend is good, but lying can hurt your character."
            }
        ]
    },


    {
        icon: "🍎",
        category: "SCHOOL CANTEEN",
        title: "The Extra Snack",

        description:
            "You receive two snacks by mistake, but your friend behind you gets none.",

        choices: [
            {
                text: "🍎 Return the extra snack",
                points: 100,
                feedback:
                    "Great choice! Doing the right thing matters even when nobody is watching."
            },

            {
                text: "😋 Keep both snacks",
                points: 20,
                feedback:
                    "It may seem small, but good character is built through small choices."
            }
        ]
    },


    {
        icon: "📱",
        category: "FRIENDSHIP",
        title: "The Secret Message",

        description:
            "Your friend sends you a private message and asks you not to share it with anyone.",

        choices: [
            {
                text: "🔒 Respect your friend's privacy",
                points: 100,
                feedback:
                    "Wonderful! Respecting someone's trust shows strong character."
            },

            {
                text: "📢 Share it with your classmates",
                points: 10,
                feedback:
                    "A secret given in trust should be protected."
            }
        ]
    },


    {
        icon: "🌳",
        category: "PLAYGROUND",
        title: "The Broken Plant",

        description:
            "While playing, you accidentally break a plant in your school garden. Nobody saw what happened.",

        choices: [
            {
                text: "🙋 Tell the teacher what happened",
                points: 100,
                feedback:
                    "Brave choice! Taking responsibility is a sign of good conduct."
            },

            {
                text: "🚶 Walk away quietly",
                points: 15,
                feedback:
                    "Doing the right thing matters even when nobody is watching."
            }
        ]
    },


    {
        icon: "🎒",
        category: "SCHOOL",
        title: "The Lost Pencil Box",

        description:
            "You find an expensive pencil box under a classroom desk. You don't know who owns it.",

        choices: [
            {
                text: "📦 Give it to the teacher",
                points: 100,
                feedback:
                    "Excellent! You protected someone else's belongings."
            },

            {
                text: "✏️ Keep it because nobody saw you",
                points: 10,
                feedback:
                    "Character is about doing what is right, even when nobody is watching."
            }
        ]
    }

];


/* =========================================
   GAME VARIABLES
========================================= */

let currentScenario = 0;
let score = 0;


/* =========================================
   GET HTML ELEMENTS
========================================= */
let goodChoiceStreak = 0;

const streakValue =
    document.getElementById("streak-value");

const introScreen =
    document.getElementById("intro-screen");

const questScreen =
    document.getElementById("quest-screen");

const resultScreen =
    document.getElementById("result-screen");

const startButton =
    document.getElementById("start-btn");

const restartButton =
    document.getElementById("restart-btn");

const choicesContainer =
    document.getElementById("choices-container");

const nextButton =
    document.getElementById("next-btn");

const questNodes =
    document.querySelectorAll(".quest-node");

const questLines =
    document.querySelectorAll(".quest-line");

const scoreDisplay =
    document.getElementById("score");

const finalScore =
    document.getElementById("final-score");

const resultMessage =
    document.getElementById("result-message");

const rankBadge =
    document.getElementById("rank-badge");

    const achievementText =
    document.getElementById("achievement-text");
const scenarioNumber =
    document.getElementById("scenario-number");

const progressBar =
    document.getElementById("progress-bar");

const ozhukkamValue =
    document.getElementById("ozhukkam-value");

const ozhukkamBar =
    document.getElementById("ozhukkam-bar");

const scenarioIcon =
    document.getElementById("scenario-icon");

const scenarioCategory =
    document.getElementById("scenario-category");

const scenarioTitle =
    document.getElementById("scenario-title");

const scenarioDescription =
    document.getElementById("scenario-description");


/* =========================================
   START GAME
========================================= */

startButton.addEventListener("click", startGame);


function startGame() {

    currentScenario = 0;
    score = 0;
    goodChoiceStreak = 0;

if (streakValue) {
    streakValue.textContent = "0";
}

    scoreDisplay.textContent = score;

    const meterValue =
    document.getElementById("ozhukkam-value");

const meterBar =
    document.getElementById("ozhukkam-bar");

if (meterValue && meterBar) {
    meterValue.textContent = "0%";
    meterBar.style.width = "0%";
}

    introScreen.classList.remove("active");

    questScreen.classList.add("active");

    loadScenario();

}


/* =========================================
   LOAD SCENARIO
========================================= */

function loadScenario() {

    questNodes.forEach((node, index) => {

    node.classList.remove("active", "completed");

    if (index < currentScenario) {
        node.classList.add("completed");
    }

    if (index === currentScenario) {
        node.classList.add("active");
    }

    if (questLines[index]) {
        questLines[index].classList.toggle(
            "completed",
            index < currentScenario
        );
    }

});

    const scenario = scenarios[currentScenario];

    scenarioNumber.textContent =
    `CHALLENGE ${String(currentScenario + 1).padStart(2, "0")} / ${scenarios.length}`;

    scenarioIcon.textContent =
        scenario.icon;

    scenarioCategory.textContent =
        scenario.category;

    scenarioTitle.textContent =
        scenario.title;

    scenarioDescription.textContent =
        scenario.description;


    /* Update progress */

    const progress =
    ((currentScenario + 1) / scenarios.length) * 100;

progressBar.style.width =
    `${progress}%`;


    /* Clear old choices */

    choicesContainer.innerHTML = "";


    /* Create new choice buttons */

    scenario.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");

        button.className = "choice-btn";

        button.textContent = choice.text;

        button.addEventListener(
            "click",
            () => selectChoice(choice, button)
        );

        choicesContainer.appendChild(button);

    });

}


/* =========================================
   CHOOSE AN OPTION
========================================= */

function selectChoice(choice, selectedButton) {

    // Prevent multiple clicks
    const buttons = document.querySelectorAll(".choice-btn");

    buttons.forEach(button => {
        button.disabled = true;
        button.style.cursor = "default";
    });

    // Add points
    score += choice.points;

    scoreDisplay.textContent = score;

    if (choice.points >= 80) {
    goodChoiceStreak++;
} else {
    goodChoiceStreak = 0;
}

if (streakValue) {
    streakValue.textContent = goodChoiceStreak;
}

    const meterValue = document.getElementById("ozhukkam-value");
const meterBar = document.getElementById("ozhukkam-bar");

if (meterValue && meterBar) {
    const percentage =
        Math.round((score / (scenarios.length * 100)) * 100);

    meterValue.textContent = `${percentage}%`;
    meterBar.style.width = `${percentage}%`;
}

    showXPGain(choice.points);

    // Highlight selected answer
    if (choice.points >= 80) {

        selectedButton.style.borderColor = "#4cdc96";
        selectedButton.style.background =
            "rgba(76, 220, 150, 0.12)";

    } else {

        selectedButton.style.borderColor = "#f6b042";
        selectedButton.style.background =
            "rgba(246, 176, 66, 0.10)";
    }

    // Show feedback
    showFeedback(choice);

    /* Show NEXT CHALLENGE button */

nextButton.hidden = false;
}

/* =========================================
   NEXT CHALLENGE BUTTON
========================================= */

nextButton.addEventListener("click", () => {

    nextButton.hidden = true;

    currentScenario++;

    if (currentScenario < scenarios.length) {

        loadScenario();

    } else {

        finishGame();

    }

});


/* =========================================
   FEEDBACK
========================================= */

function showFeedback(choice) {

    const feedback =
        document.createElement("div");

    feedback.className = "feedback-message";

    const isGoodChoice = choice.points >= 80;

    feedback.innerHTML = `
        <div class="feedback-title">
            ${isGoodChoice ? "✦ GREAT CHOICE! ✦" : "✦ THINK AGAIN ✦"}
        </div>

        <div class="feedback-xp">
            +${choice.points} XP
        </div>

        <div class="feedback-text">
            ${choice.feedback}
        </div>

        <div class="feedback-kural">
            ${
                isGoodChoice
                    ? "✓ This reflects Ozhukkam."
                    : "💡 Good conduct matters even when it's hard."
            }
        </div>
    `;

    choicesContainer.appendChild(feedback);
}


/* =========================================
   FINISH GAME
========================================= */

function finishGame() {

    questScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScore.textContent = score;

    progressBar.style.width = "100%";


    /* Different ending messages */

    if (score >= 450) {

    rankBadge.textContent =
        "🏆 OZHUKKAM MASTER";

    achievementText.textContent =
        "Achievement unlocked: Guardian of Good Conduct";

    resultMessage.textContent =
        "Your choices show excellent character!";

} else if (score >= 300) {

    rankBadge.textContent =
        "🌟 GOOD CONDUCT HERO";

    achievementText.textContent =
        "Achievement unlocked: Thoughtful Decision Maker";

    resultMessage.textContent =
        "You're learning to make thoughtful choices.";

} else {

    rankBadge.textContent =
        "🌱 OZHUKKAM EXPLORER";

    achievementText.textContent =
        "Achievement unlocked: First Step on the Quest";

    resultMessage.textContent =
        "Every choice is a chance to learn.";
}

}


/* =========================================
   RESTART GAME
========================================= */

restartButton.addEventListener(
    "click",
    restartGame
);


function restartGame() {

    resultScreen.classList.remove("active");

    introScreen.classList.add("active");

    currentScenario = 0;

    score = 0;

    scoreDisplay.textContent = score;

    progressBar.style.width = "10%";

}

function showXPGain(points) {

    const xpPopup = document.createElement("div");

    xpPopup.className = "xp-popup";

    xpPopup.textContent = `+${points} XP`;

    document.body.appendChild(xpPopup);

    setTimeout(() => {
        xpPopup.remove();
    }, 1000);
}