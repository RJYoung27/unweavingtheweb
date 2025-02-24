import {AtLeast, AtMost} from "./modules/quantifiers.js";
import { buildTruthTable } from "./modules/helpers.js";
import {setup, alphabets, missions, variableSentence} from "./modules/constants.js";

const mission = document.querySelector("#mission");
const variables = document.querySelector(".variables"); 
const clauseSizeResult = document.querySelector("#clauseSizeResult");

const clauseSizeField = document.querySelector(".clauseSizeField");
const clauseSizeSubmit = document.querySelector(".clauseSizeSubmit");
const clauseSizeHelpButton = document.querySelector(".clauseSizeHelpButton");

const clauseGuess = document.querySelector(".clauseGuess");

const helpClauseSize = document.querySelector("#helpClauseSize");
const firstClause = document.querySelector("#firstClause");
const firstClauseResult = document.querySelector("#firstClauseResult");
const completeExpression = document.querySelector("#completeExpression");

const truthTableVariables = document.querySelector("#truthTableVariables");

const dynamic = document.querySelectorAll(".dynamic");
const results = document.querySelectorAll(".result");


//Set-up quantifiers----------------------------------------------------------------

const quantifiers = [AtLeast, AtMost];

let resetButton;

let s; //scenario index
let quantifier; //at least / at most / exactly
let setSize; //how many variables in the set
let x; //how many variables to choose at least / at most / exactly
let correctValue; //number of variables per clause
let alphabet; //list of variables 

//flags
let helpClauseSizeFlag;

clauseSizeSubmit.addEventListener("click", checkClauseSize);
clauseSizeHelpButton.addEventListener("click", createHelpClauseSize);
newGame();




function newGame() {
    s = Math.floor(Math.random() * setup.length);
    setSize = Math.floor(Math.random() * 8) + 1;
    quantifier = new quantifiers[Math.floor(Math.random() * quantifiers.length)](
        setSize, 
        (Math.floor(Math.random() * setSize)), //random int between [0, setSize-1]
        alphabets[s]);

    //least/most
    x = quantifier.x;
    
    //least/most
    correctValue = quantifier.clauseSize;

    alphabet = alphabets[s];
    let scenario = setup[s];

    helpClauseSizeFlag = false;
    
    mission.textContent = missions[s](quantifier.display, x);
    
    let variablesDescription = document.getElementById("variablesDescription");
    variablesDescription.textContent = `You have been given ${quantifier.setSize} variables with the following meanings:`;

    let variableList = document.getElementById("variables");
    for (let i=0; i < setSize; i++) {
        let li = document.createElement('li');
        let text = `${alphabet[i]}: ${variableSentence[s](scenario[i])}`;
        li.innerText = text;
        variableList.appendChild(li);
	}

    clauseSizeField.value = "";
    clauseSizeField.focus();
}


function createHelpClauseSize() {
    let help = helpClauseSize;

    if (helpClauseSizeFlag) {
        helpClauseSizeFlag = false;
        help.style.backgroundColor = "white";
        empty(help);
        return;
    }

    helpClauseSizeFlag = true;
    help.style.backgroundColor ="palegreen";

    function helpParagraph(texty) {
        let par = document.createElement("p");
        par.textContent = texty;
        return par;
    }

    if (quantifier.literalsNegated) {
        help.appendChild(helpParagraph("Help info for 'at most' is in development."));
    } else {

    help.appendChild(helpParagraph("We need to make our clauses just small enough that the perfect number of variables are missing."));
    help.appendChild(helpParagraph("Let N be the number of variables in the set:"));

    function exampleListPoint(x, n, xQualifier, size) {
        `At least 1: ${buildExpression(1, setSize)} <-- there are N literals per clause`;

        let li = document.createElement("li");
        
        let qualifier = document.createTextNode(`At least ${xQualifier}: `)
        let exampleExpression = document.createElement("span");
        exampleExpression.appendChild(document.createTextNode(buildExpression(x, n)));
        exampleExpression.style.backgroundColor = "cornsilk";

        let explanation;
        if (size==1) {
            explanation = document.createTextNode(` <-- there is 1 literal per clause`);
        } else {
            explanation = document.createTextNode(` <-- there are ${size} literals per clause`);
        }
        
        li.appendChild(qualifier);
        li.appendChild(exampleExpression);
        li.appendChild(explanation);
        return li
    }

    function buildExpression(x, n) {
        let expression; 

        if (x==1) {
            return `(${alphabet.slice(0,n).join(" OR ")})`;
        } else if (x==n) {
            return `(${alphabet.slice(0,n).join(") AND (")})`;
        } else {
            let size = n-x+1;
            return `(${alphabet.slice(0, size).join(" OR ")}) AND ... AND (${alphabet.slice(n-size, n).join(" OR ")})`;
        }
    }

    let exampleList = document.createElement("ul");
    exampleList.appendChild(exampleListPoint(1, setSize, 1, "N"));
    if (setSize > 2) {
        exampleList.appendChild(exampleListPoint(2, setSize, 2, "N-1"));
    }
    if (setSize > 3) {
        exampleList.appendChild(document.createElement("li").appendChild(document.createTextNode("...")));
        exampleList.appendChild(exampleListPoint((setSize-1), setSize, "N-1", 2));
    }
    if (setSize > 1) {
        exampleList.appendChild(exampleListPoint(setSize, setSize, "N", 1));
    }
    
    help.appendChild(exampleList);
    help.appendChild(helpParagraph("Can you see the pattern?"));
    }
}

function checkClauseSize() {
  const userGuess = Number(clauseSizeField.value);
  if (userGuess == correctValue) {
    //turn Help off
    if (helpClauseSizeFlag) {createHelpClauseSize();}
    //create correct banner
  	clauseSizeResult.textContent = "Correct";
  	clauseSizeResult.style.backgroundColor = "green";

    clauseSizeSubmit.removeEventListener("click", checkClauseSize);
  	createFirstClause();
  } else {
  	clauseSizeResult.textContent = "Incorrect";
  	clauseSizeResult.style.backgroundColor = "red";
    //guessField.value = "";
    //guessField.focus();
  }
}


function createFirstClause() {
    let firstClauseInstructions = document.createElement("p");
    firstClauseInstructions.textContent = "Write the literals for the first clause as you would if writing clauses in lexicographical order:";

    firstClause.appendChild(firstClauseInstructions);
    firstClause.appendChild(document.createTextNode("("));

    var literal = document.createElement("input");
    literal.setAttribute("type", "text");
    literal.setAttribute("id", "literal_0");
    literal.setAttribute("style", "width: 30px");
    literal.setAttribute("placeholder", "");
    firstClause.appendChild(literal);

    for (let i=1; i < correctValue; i++) {
        firstClause.appendChild(document.createTextNode(" OR "));
        var literal = document.createElement("input");
        literal.setAttribute("type", "text");
        literal.setAttribute("id", `literal_${i}`);
        literal.setAttribute("style", "width: 30px");
        literal.setAttribute("placeholder", "");
        firstClause.appendChild(literal);
    }
    firstClause.appendChild(document.createTextNode(")    "));

    // create a submit button
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("class", "firstClauseSubmit");
    s.setAttribute("value", "Submit");
    firstClause.appendChild(s); 

    const firstClauseSubmit = document.querySelector(".firstClauseSubmit");
    firstClauseSubmit.addEventListener("click", checkFirstClause);
}


function checkFirstClause() {    
    let userGuess = [];
    for (let i=0; i< correctValue; i++) {
        var x = String(document.getElementById(`literal_${i}`).value);
        userGuess.push(x.toLowerCase());
    }
    let flag = true;

    if (quantifier.literalsNegated) {
        // at most
        for (let i=0; i < correctValue; i++) {
            if (userGuess[i][0] != "~" || userGuess[i][1] != alphabet[i]) {
                flag = false;
            }
        }
    } else {
        // at least
        for (let i=0; i < correctValue; i++) {
            if (userGuess[i] != alphabet[i]) { 
            flag = false;
            }
        }
    }
    if (flag) {
        firstClauseResult.textContent = "Correct";
        firstClauseResult.style.backgroundColor = "green";

        const firstClauseSubmit = document.querySelector(".firstClauseSubmit");
        firstClauseSubmit.removeEventListener("click", checkFirstClause);

        buildExpression();
    } else {
        firstClauseResult.textContent = "Incorrect";
        firstClauseResult.style.backgroundColor = "red";
    }
}


function buildExpression() {
    completeExpression.appendChild(quantifier.buildShownExpression());
    completeExpression.appendChild(buildTruthTable(quantifier));
}



function setGameOver() {
  resetButton = document.createElement("button");
  resetButton.textContent = "New puzzle";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
  //lock other buttons
}


function empty(parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
}

function resetGame() {
    empty(completeExpression);
    empty(firstClause);
    empty(helpClauseSize);
    helpClauseSize.style.backgroundColor = "white";

    for (dyn of dynamic) {
        empty(dyn);
        dyn.textContent = "";
    }
    for (result of results) {
        result.style.backgroundColor = "white";
        result.textContent = "";
    }
  
    resetButton.parentNode.removeChild(resetButton);

    newGame();
}
