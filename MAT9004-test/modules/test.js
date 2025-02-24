import {functionSet} from "./functions.js";
import { foundationSet } from "./foundations.js";
import { combinatoricsSet } from "./combinatorics.js";
import { linearSet } from "./linear.js";
import { probabilitySet } from "./probability.js";
import { graphSet } from "./graphs.js";
import { longAnswerSet } from "./longAnswer.js";

const questionSets = [].concat(foundationSet, functionSet, linearSet,
                        combinatoricsSet, probabilitySet, graphSet);

export class Test {
    headings = ["Foundations", "Functions", "Linear Algebra", "Combinatorics", "Probability", "Graphs", "Long Answer"];

    constructor() {
        this.foundations = [];
        this.functions = [];
        this.linear = [];
        this.combinatorics = [];
        this.probability = [];
        this.graphs = [];
        this.longAnswer = [];
        this.sections = [this.foundations, this.functions, 
            this.linear, this.combinatorics, this.probability, 
            this.graphs, this.longAnswer];
        this.populateTest();
        this.toggle = false;

    }

    toggleSupportButton() {
        if (this.toggle) {this.toggle = false}
        else {this.toggle = true}
        this.resetHints();
        return this.toggle;
    }

    resetHints() {
        for (let i=0; i<this.sections.length; i++) {
            let section = this.sections[i];
            for (let j=0; j<section.length; j++) {
                let question = section[j];
                question.resetHintNum();
            }
        }
    }

    populateTest() {
        //TODO
        let xSets = [foundationSet, functionSet, linearSet, combinatoricsSet,
                    probabilitySet, graphSet];

        for (let s=0; s<xSets.length; s++) {
            let sets = xSets[s];

            for (let i=0; i<sets.length; i++) {
                let qanda = sets[i]();
                this.sections[s].push(new Question(...qanda));
            }
        }

        let questions = longAnswerSet[0];
        let answers = longAnswerSet[1];
        for (let i=0; i<questions.length; i++) {
            this.longAnswer.push(new Question(questions[i], answers[i], [], true));
        }
    }
}


export function makeTestHTML(testDiv, testObj) {
    testDiv.innerHTML = '';
    let i = 1;

    for (let s=0; s< testObj.headings.length; s++) {
        let section = document.createElement("div");
        
        let heading = document.createElement("h2");
        heading.innerText = testObj.headings[s];
        section.appendChild(heading);

        for (let qofsect=0; qofsect < testObj.sections[s].length; qofsect++) {
            let question = testObj.sections[s][qofsect];
           
            if (testObj.toggle) {
                
                let flexwrap = document.createElement("div");
                flexwrap.setAttribute("class", "wrap-flex");
                flexwrap.appendChild(question.makeQuestionHTML(s, qofsect, i));

                let hintButton = document.createElement("button");
                hintButton.innerText = "Hint";
                hintButton.setAttribute("id", `hintbtn_${i}`);
                let m=i; 
                let q=question;
                hintButton.addEventListener("click", () => makeHintHTML(m, q));

                if (question.hint.length > 0) {flexwrap.appendChild(hintButton);}

                if (question.allowDrills) {
                    let drillButton = document.createElement("button");
                    drillButton.innerText = "Drill";
                    drillButton.setAttribute("id", `drillbtn_${i}`);

                    //TODO: understand wtf this is!!
                    let x = i;  //Wow: if I don't include this, then makeDrillHTML(i) is for current value of i???
                    drillButton.addEventListener("click", () => makeDrillHTML(x));
                    flexwrap.appendChild(drillButton);
                }
                section.appendChild(flexwrap);

                let hint = document.createElement("div");
                hint.setAttribute("id", `hint_${i}`);
                section.appendChild(hint);
                
                let drill = document.createElement("div");
                drill.setAttribute("id", `drill_${i}`);
                section.appendChild(drill);
            }
            else {section.appendChild(question.makeQuestionHTML(s, qofsect, i));}
            i++;
        }

        testDiv.appendChild(section);

    }
    let checkTestButton = document.createElement("button");
    checkTestButton.setAttribute("id", "checkTest");
    checkTestButton.innerText = "Check Test";
    checkTestButton.addEventListener("click", () => checkTest(testDiv, testObj));

    testDiv.appendChild(checkTestButton);
}

function makeDrillHTML(i) {
    const drillSection = document.getElementById(`drill_${i}`);
    drillSection.innerHTML = "";
    drillSection.style.background = "Gainsboro";
    for (let j=1; j<=5; j++) {
        let q = questionSets[i-1];
        let qanda = q();
        let question = new Question(qanda[0], qanda[1], [], false, true);
        drillSection.appendChild(question.makeQuestionHTML(i, j))
    }

}

function makeHintHTML(i, question) {
    const [newHint, hintNum, hintLength] = question.makeHintHTML();
    if (newHint) {
        const hintSection = document.getElementById(`hint_${i}`);
        hintSection.style.background = "LightCyan";
        hintSection.appendChild(newHint);

        const hintButton = document.getElementById(`hintbtn_${i}`);
        hintButton.innerText = `Hint ${hintNum}/${hintLength}`;
    }
}

export function checkTest(testDiv, test) {
    //get all elements in the questionAns class
    let allAnswers = document.querySelectorAll(".questionAns");
    let totalQuestions = allAnswers.length;
    let wrongQuestions = 0;
    let correctQuestions = 0;
    let unanswered = 0;

    for (let ans of allAnswers) {
        ans.disabled = true;
        let ansText = ans.value;
        let ansId = ans.id.split("_");
        let correctAns = test.sections[ansId[1]][ansId[2]].answer;
        console.log(`Given answer: ${ansText}; correct answer: ${correctAns}`);

        if (ansText == correctAns) {
            ans.style.backgroundColor = "lightGreen"
            correctQuestions++;
        } else if (ansText == "") {
            ans.style.backgroundColor = "lightYellow"
            unanswered++;
        } else {
            ans.style.backgroundColor = "lightCoral"
            wrongQuestions++;
        }
    }
    let p = document.createElement("p");
    p.innerText = `Correct: ${correctQuestions}/${totalQuestions}\nIncorrect: ${wrongQuestions}/${totalQuestions}\nNot attempted: ${unanswered}/${totalQuestions}`
    testDiv.appendChild(p);
}


function checkDrill(questionDiv, answer, sect, qofsect) {
    let ans = document.getElementById(`drill_${sect}_${qofsect}`);
    ans.disabled = true;
    let ansText = ans.value;
    console.log(ansText);

    if (ansText == answer) {
        ans.style.backgroundColor = "lightGreen";
    } else {
        ans.style.backgroundColor = "lightCoral";
        questionDiv.insertAdjacentHTML("afterend", `Correct answer: ${answer}`);
    }
}


class Question {
    constructor(text, answer, hint=[], longAnswer=false, drillQuestion = false, allowDrills=true) {
        this.text = text;
        this.answer = answer;
        this.hint = hint;
        this.longAnswer = longAnswer;
        this.drillQuestion = drillQuestion;
        this.allowDrills = allowDrills;

        this.hintNum = 0;
    }
    resetHintNum() {this.hintNum = 0;}

    static questionLatex(text) {
        let x = document.createElement("la-tex");
        if (text[0]=='@') {
            text = text.substring(1);
            x.setAttribute("display", "block");
        } else if (text[0]=='#') {
            return matrixHTML(text.substring(1));
        }
        x.innerHTML = text;
        return x;
    }
    static questionText(text) {
        let x = document.createElement("span");
        x.innerText = text;
        return x;
    }

    makeHintHTML() {
        if (this.hint.length > this.hintNum) {
            let para = document.createElement("p");
    
            let text = this.hint[this.hintNum].split("$");
                for (let i=0; i<text.length; i++) {
                    if (i%2==0) {
                        para.appendChild(Question.questionText(text[i]));
                    } else {
                        para.appendChild(Question.questionLatex(text[i]));
                    }
                }
            this.hintNum++;
            return [para, this.hintNum, this.hint.length];
        }
    }

    makeQuestionHTML(sect, qofsect, num=0) {
        let q = document.createElement("div");

        if (!this.drillQuestion) {
            let heading = document.createElement("h4");
            heading.innerText = `Question ${num}`;
            q.appendChild(heading);    
        }

        let para = document.createElement("p");
        
        if (this.drillQuestion) {
            let drillNum = document.createElement("span");
            drillNum.innerText = `Drill ${qofsect}: `;
            para.appendChild(drillNum);
        }

        let text = this.text.split("$");
            for (let i=0; i<text.length; i++) {
                if (i%2==0) {
                    para.appendChild(Question.questionText(text[i]));
                } else {
                    para.appendChild(Question.questionLatex(text[i]));
                }
            }
    
        q.appendChild(para);
        
        if (!this.longAnswer) {
            let ans = document.createElement("input");
            ans.setAttribute("type", "text"); 
            ans.setAttribute("id", `ans_${sect}_${qofsect}`);
            ans.setAttribute("class", "questionAns");
            q.appendChild(ans);

            if (this.drillQuestion) {
                ans.setAttribute("id", `drill_${sect}_${qofsect}`);
                let drillCheck = document.createElement("button");
                drillCheck.innerText = "Check";
                drillCheck.addEventListener("click", () => {checkDrill(q, this.answer, sect, qofsect)});
                q.appendChild(drillCheck);
            }
        }
        return q;
    }
}


