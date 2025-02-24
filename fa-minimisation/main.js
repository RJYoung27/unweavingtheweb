//TODO: test setting (only get feedback once finished; if wrong, shows correct answer and offers redo)
//TODO: symbol setting (for colourblind) DONE
//TODO: write own fa
//TODO: make merging drag-and-drop
//TODO: make colour start from dif place in list

//import {newGame, newGameNewFA, newGameRandomFA, newGameResetFA, fa1} from "./modules/setup.js";


const symbolsButton = document.querySelector("#symbols");
const userFA = document.querySelector("#userFA");
const newFA = document.querySelector("#newFA");
const randomFA = document.querySelector("#randomFA");
const resetFA = document.querySelector("#resetFA");
const faTable = document.querySelector("#faTable");
const instructions = document.querySelector("#instructions");
const submissionButtons = document.querySelector("#submissionButtons");
const feedback = document.querySelector("#feedback");

//Settings----------------------------------------------------------------------------

// colours from colorkit.co: https://colorkit.co/palette/ef2f27-ff5f00-f5e502-519f50-0aaeb3-11e3df-2c78bf-c7428f-e02c6d-f096b6/
// alternative? https://colorkit.co/palette/ff0000-ff8c00-e1ff00-44ff00-00f7ff-0016de-a600ff-f700f3/ 
const colours = ["#ffffff", "#ef2f27", "#ff8e4d", "#f5e502", "#519f50", "#0aaeb3", 
                "#11e3df", "#2c78bf", "#c7428f", "#e02c6d", "#f096b6"]
const symbols = ["", "*", "-", "&", "^", "+", "%", "$", "!", "=", "#"];

//Hard-coded FAs----------------------------------------------------------------------------
const fa1 = [[0,8,8,0],[1,4,2,0],[2,2,3,0],[3,1,0,0],[4,6,6,0],[5,6,2,0],[6,4,4,0],[7,4,4,1],[8,5,1,1]]
const fa2 = [[0, 0, 1, 0], [1, 0, 2, 1], [2, 0, 1, 1]];
const fa3 = [[0, 1, 2, 1],[1, 2, 1, 0],[2, 2, 1, 0]];
const preCodedFAs = [fa1, fa2];

//Set-up table options----------------------------------------------------------------


let startingFA; //the FA to be minimised 
let currentFA;  //the current form of the FA
let cellClicked; //a table where each cell tracks whether it has been clicked
let cellSetIdentity; //a table where each cell tracks the current
let currentSetIndex; //tracks which set (colour/symbol) is currently in use
let groups;     //a collection of groups that could be differentiated
let merges;     //a collection of groups that could be merged
let symbolsOn = false;


//---------------------------------------------------------------------------------------

symbolsButton.addEventListener("click", toggleSymbols);
symbolsButton.innerText = "Show symbols as well as colours: OFF";
userFA.addEventListener("click", createUserFA);

newFA.addEventListener("click", newGameNewFA);
randomFA.addEventListener("click", newGameRandomFA);
resetFA.addEventListener("click", newGameResetFA);

newGame(fa1);


function toggleSymbols() {
    symbolsButton.innerHTML = "";
    if (symbolsOn) {
        symbolsOn = false;
        symbolsButton.innerText = "Show symbols as well as colours: OFF";
        createFATable(currentSetIndex);
    } else {
        symbolsOn = true;
        symbolsButton.innerText = "Show symbols as well as colours: ON";
        createFATable(currentSetIndex);
    }
}

function newGame(fa) {    
    faTable.innerHTML = "";
    instructions.innerHTML = "";
    submissionButtons.innerHTML = "";
    feedback.innerHTML = "";

    startingFA = fa;
    console.log(startingFA);
    currentFA = structuredClone(startingFA);

    //?? fill with [0,0,0] or will they be the same object?
    cellSetIdentity = Array(currentFA.length);
    for (let i=0; i<currentFA.length; i++) {
        cellSetIdentity[i] = [0, 0, 0];
    }
    currentSetIndex = 1;

    instructions.innerText = "Click on all final states you can see. Ensure you check all columns. ";
    createFATable(currentSetIndex);
    createButtonsColouring(colorFinalStates);
}

function newGameNewFA() {
    let fa = preCodedFAs[Math.floor(Math.random() * preCodedFAs.length)];
    newGame(fa);
}

function newGameRandomFA() {
    let fa = createRandomFA();
    newGame(fa);
}

function newGameResetFA() {
    let fa = startingFA;
    newGame(fa);
}

function createRandomFA() {
    const numStates = Math.floor(Math.random()*8) +3;
    const fa = Array(numStates);

    for (let i=0; i<numStates; i++) {
        let row = Array(4);
        row[0] = i;
        row[1] = Math.floor(Math.random() * numStates);
        row[2] = Math.floor(Math.random() * numStates);
        row[3] = Number(Math.random() < 0.4);
        fa[i] = row;
    }
    return fa;
}

function createUserFA() {
    instructions.innerHTML = "";
    submissionButtons.innerHTML = "";
    feedback.innerHTML = "";

    startingFA = [];

    const finishedCreatingFA = document.createElement("button");
    finishedCreatingFA.innerText = "Finished creating FA";
    finishedCreatingFA.addEventListener("click", newGameResetFA);
    submissionButtons.appendChild(finishedCreatingFA);

    feedback.innerText = "Warning: does not verify whether FA is valid. That's on you."

    getRowUserFA();

}


function getRowUserFA() {
    function makeCell(cellText, cellContents){
        let td = document.createElement("td");
        td.innerText = cellText;
        if (cellContents) {td.appendChild(cellContents);}
        return td;
    }

    faTable.innerHTML = "";
    let table = document.createElement("table");

    //create first row
    let firstrow_text = ['State', 'Final','a','b', '']
    let firstrow = document.createElement("tr");
    for (let i=0; i< 5; i++) {
        firstrow.appendChild(makeCell(firstrow_text[i]));
    }
    table.appendChild(firstrow);

    // render table thus far
    for (let i=0; i<startingFA.length; i++) {
        let inputrow = document.createElement("tr");
        if (startingFA[i][3]==1) {
            inputrow.appendChild(makeCell(`Final: ${i}`));
            inputrow.appendChild(makeCell("Y"));
        } else {
            inputrow.appendChild(makeCell(`${i}`));
            inputrow.appendChild(makeCell("N"));
        }
        for (let j=1; j<3; j++) {
            inputrow.appendChild(makeCell(`${startingFA[i][j]}`));
        }
        inputrow.appendChild(document.createElement("td"));
        table.appendChild(inputrow);
    }

    let inputrow = document.createElement("tr");
    // state name
    let td = document.createElement("td");
    let start = '';
    if (startingFA.length == 0) {start = "Start: ";}
    td.innerText = `${start}${startingFA.length}`;
    inputrow.appendChild(td);
    // final state checkbox
    td = document.createElement("td");
    let isFinalState = document.createElement("input");
    isFinalState.setAttribute("type", "checkbox");
    isFinalState.setAttribute("id", "isFinalState");
    td.appendChild(isFinalState);
    inputrow.appendChild(td);
    for (let i=0; i< 2; i++) {
        let td = document.createElement("td");
        let userState = document.createElement("input");
        userState.setAttribute("class", "inputState");
        userState.setAttribute("id", `cell_${i}`);
        td.appendChild(userState)
        inputrow.appendChild(td);
    }
    td = document.createElement("td");
    let addRow = document.createElement("button");
    addRow.innerText = "Add";
    addRow.addEventListener("click", addRowUserFA);
    td.appendChild(addRow);
    inputrow.appendChild(td);

    table.appendChild(inputrow);

    faTable.appendChild(table);
}

function addRowUserFA() {
    let newRow = Array(4);
    newRow[0] = startingFA.length;
    newRow[1] = parseInt(document.getElementById("cell_0").value);
    newRow[2] = parseInt(document.getElementById("cell_1").value);
    newRow[3] = Number(document.getElementById("isFinalState").checked);
    startingFA.push(newRow);
    getRowUserFA();
}


function createFATable(setIndex=false) {
    /**
     * Creates the current coloured/merged table on screen
     * @param setIndex - the index of the current set, or false if FA is locked for colouring
     */
    faTable.innerHTML = "";
    cellClicked = [];
    let table = document.createElement("table");

    //create first row
    let firstrow_text = ['','a','b']
    let firstrow = document.createElement("tr");
    for (let i=0; i< 3; i++) {
        let td = document.createElement("td");
        td.innerText = firstrow_text[i];
        firstrow.appendChild(td);
    }
    table.appendChild(firstrow);

    //create table
    for (let i=0; i < currentFA.length; i++) {
        cellClicked.push([false, false, false]);
        let tr = document.createElement("tr");
        for (let j=0; j<3; j++) {
            let leftSymbol = '';
            let rightSymbol = '';
            if (symbolsOn) {
                let stateSymbol = symbols[cellSetIdentity[i][j]];
                leftSymbol = stateSymbol+stateSymbol+' ';
                rightSymbol = ' '+stateSymbol+stateSymbol;
            }
            //TODO: remove duplicate x3 code!!! inner function for button text
            let final = '';
            if (i==0 & j==0) {final="Start: "}
            if (j==0 & currentFA[i][3]==1) {final+="Final: "}
            let td = document.createElement("td");
            let btn = document.createElement("button");
            btn.setAttribute("id", `cell_${i}_${j}`);
            btn.setAttribute("class", "faButton");
            btn.style.backgroundColor = colours[cellSetIdentity[i][j]];
            btn.innerText = `${leftSymbol}${final}${currentFA[i][j]}${rightSymbol}`;
            if (setIndex) {
                // still colouring the FA
                btn.addEventListener("click", () => {
                    if (cellClicked[i][j]) {
                        // going from clicked -> not clicked
                        feedback.innerHTML = "";
                        cellClicked[i][j] = false; 
                        btn.style.backgroundColor = colours[cellSetIdentity[i][j]];
                        if (symbolsOn) {
                            let final = '';
                            if (i==0 & j==0) {final="Start: "}
                            if (j==0 & currentFA[i][3]==1) {final+="Final: "} 
                            let dbleStateSymbol = `${symbols[cellSetIdentity[i][j]]}${symbols[cellSetIdentity[i][j]]}`;
                            btn.innerText = `${dbleStateSymbol} ${final}${currentFA[i][j]} ${dbleStateSymbol}`;
                        }
                    } else {
                        // going from not clicked -> clicked
                        feedback.innerHTML = "";
                        cellClicked[i][j] = true; 
                        btn.style.backgroundColor = colours[setIndex];
                        if (symbolsOn) {
                            let final = '';
                            if (i==0 & j==0) {final="Start: "}
                            if (j==0 & currentFA[i][3]==1) {final+="Final: "} 
                            let dbleStateSymbol = `${symbols[setIndex]}${symbols[setIndex]}`;
                            btn.innerText = `${dbleStateSymbol} ${final}${currentFA[i][j]} ${dbleStateSymbol}`;
                        }
                };});
            }
            td.appendChild(btn);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    faTable.appendChild(table);

}

function createButtonsColouring(submitEvent) {
    submissionButtons.innerHTML = "";
    let newColourButton = document.createElement("button");
    newColourButton.setAttribute("id", "newColour");
    newColourButton.innerText = "New Colour";
    newColourButton.addEventListener("click", submitEvent);
    submissionButtons.appendChild(newColourButton);

    let finishedColouringButton = document.createElement("button");
    finishedColouringButton.setAttribute("id", "finishedColouring");
    finishedColouringButton.innerText = "Finished Colouring";
    finishedColouringButton.addEventListener("click", checkFinishedColouring);
    submissionButtons.appendChild(finishedColouringButton);
}


function updateFAGroupingsFinalStates() {
    /**
     * Checks that all final states have been correctly selected.
     */
    feedback.innerHTML = "";

    const finalStates = Array(currentFA.length).fill(false);
    for (let i=0; i<currentFA.length; i++) {
        if (currentFA[i][3]==1) {finalStates[i] = true;}
    }

    let correct = true;
    for (let i=0; i<currentFA.length; i++) {
        for (let j=0; j<3; j++) {
            if (finalStates[currentFA[i][j]] && !cellClicked[i][j]) {correct=false;}
            else if (!finalStates[currentFA[i][j]] && cellClicked[i][j]) {correct=false;}
    }}

    // if wrong, update feedback
    if (!correct) {
        feedback.innerText = "The selection is incorrect. Try again.";
        return false;
    }

    // if correct, update colours and instructions 
    for (let i=0; i<currentFA.length; i++) {
        for (let j=0; j<3; j++) {
            if (finalStates[currentFA[i][j]]) {
                cellSetIdentity[i][j] = currentSetIndex;
            }
        }
    }
    return true;
}

//TODO: standardise order things occur in similar functions
function colorFinalStates() {
    /**
     * Checks that all final states have been correctly selected.
     */
    feedback.innerHTML = "";
    if (!updateFAGroupingsFinalStates()) {return false;}
    
    feedback.innerHTML = "Correct final states.";
    currentSetIndex++;

    createFATable(currentSetIndex);
    groups = findGroups();


    instructions.innerHTML = "";
    instructions.innerText = "Click on any state that needs to be differentiated.";

    let submitButtonEvent;
    if (Object.keys(groups).length == 0) {submitButtonEvent = noMoreNewColours;}
    else {submitButtonEvent = colorNewSet;}
    createButtonsColouring(submitButtonEvent);

}


function updateFAGroupings() {

    //find which group to check for by finding the first coloured cell
    let userChosenGroup;
    for (let i=0; i<cellClicked.length; i++) {
        if (cellClicked[i][0]) {
            // a state is set to True
            if (i in groups) {
                // the state set to True is also the first state in an identified group
                userChosenGroup = groups[i];
                break;
            } else {
                // a state is set to True but it is not in a group OR is not the first in the group
                // check if in a group 
                Object.keys(groups).forEach(key => {
                    if (groups[key].includes(i)) {
                        feedback.innerText = 'Colouring is incorrect. At least one state is missing.';
                        return false;
                    }
                });
                // first state set to True is not in any group
                feedback.innerText = `Colouring is incorrect. State ${i} is not part of a valid group.`;
                return false;
            }
        }
    }

    // no state was set to True 
    if (!userChosenGroup) {
        feedback.innerText = "No states have been coloured.";
        return false;
    }

    //check true-positives and true-negatives
    // checker holds what fa_parity must look like to be valid
    // given the first state coloured
    let checker = Array(currentFA.length).fill(false);
    userChosenGroup.forEach(state => {checker[state] = true;})

    let falsePositive = false;
    let falseNegative = false;
    for (let i=0; i<cellClicked.length; i++) {
        for (let j=0; j<3; j++) {
            if (cellClicked[i][j] != checker[currentFA[i][j]]) {
                if (cellClicked[i][j]) {
                    falsePositive = true;
                } else {
                    falseNegative = true;
    }}}}

    if (falsePositive || falseNegative) {
        if (falsePositive && falseNegative) {feedback.innerText = "Colouring is incorrect.";}
        else if (falsePositive) {feedback.innerText = "Colouring is incorrect. At least one cell is coloured that should not be.";}
        else if (falseNegative) {feedback.innerText= "Colouring is incorrect. At least one cell is not coloured that should be.";}
        return false;
    }

    // if correct, update colours and instructions 
    //duplicate code!!!!
    for (let i=0; i<currentFA.length; i++) {
        for (let j=0; j<3; j++) {
            if (checker[currentFA[i][j]]) {
                cellSetIdentity[i][j] = currentSetIndex;
    }}}
    feedback.innerText = "Coloured a new set.";

    return true;
}


function colorNewSet() {
    /**
     * Co-ordinates the colouring of a newly differentiated set.
     * Checks that it is possible to colour a new set.
     * If possible: 
     */
    feedback.innerHTML = "";

    groups = findGroups();
    // TODO: when would this happen?
    if (Object.keys(groups).length == 0) {
        noMoreNewColours();
        createFATable(false);
        createButtonsColouring(noMoreNewColours);
        return false;
    }

    if (!updateFAGroupings()) {return false};
    groups = findGroups();
    
    if (Object.keys(groups).length == 0) {
        noMoreNewColours();
        createFATable(false);
        createButtonsColouring(noMoreNewColours);
    } else {
        currentSetIndex++;
        createFATable(currentSetIndex);
        createButtonsColouring(colorNewSet);
    }

}

function noMoreNewColours() {
    feedback.innerHTML = "";
    feedback.innerText = "No more colours are needed.";
}


function checkFinishedColouring() {
    feedback.innerHTML = "";
    if (currentSetIndex == 1) {updateFAGroupingsFinalStates();}
    groups = findGroups();
    feedback.innerHTML = "";
    if (Object.keys(groups).length > 0) {
        updateFAGroupings();
        groups = findGroups();
        if (Object.keys(groups).length > 0) {
            feedback.innerText = "More colours are needed.";
            currentSetIndex++;
            createFATable(currentSetIndex);
            createButtonsColouring(colorNewSet);
            return false;
        } else {
            feedback.innerText = "Successfully finished colouring.";
        }
    }
    instructions.innerHTML = "";
    instructions.innerText = "Merge states by entering the state numbers to be merged, separated by spaces."

    createFATable(false);
    createButtonsMerging();
}

function createButtonsMerging() {
    submissionButtons.innerHTML = "";

    let inputMerge = document.createElement("input");
    inputMerge.setAttribute("type", "string");
    inputMerge.setAttribute("id", "mergeGuessField");

    let inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Submit");

    let finishedButton = document.createElement("button");
    finishedButton.setAttribute("id", "finishedButton");
    finishedButton.innerText = "Finished Merging";

    submissionButtons.appendChild(inputMerge);
    submissionButtons.appendChild(inputSubmit);
    submissionButtons.appendChild(finishedButton);

    let mergeGuessField = document.querySelector("#mergeGuessField");
    inputSubmit.addEventListener("click", mergeStates);
    finishedButton.addEventListener("click", checkFinished);
}


function mergeStates() {
    feedback.innerHTML = "";
    let guess = mergeGuessField.value.split(' ').sort();
    for (let i=0; i<guess.length; i++) {
        guess[i] = parseInt(guess[i]);
    }
    merges = findGroups(true);

    if (Object.keys(merges).length == 0) {
        feedback.innerText = "No more merging is possible.";
        return false;
    }

    let stateToKeep = guess[0];
    if (!((stateToKeep in merges) && (guess.length == merges[stateToKeep].length))) {
        feedback.innerText = "Merge is incorrect.";
        return false;
    }

    const statesToMerge = merges[guess[0]];
    const statesToDelete = statesToMerge.slice(1);

    for (let i=0; i<merges.length; i++) {
        //TODO: more sensitive feedback / details 
        if (guess[i] != statesToMerge[i]) {
            feedback.innerText = "Merge is incorrect.";
            return false;
    }}

    
    // delete all but first row with pattern 
    let newSet = `{${statesToMerge.join()}}`;

    let removeIndices = [];
    for (let i=0; i<currentFA.length; i++) {
        if (statesToDelete.includes(currentFA[i][0])) {removeIndices.push(i);}
    }

    // delete patterns from currentSetIndex
    for (let i=removeIndices.length-1; i>=0; i--) {
        let x = removeIndices[i]; //TODO: for x in removeIndices
        currentFA.splice(x,1);
        cellSetIdentity.splice(x,1);
    }

    // rename cell values with set
    for (let i=0; i<currentFA.length; i++) {
        for (let j=0; j<3; j++) {
            if (statesToMerge.includes(currentFA[i][j])) {
                currentFA[i][j] = newSet;}
        }
    }

    createFATable();
    createButtonsMerging();

}

function checkFinished() {
    feedback.innerHTML = "";
    if (Object.keys(findGroups(true)).length >0) {
        feedback.innerText = "More merges are required.";
        return false;
    }
    instructions.innerHTML = "";
    submissionButtons.innerHTML = "";
    feedback.innerText = ("Finished!");
}

function findGroups(forMerging = false) {
    let patterns = {};
    let groups = {};
    let stateColours = Array(colours.length);
    for (let i=0; i<cellSetIdentity.length; i++) {
        let key1 = `${cellSetIdentity[i][0]},${cellSetIdentity[i][1]},${cellSetIdentity[i][2]}`;
        if (key1 in patterns) {
            patterns[key1].push(currentFA[i][0]);
        } else {
            patterns[key1] = [currentFA[i][0]];
        }
        if (!stateColours[cellSetIdentity[i][0]]) {stateColours[cellSetIdentity[i][0]]=[];}
        stateColours[cellSetIdentity[i][0]].push(i); // stateColours only used for colouring, not merging, so ok to push i
    }

    // Clean up patterns for merging by removing any pattern where merging is not possible
    if (forMerging) {
        Object.keys(patterns).forEach(key => {
            if (patterns[key].length > 1) {
                groups[patterns[key][0]] = patterns[key];
            }
        })
        return groups;
    }
    
    // Clean up patterns by removing any pattern that shouldn't be differentiated 
    // i.e.: patterns where every row with the pattern XYZ are also every instance of colour X 
    // key patterns by smallest state in pattern
    Object.keys(patterns).forEach(key => {
        let checkColour = parseInt(key);
        if (patterns[key].length != stateColours[checkColour].length) {
            groups[patterns[key][0]] = patterns[key]}
    });

    return groups;    
    //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript#34913701
}