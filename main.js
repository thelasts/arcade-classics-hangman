// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const readline = require("readline-sync");

function initHiddenWord(word){
    let data = '';
    for (let i = 0; i < word.length; i++){
        data += '-';
    }
    return data;
}

function getRandomWord(words){
    return words[Math.floor(Math.random()*words.length)];
}

function updateHiddenWord(userChar, winWord, hiddenWord){

    let data = '';
    for (let i = 0; i < winWord.length; i++){
        if (winWord[i] === userChar){
            data += userChar;
        } else {
            data += hiddenWord[i];
        }
    }
    return data;
}

function isCorrectInput(input, logChars){
    //check if exactly one character
    if (input.length !== 1){
        console.log(`Please, input a single letter.`);
        return false;
    }
    let code = input.charCodeAt(0);
    //check for duplicates, logChars size 0 - 25
    if (logChars[code - 97]){
        console.log(`You've already guessed this letter.`);
        return false;
    }
    //check correct character
    if (code < 97 || code > 122){
        console.log(`Please, enter a lowercase letter from the English alphabet.`);
        return false;
    }
    return true;
}

let words = ['python', 'java', 'swift', 'javascript'];
const ATTEMPTS = 8;
options = Array.of('play', 'results', 'exit');
//winRate[0] - wins, winRate[1] - losses
winRate = new Array(2).fill(0);
//welcome message
console.log(`H A N G M A N`);
let optMessage = `Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: > `;
let gameStatus = true;
while (gameStatus) {

    let userInput = readline.question(optMessage);
    switch(userInput) {
        case 'play':
            let winWord = getRandomWord(words);
            let hiddenWord = initHiddenWord(winWord);
            let hasWon = false;
            let logChars = new Array(26).fill(false);

            for (let i = 0; i < ATTEMPTS;) {
                //handling input
                userInput = readline.question(`\n${hiddenWord}\nInput a letter: > `);
                if (!isCorrectInput(userInput, logChars)) {
                    continue;
                }
                logChars[userInput.charCodeAt(0) - 97] = true;
                //game
                if (winWord.includes(userInput)) {
                    hiddenWord = updateHiddenWord(userInput, winWord, hiddenWord);
                } else {
                    console.log("That letter doesn't appear in the word.");
                    i++;
                }
                //win condition
                hasWon = hiddenWord === winWord;
                if (hasWon)
                    break;
            }

            //end message
            if (hasWon)
                winRate[0]++;
            else
                winRate[1]++;
            console.log(hasWon ? `You guessed the word ${winWord}!\nYou survived!` : `You lost!`);
            break;
        case 'results':
            console.log(`You won: ${winRate[0]} times\nYou lost: ${winRate[1]} times.`);
            break;
        case 'exit':
            gameStatus = false;
            break;
        default: console.log(`Unknown command`);
    }
}
