//TODO: remove repeat code (simplify is also in functions.js)
function simplify(num, den) {
    for (let n of [2, 3, 5, 7]) {
            while (num % n == 0 && den % n == 0) {
                    num /= n;
                    den /= n;
            }
    }
    if (den < 0) {num *= -1; den *= -1}
    return [num, den];
}

function set26() {
    const num = ["three", "four", "five", "six", "seven", "nine", "ten"];
    const expVal = [2, 2.5, 3, 3.5, 4, 5, 5.5];
    const d1 = Math.floor(Math.random()*num.length);
    const d2 = Math.floor(Math.random()*num.length);
    const j = Math.floor(Math.random()*4+1);
    const k = Math.floor(Math.random()*4+1);

    const text = `Random variable $X$ is defined to be the value when a fair \
    ${num[d1]}-sided die is rolled, and $Y$ is defined to be the value when a fair \
    ${num[d2]}-sided die is rolled. Find the expectation $E[${j}X + ${k}Y ]$. \
    \nWrite your answer as a decimal if necessary.`

    const ans = j*expVal[d1] + k*expVal[d2];

    return [text, ans];
}

function set27() {
    const tosses = ['twice', 'three times', 'four times', 'five times', 'seven times', 'nine times'];
    const dig = [2, 3, 4, 5, 7, 9];
    const s = [[3,3,3], [1,2,2], [5,5,5], [3,6,6], [2,4,4], [5,5,5]];
    const winlose = ['wins', 'loses'];
    const sign = [1, -1];

    const t = Math.floor(Math.random()*tosses.length);

    let amounts = [];
    for (let i=0;i<3;i++) {amounts.push(s[t][i]*Math.floor(Math.random()*6+1))};

    let signs = [];
    for (let i=0;i<3;i++) {signs.push(Math.floor(Math.random()*2))};


    const text = `A game is played in which a fair coin is tossed ${tosses[t]}. \
    If $2$ or more heads are thrown the player ${winlose[signs[0]]} $${amounts[0]}$ dollars, if one \
    head occurs the player ${winlose[signs[1]]} $${amounts[1]}$ dollars and if no heads occur the player \
    ${winlose[signs[2]]} $${amounts[2]}$ dollars. What is the expected value of their winnings, in \
    dollars? \nNote: just put the number, do not put a dollar sign; write your answer as a decimal if necessary.`

    const ans = (sign[signs[0]]*amounts[0]*(dig[t]-1))/(dig[t]+1) + sign[signs[1]]*amounts[1]/(dig[t]+1) + sign[signs[2]]*amounts[2]/(dig[t]+1);

    return [text, ans];
}

function set28() {
    const p = Math.floor(Math.random()*2+1);
    const a = Math.floor(Math.random()*5+1);
    const b = Math.floor(Math.random()*a+1);
    const s = Math.floor(Math.random()*2); //positive, negative

    let eq;  //makes the power nicer 
    if (p == 2) {eq = [`kx^${p}(${a}-${b}x)`, `kx^${p}(${b}x-${a})`][s];}  
    else if (p == 1) {eq = [`kx(${a}-${b}x)`, `kx(${b}x-${a})`][s];}

    const text = `Suppose a continuous random variable $X$ has a probability density \
    function $h(x)$ defined by $h(x) = ${eq}$ for $0 < x < 1$, and \
    $h(x) = 0$ for $x$ outside this interval. Find $k$. \nWrite your answer as a simplified \
    improper fraction if necessary.`

    /*
     if positive:  a/(pwr+1)-b/(pwr+2) = a*(pwr+2) - b*(pwr+1) / (pwr+1)(pwr+2)
        thus: ans = (pwr+1)(pwr+2) / a*(pwr+2)-b*(pwr+1)
    */   
   const ansN = (p+1)*(p+2)*[1,-1][s];
   const ansD = a*(p+2)-b*(p+1);
   const simplifiedAns = simplify(ansN, ansD);

   let ans;
   if (simplifiedAns[1] == 1) {ans = simplifiedAns[0];}
   else {ans = `${simplifiedAns[0]}/${simplifiedAns[1]}`;}

   return [text, ans];
}

//TODO: make random 
function set29() {
    //const pdfType = Math.floor(Math.random()*3);  // a/b x^p ; a/b (x-c)^2 ; a/b (x+c)^2

    const i = Math.floor(Math.random()*2);
    const eq = ['h(x)=\\frac{3}{8}x^2', 'h(x)=\\frac{3}{2}(x-1)^2'][i];

    const text = `Suppose a random variable $X$ admits the pdf $${eq}$ \
    for $0 < x < 2$ and $0$ elsewhere. Find $E[X]$ and $Var(X)$. \
    \nReduce all fractions, and leave numbers as improper fractions rather \
    than mixed numbers or decimals. Write your answer as $(E[X], Var(X))$.\
    \n(Yes, this question needs to be improved! Both the input and the question itself.)`

    const ans = ['(3/2, 3/20)', '(1, 3/5)'][i];
    return [text, ans];
}



export const probabilitySet = [set26, set27, set28, set29];