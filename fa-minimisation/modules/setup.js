import {createFATable, createButtonsColouring} from "./create.js";


//Settings----------------------------------------------------------------------------

// colours from colorkit.co: https://colorkit.co/palette/ef2f27-ff5f00-f5e502-519f50-0aaeb3-11e3df-2c78bf-c7428f-e02c6d-f096b6/
// alternative? https://colorkit.co/palette/ff0000-ff8c00-e1ff00-44ff00-00f7ff-0016de-a600ff-f700f3/ 
const colours = ["#ffffff", "#ef2f27", "#ff8e4d", "#f5e502", "#519f50", "#0aaeb3", 
                "#11e3df", "#2c78bf", "#c7428f", "#e02c6d", "#f096b6"]
const symbols = ["", "*", "-", "&", "^", "+", "%", "$", "!", "=", "#"];

//Hard-coded FAs----------------------------------------------------------------------------
export const fa1 = [[0,8,8,0],[1,4,2,0],[2,2,3,0],[3,1,0,0],[4,6,6,0],[5,6,2,0],[6,4,4,0],[7,4,4,1],[8,5,1,1]]
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


