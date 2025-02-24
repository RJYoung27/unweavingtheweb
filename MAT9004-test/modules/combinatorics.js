
function set22() {
    const len = Math.floor(Math.random()*3+2);
    const conditions = ['only digits that are multiples of three (recall that zero is a multiple of three)',
        'only even numbers', 'only odd numbers', 
        'only the digits 4, 5, 6, 7, 8, or 9'];
    const vals = [[3, 3, 2, 1], [4, 4, 3, 2], [5, 4, 3, 2], [6, 5, 4, 3]]; 
    const i = Math.floor(Math.random()*conditions.length);

    const text = `How many $${len}$ digit numbers are there which contain ${conditions[i]} \
    and in which no digits are repeated? (note: such a number cannot start \
    with a $0$)`;    

    let ans = 1;
    for (let j=0; j<len; j++) {ans *= vals[i][j];}

    return [text, ans, [], false, false, false];
}

function set23() {
    const n = Math.floor(Math.random()*10+1);
    const k = Math.floor(Math.random()*(n+1));
    
    const text = [
        `A committee of $${k}$ must be formed out of a group of $${n}$ people. How \
        many different ways are there to form this committee?`,
        `Your local library puts limits on the number of books you can borrow per visit. \
        There are $${n}$ books you would like to borrow, but you are limited to $${k}$. \
        How many different ways could you borrow exactly $${k}$ books to read?`,
        `The bakery bakes $${n}$ different types of cake. How many different ways could you \
        taste $${k}$ different types of cake?`
    ][Math.floor(Math.random()*2)];

    let ans = 1;
    for (let j=k+1; j<=n; j++) {ans*=j;}
    console.log(ans);
    for (let j=1; j<=n-k; j++) {ans/=j;}
    console.log(ans);
    return [text, ans, [], false, false, false];
}

function set24() {
    function powered() {
        const s = Math.floor(Math.random()*5+4);

        const text = `There are $31$ flavours at any one time at the icecream company \
        Baskin-Robbins, and we have access to a secret additional flavour, bringing the \
        total number up to $32$ flavours. \nSuppose we order an icecream cone with $${s}$ \
        scoops of icecream in a stack (yes, it's a little ridiculous!). \
        There are exactly $2^n$ such icecreams. Find $n$.`;

        // 32^s = (2^5)^s = 2^(5s)
        const ans = 5*s 
        return [text, ans];
    }
    function open() {
        const [n,k] = [[2,2], [2,3], [2,4], [2,5], [3,2], [3,3], [3,4]][Math.floor(Math.random()*7)];

        const text = [`There are $${n}$ different drinks at the local cafe. After a drink is made, a \
            receipt is stabbed onto the receipt stub stack. So far $${k}$ people have ordered today. \
            How many different receipt stub stacks are possible?`, 
            `Exactly $${n}$ people are competing in $${k}$ races, with the winner of each race being reported \
            in the newspaper in the order they are run. Assuming that there is always a clear winner \
            (no race is ever a draw) how many ways can the winners for the races be written up?`][Math.floor(Math.random()*2)];

        const ans = Math.pow(n,k);
        return [text, ans];
    }
    let [text, ans] = [powered(), open()][Math.floor(Math.random()*2)];

    return [text, ans, [], false, false, false];
}

function set25() {
    function product(small, big) {
        let total = 1;
        for (let n=small; n<=big; n++) {total*=n}
        return total;
    }

    const t = Math.floor(Math.random()*3+3);
    const c = Math.floor(Math.random()*10+2);

    const scenario = ['single-flavour buckets of icecream', 'single-scoop icecream cones'][Math.floor(Math.random()*2)];

    const text = `There are only $${t}$ flavours of icecream that Ada likes. How many \
    different ways can Ada purchase $${c}$ ${scenario}?`

    const eqMin = Math.min(t-1, c);
    const eqMax = Math.max(t-1, c);

    // ((t-1)+c) choose (c OR t-1)   product: max(t-1, c) to max(t-1,c)+min(t-1,c) / product: min(t-1, c); 
    const ans = product(eqMax+1, t-1+c)/product(1,eqMin);

    return [text, ans, [], false, false, false];
}



export const combinatoricsSet = [set22, set23, set24, set25];
for (let k=0; k<4; k++) {
    let i = Math.floor(Math.random()*4);
    let j = Math.floor(Math.random()*4);
    [combinatoricsSet[i], combinatoricsSet[j]] = [combinatoricsSet[j], combinatoricsSet[i]];
}
