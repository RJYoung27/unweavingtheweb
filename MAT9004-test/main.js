
import {Test, makeTestHTML} from "./modules/test.js";

const testDiv = document.querySelector("#test");
const generateTest = document.querySelector("#genTest");
const mathSupport = document.querySelector("#mathSupport");

generateTest.addEventListener("click", newTest);

let currentTest;

function newTest() {
    currentTest = new Test();
    makeTestHTML(testDiv, currentTest, false);
    mathSupport.addEventListener("click", toggleSupportButton);

}

function toggleSupportButton() {
    let toggle = currentTest.toggleSupportButton();
    if (toggle) {
        mathSupport.textContent = "Additional support: ON";
    } else {
        mathSupport.textContent = "Additional support: OFF";
    }
    makeTestHTML(testDiv, currentTest, toggle);
}