const intervalArr = [];
// Data Control
const DataControl = (function () {
    const playerData = {
        players: [
            { name: "player 1", choice: "Paper", score: 0, highestScore: 0 },
            { name: "player 2", choice: "Scissors", score: 0, highestScore: 0 }
            ],
        highestScore:  0 ,
    }
    return {
        logData: function () {
            console.log(playerData)
        },
        localStorageUpdateHighestScore: function(score) {
            let localData = this.localStorageGet();
            localData.highestScore = score;
            localStorage.setItem('scoreBoard', JSON.stringify(localData))
        },
        localStorageUpdatePlayerHighest: function(player, score){
            let localData = this.localStorageGet();
            if(player === "player1"){
                localData.players.forEach(item => {
                    if(item.name === "player 1"){
                        item.highestScore = score;
                    }
                })
            localStorage.setItem('scoreBoard', JSON.stringify(localData))
            } else if (player === "player2"){
                localData.players.forEach(item => {
                    if(item.name === "player 2"){
                        item.highestScore = score;
                    }
                })
                localStorage.setItem('scoreBoard', JSON.stringify(localData))
            }
        },
        getData: function () {
            return playerData
        },
        localStorageGet: function () {
            let scoreBoard = [];
            if(localStorage.getItem('scoreBoard') !== null){
                scoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
            } else {
                scoreBoard = localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
            }
            return scoreBoard
        },
        localStorageUpdate(scorePlayer) {
            let scoreBoard = [];
            if(localStorage.getItem('scoreBoard') !== null){
                scoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
            } else {
                scoreBoard = localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
            }
            scoreBoard = DataControl.getData();
            localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
        },
        winOrLose: function () {
            let status;
            let player1Choice = playerData.players[0].choice;
            let player2Choice = playerData.players[1].choice;
            // Win Lose
            if ( player1Choice === "Rock" && player2Choice === "Paper" ){
                // Player 1 Lose Paper Covers Rock
                status = "lose"
                // Throw it in the UI!
                UIControl.status(status, `Player 2 Wins Paper Covers Rock`)
            }else if (player1Choice === "Paper" && player2Choice === "Rock"){
                // Player 1 Wins Paper Covers Rock
                status = "win"
                // Throw it in the UI!
                UIControl.status(status, `Player 1 Wins Paper Covers Rock`)
            }else if (player1Choice === "Scissors" && player2Choice === "Rock") {
                // Player 1 Lose Rock Beat Scissors
                status = "lose"
                // Throw it in the UI!
                UIControl.status(status, `Player 2 Wins Rock Beats Scissors`)
            }else if (player1Choice === "Rock" && player2Choice === "Scissors"){
                // Player 1 Wins Rock Beat Scissors
                status = "win"
                // Throw it in the UI!
                UIControl.status(status, `Player 1 Wins Rock Beats Sissors`)
            }else if (player1Choice === "Scissors" && player2Choice === "Paper"){
                // Player 1 Wins Scissors cuts Paper!
                status = "win"
                // Throw it in the UI!
                UIControl.status(status, `Player 1 Wins Scissors Cuts Paper`)
            }else if (player1Choice === "Paper" && player2Choice === "Scissors"){
                // Player 1 Loses Scissors Cuts Paper!
                status = "lose"
                // Throw it in the UI!
                UIControl.status(status, `Player 1 loses Scissors Cuts Paper`)
            }else if (player1Choice === player2Choice){
                // Tie
                status = "tie"
                // Throw it in the UI!
                UIControl.status(status, `Tie Game! Both Choose ${player1Choice}`)
            }else if(player1Choice === "Scissors" && player2Choice === "Scissors") {
                 // Tie
                 status = "tie"
                 // Throw it in the UI!
                 UIControl.status(status, `Tie Game! Both Choose ${player1Choice}`)
            }else {
                status = "error"
                Error(`Something went wrong!`)
                console.log(player1Choice, player2Choice)
                UIControl.status(status, "An Error has Occured!")
            }
        }
    }

})()
// Player Control
const PlayerControl = (function() {
    const player1 = DataControl.getData().players[0]
    return {
        playerChoice: function(playerChoice){
            if(playerChoice === "Rock"){
                player1.choice = "Rock"
                UIControl.updatePlayer1("Rock")
            }else if (playerChoice === "Scissors"){
                player1.choice = "Scissors"
                UIControl.updatePlayer1("Scissors")
            }else if (playerChoice === "Paper"){
                player1.choice = "Paper"
                UIControl.updatePlayer1("Paper")
            }
        }
    }
})()
// Selectors Control
const selectControl = function () {
    const selectors = {
        playBtn:    "#play-btn",
        stopBtn:    "#stop-btn",
        paperBtn:   "#paper-btn",
        rockBtn:    "#rock-btn",
        scissors:   "#scissors-btn",
        btnSelectContain: ".btn-container",
        playBtnContain: ".player-btns",
        timeText: ".time-text",
        timeContrain: ".time-container",
        player1Icon: "#player1-icon",
        player2Icon: "#player2-icon",
        player2Heading: "#player-2-heading",
        player1Heading: "#player-1-heading",
        player1Score: "#player-1-score",
        player2Score: "#player-2-score",
        clearBtn: "#clearScore"
    }
    return selectors
}
// UI Control
const UIControl = (function () {
    const selectors = selectControl();
    return {
        playState: function () {
            // Change to play button to stop button
            let playBtn = document.querySelector(selectors.playBtn);
            let clearBtn = document.querySelector(selectors.clearBtn);
            playBtn.style.display = "none";
            clearBtn.style.display = "none";
            let stopBtn = document.querySelector(selectors.stopBtn);
            stopBtn.style.display = "block"
            // Display Player Controls
            document.querySelector(selectors.playBtnContain).style.display = "block";
            // Set Timer
            let timer = timeControl.setTime();

        },
        stopState: function () {
        // Change to stop button to play button
            let playBtn = document.querySelector(selectors.playBtn);
            let clearBtn = document.querySelector(selectors.clearBtn);
            playBtn.style.display = "block";
            clearBtn.style.display = "block";
            let stopBtn = document.querySelector(selectors.stopBtn);
            stopBtn.style.display = "none"
            let playerData = DataControl.getData();
            // Clear the Intervals
            intervalArr.forEach(int => {
                clearInterval(int);
            })
            // Remove the decoration text.
            try {
                document.querySelector(selectors.timeContrain).remove();
            } catch (err) {
                if (err){
                    let btnSelectContain = document.querySelector(selectors.btnSelectContain);
                    btnSelectContain.insertAdjacentHTML('beforebegin', `<div class="time-container"><h1 class="time-text"></h1></div>`)
                    document.querySelector(selectors.timeContrain).remove();
                }
            }finally {
                // Remove Player Choice
                playerData.players.forEach(item => {
                    item.choice = "";
                })
                document.querySelector(selectors.playBtnContain).style.display = "none";
            }
        },
        beginState: function () {
            // Change to begin State
            let playBtn = document.querySelector(selectors.playBtn);
            playBtn.style.display = "none";
            let stopBtn = document.querySelector(selectors.stopBtn);
            stopBtn.style.display = "block"
            document.querySelector(selectors.playBtnContain).style.display = "none";
        },
        updatePlayer1: function(choice){
            switch(choice){
                case "Rock":
                    document.querySelector(selectors.player1Icon).src = "../Images/rock.png"
                    document.querySelector(selectors.player1Heading).textContent = "Rock"
                break;
                case "Paper":
                    document.querySelector(selectors.player1Icon).src = "../Images/paper.png"
                    document.querySelector(selectors.player1Heading).textContent = "Paper"
                break;
                case "Scissors":
                    document.querySelector(selectors.player1Icon).src = "../Images/scissors.png"
                    document.querySelector(selectors.player1Heading).textContent = "Scissors"
                break;
            }
        },
        updatePlayer2: function(choice){
            switch(choice){
                case "Rock":
                    document.querySelector(selectors.player2Icon).src = "../Images/rock.png"
                    document.querySelector(selectors.player2Heading).textContent = "Rock"
                break;
                case "Paper":
                    document.querySelector(selectors.player2Icon).src = "../Images/paper.png"
                    document.querySelector(selectors.player2Heading).textContent = "Paper"
                break;
                case "Scissors":
                    document.querySelector(selectors.player2Icon).src = "../Images/scissors.png"
                    document.querySelector(selectors.player2Heading).textContent = "Scissors"
                break;
            }
        },
        updateScore: function(player) {
            const playersData = DataControl.getData();
            if(player === "player1"){
                document.querySelector(selectors.player1Score).innerHTML = `<h1> Player 1: Score: ${playersData.players[0].score}`
            }else if (player === "player2"){
                document.querySelector(selectors.player2Score).innerHTML = `<h1> Player 2: Score: ${playersData.players[1].score}`
            }
        },
        updateScoreBoard: function (boardUpdate, score) {
            switch (boardUpdate){
                case "player1Highest":
                    document.getElementById("player1-highest").textContent = `Player 1 Highest Score: ${score}`
                break;
                case "player2Highest":
                    document.getElementById("player2-highest").textContent = `Player 2 Highest Score: ${score}`
                break;
                case "highestScore":
                    document.getElementById("highest-score").textContent = `Highest Score: ${score}`
                break;
            }
        },
        status: function(status, text){
            // Display the Container
            let textContainer =  document.querySelector(".text-container");
            let playerData = DataControl.getData();
            let localData = DataControl.localStorageGet();
            let player1 = playerData.players[0];
            let player2 = playerData.players[1];
            textContainer.style.display = "block";
            setTimeout(function() {
                textContainer.style.display = "none";
            },2000)
            let highestScore = DataControl.localStorageGet().highestScore;
            let highestScorePlayer1 = DataControl.localStorageGet().players[0].highestScore;
            let highestScorePlayer2 = DataControl.localStorageGet().players[1].highestScore;
            switch(status){
                case "win":
                // Player 1 gets points
                    player1.score += 20;
                // Update the text container
                textContainer.innerHTML = `<h2> Player 1 Wins! <h2>`
                textContainer.style.backgroundColor = "#da8f04";
                // Update Score for player 1
                this.updateScore("player1");
                    // Check for Highest Score
                    // Highest Score For Player 1
                    if (player1.score > highestScorePlayer1){
                        player1.highestScore = player1.score;
                        // Update the UI
                        this.updateScoreBoard("player1Highest", player1.highestScore);
                        DataControl.localStorageUpdatePlayerHighest("player1", player1.score);
                    }
                    // Highest Score In General
                    if (player1.highestScore >= highestScore){
                        playerData.highestScore = player1.highestScore;
                        // Update the UI
                        this.updateScoreBoard("highestScore", playerData.highestScore)
                        // Update Local Storage
                        DataControl.localStorageUpdateHighestScore(playerData.highestScore);
                    }
                break;
                case "lose":
                // Player 2 get 20 points
                player2.score += 20;
                // Update the text container
                textContainer.innerHTML = `<h2> Player 2 Wins! <h2>`
                textContainer.style.backgroundColor = "#076f1d";
                // Update Score for player 1
                this.updateScore("player2");
                // Check for Highest Score
                if (player2.score > highestScorePlayer2){
                    // Update Score Board
                    playerData.highestScore = player2.highestScore;
                    // Update the UI
                    this.updateScoreBoard("player2Highest", player2.highestScore);
                    // Update Local Storage
                    DataControl.localStorageUpdatePlayerHighest("player2", player2.score);
                }
                if (player2.highestScore >= highestScore){
                    console.log(player2.highestScore, highestScore)
                    // Update Score Board
                    playerData.highestScore = player2.highestScore;
                    this.updateScoreBoard("highestScore", playerData.highestScore)
                    // Update Local Storage
                    DataControl.localStorageUpdateHighestScore(playerData.highestScore);
                }
                break;
                case "tie":
                // Both get 10 points
                    player1.score += 10;
                    player2.score += 10;
                    this.updateScore("player1");
                    this.updateScore("player2");
                // Update the text container
                textContainer.innerHTML = `<h2> Tie Game! Player 1 & 2 Get 10 points! <h2>`
                textContainer.style.backgroundColor = "#4f7ec7";
                    // Check for Highest Score [Player 2]
                    if (player2.score > highestScorePlayer2){
                        // Update Score Board
                        player2.highestScore = player2.score;
                        // Update the UI
                        this.updateScoreBoard("player2Highest", player2.highestScore);
                        // Update Local Storage
                        DataControl.localStorageUpdatePlayerHighest("player2", player2.highestScore )
                    }
                    if (player2.score >= highestScore){
                        // Update Score Board
                        playerData.highestScore = player2.highestScore;
                        this.updateScoreBoard("highestScore", playerData.highestScore)
                        // Update Local Storage Data
                        DataControl.localStorageUpdateHighestScore(playerData.highestScore);
                    }
                    // Check for Highest Score [Player 1]
                    if (player1.score > highestScorePlayer1){
                        // Update Score Board
                        player1.highestScore = player1.score;
                        // Update the UI
                        this.updateScoreBoard("player1Highest", player1.highestScore);
                        // Update Local Storage Data
                        DataControl.localStorageUpdatePlayerHighest("player1", player1.highestScore)
                    }
                    if (player1.score >= highestScore){
                        // Update Score Board
                        playerData.highestScore = player1.highestScore;
                        this.updateScoreBoard("highestScore", playerData.highestScore)
                        // Update Local Storage Data
                        DataControl.localStorageUpdateHighestScore(playerData.highestScore);
                    }
                break;
                case "error":
                // Update the text container
                textContainer.innerHTML = `<h2> Error! <h2>`
                textContainer.style.backgroundColor = "#b10000";
                break;
            }
        }
    }
})()
// Al Control
const AIControl = (function() {
    return {
        ai: function() {
            // Control AI Brain Using A Number
            let aiBrainNumber = Math.floor(Math.random() * 3) + 1 ;
            let player2Data = DataControl.getData().players[1];
            // Start the AI
            const aiBrain = setInterval(function () {
                if (aiBrainNumber === 1){
                        // Rock
                        // Change Data to Rock
                        player2Data.choice = "Rock"
                        // Update the UI
                        UIControl.updatePlayer2("Rock")
                        aiBrainNumber = Math.floor(Math.random() * 3) + 1;
                }else if (aiBrainNumber === 2){
                    // Paper
                    // Change Data to Paper
                    player2Data.choice = "Paper"
                    // Update the UI
                    UIControl.updatePlayer2("Paper")
                    aiBrainNumber = Math.floor(Math.random() * 3) + 1;
                }else if (aiBrainNumber === 3){
                    // Scissors
                    // Change data to scissors
                    player2Data.choice = "Scissors"
                    // Update Player 2 UI
                    UIControl.updatePlayer2("Scissors")
                    aiBrainNumber = Math.floor(Math.random() * 3) + 1 ;
                }else  if (aiBrainNumber === 1){
                    // Rock
                    // Change Data to Rock
                    player2Data.choice = "Rock"
                    // Update the UI
                    UIControl.updatePlayer2("Rock")
                    aiBrainNumber++
                }else if (aiBrainNumber === 2){
                    // Paper
                    // Change Data to Paper
                    player2Data.choice = "Paper"
                    // Update the UI
                    UIControl.updatePlayer2("Paper")
                    aiBrainNumber++
                }else if (aiBrainNumber === 3){
                    // Scissors
                    // Change data to scissors
                    player2Data.choice = "Scissors"
                    // Update Player 2 UI
                    UIControl.updatePlayer2("Scissors")
                    aiBrainNumber = 1;
                    }
            }, 200)
            intervalArr.push(aiBrain)
            return aiBrain
        }
    }

})()
const timeControl = (function () {
    const timeStop = false;
    const selectors = selectControl();
    return {
        setTime: function () {
            //Set a timer to Change your choice
            let ai = AIControl.ai();
            let timer = 0;
            let btnSelectContain = document.querySelector(selectors.btnSelectContain);
            const gameTime = setInterval(function () {
                timer++
                if(timer === 1){
                btnSelectContain.insertAdjacentHTML('beforebegin', `<div class="time-container"><h1 class="time-text"> Rock </h1></div>`)
                }else if (timer == 2){
                    document.querySelector(selectors.timeText).textContent = "Paper"
                }else if(timer === 3){
                    document.querySelector(selectors.timeText).textContent = "Scissors";
                    clearInterval(gameTime);
                    // Stop AI from changing choice
                    clearInterval(ai);
                    if(DataControl.getData().players[0].choice === ""){
                        // Default!
                        DataControl.getData().players[0].choice = "Paper"
                        UIControl.updatePlayer1("Paper")
                    }
                    // Win Lose?
                    DataControl.winOrLose();
                    // Go to Play State
                    UIControl.stopState();
                }
            },1000)
            intervalArr.push(gameTime);
        }
    }
})()



// App Control

const App = (function (selectControl, DataControl, UIControl) {
    const loadEventListeners = function () {
        document.getElementById("play-btn").addEventListener("click", playState);
        document.addEventListener("DOMContentLoaded", loadScoreBoard);
        document.getElementById("clearScore").addEventListener("click", clearScore);
        document.getElementById("scissors-btn").addEventListener("click", function () {
            playerChooses("Scissors")
        });
        document.getElementById("paper-btn").addEventListener("click", function () {
            playerChooses("Paper")
        });
        document.getElementById("rock-btn").addEventListener("click", function() {
            playerChooses("Rock")
        });
        document.getElementById("stop-btn").addEventListener("click", stopState);
    }

    const playState = function (e) {
        UIControl.playState();
        e.preventDefault()
    }
    const clearScore = function (e){
        let warning = confirm("Are You Sure?");
        if(warning === true){
            localStorage.removeItem("scoreBoard");
            UIControl.updateScoreBoard("player1Highest", 0)
            UIControl.updateScoreBoard("player2Highest", 0)
            UIControl.updateScoreBoard("highestScore", 0)
            DataControl.getData().highestScore = 0;
            DataControl.getData().players[0].highestScore = 0;
            DataControl.getData().players[1].highestScore = 0;
        }
        e.preventDefault()
    }
    const loadScoreBoard = function () {
        // Get Items From Local Storage!
        let localItems = DataControl.localStorageGet();
        if(localStorage.getItem('scoreBoard') === "[]"){
            localStorage.setItem("scoreBoard", JSON.stringify(DataControl.getData()))
            localItems =  DataControl.localStorageGet();
        }
        DataControl.playerData = localItems;
        UIControl.updateScoreBoard("player1Highest", localItems.players[0].highestScore)
        UIControl.updateScoreBoard("player2Highest", localItems.players[1].highestScore)
        UIControl.updateScoreBoard("highestScore", localItems.highestScore)
    }
    const stopState = function (e){
        UIControl.stopState();
    }
    const playerChooses = function (choice){
        PlayerControl.playerChoice(choice);
    }
    return {
        init: function () {
            // Load Event Listeners
            loadEventListeners()
        }
    }
})(selectControl, DataControl, UIControl )
App.init();