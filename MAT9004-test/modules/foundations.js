function set1() {
    return [
        ["Evaluate $\\displaystyle\\sum_{j=2}^{6}3j$", 60],
        ["Evaluate $\\displaystyle\\sum_{j=4}^{8}j$", 30],
        ["Evaluate $\\displaystyle\\sum_{j=1}^{3}(2j)^2$", 56]
    ][Math.floor(Math.random()*3)];
}

function set2() {
    return ["Evaluate $\\displaystyle\\prod_{j=1}^{3}j^2$", 36];
}

function set3() {
    return ["Choose which of the following words describes the function $f(x)=-3x^2+1$. \
    \nOptions: 'concave', 'convex', 'both', or 'neither'. Type the chosen word in the input field.", 
    "concave"];
}

function set4() {
    const m = Math.floor(Math.random()*20-10);
    const b = Math.floor(Math.random()*20-10);

    const x1 = Math.floor(Math.random()*10-8);
    const y1 = b+x1*m;
    const x2 = x1 + Math.floor(Math.random()*10);
    const y2 = b+x2*m;

    const text = `Find the equation of the line through the points $(${x1},${y1})$ \
    and $(${x2},${y2})$. The equation of the line should be of the form $y=mx+b$.\
    \nWrite the answer as $(m,b)$.`;

    const hint = [
        'When a line is written as $y = mx + b$, $m=$slope and $b=$y-intercept.',
        'Slope of a line is $\\frac{y_1 - y_2}{x_1 - x2}$.',
        `Substituting in the given values, this means the slope is $\\frac{${y1}-${y2}}{${x1}-${x2}}$, which means ...`,
        `$m = \\frac{${y1-y2}}{${x1-x2}} = ${m}$`,
        `Now that we know $m$, we can solve for $b$ by substituting in one of our known points, \
        like so: $${y1}=${m}\\times${x1}+b$.`,
        `Thus $b = ${y1}-(${m}\\times${x1}).`,
        `The answer is: $(${m},${b})$.`
    ];

    return [text, `(${m},${b})`, hint];
}

//log-log, log-lin
function set5() {
    const i = Math.floor(Math.random()*2);
    const f = ["f(x)=bx^a", "f(x)=ba^x"][i];
    const plot = ["log-log", "log-lin"][i];
    const base = [2,3,5,10][Math.floor(Math.random()*4)];
    const m = [Math.floor(Math.random()*-10), [1, 2, 3][Math.floor(Math.random()*3)]][i];
    const y = [1, 2, 3][Math.floor(Math.random()*3)];
    const a = [m, base**m][i];
    const b = base**y;

    const text = `Let $${f}$. Suppose that the ${plot} plot of this function, \
    with logarithms taken with base-${base}, shows a straight \
    line with slope $${m}$ and y-intercept $${y}$. What are \
    $a$ and $b$? \nWrite the answer as $(a,b)$.`;

    const hint = [
    [
        'The log-log plot of the function $f(x)=-bx^{-a}$ \
        creates a linear function with slope $-a$ and y-intercept \
        $log_{base}b$.',
        `Thus slope $= ${m} = -a$ ...`,
        `... and y-intercept $= ${y} = log_{${base}}b$.`, 
        `As $${m}=-a$, $a=${a}$.`,
        'Recall that if $log_{i}j = k$ then $i^k = j$.',
        `Thus: if $log_{${base}}b = ${y}$, then $${base}^${y} = b$.`,
        `The answer is: $(${a},${b})$.`
    ],
    [
        'The log-lin plot of the function $f(x)=ba^{x}$ \
        creates a linear function with slope $log_{base}a$ \
        and y-intercept $log_{base}b$.',
        `Thus slope $= ${m} = log_{${base}}a$ ...`,
        `... and y-intercept $= ${y} = log_{${base}}b$.`,
        'Recall that if $log_{i}j = k$ then $i^k = j$.',
        `Thus: if $log_{${base}}a = ${m}$, then $${base}^${m} = a$.`,
        `And: if $log_{${base}}b = ${y}$, then $${base}^${y} = b$.`,
        `The answer is: $(${a},${b})$.`
    ]
    ][i];

    return [text, `(${a},${b})`, hint]
}

//inverse
function set6() {
    // (x + a)^2 = x^2 + 2*x*a + a^2 = y
    // x^2 + 2*x*a = y-a^2
    const x = Math.floor(Math.random()*10+1);
    const a = Math.floor(Math.random()*5+1);
    const y = (x+a)**2;

    const text = `Consider the function $f:[0,\\infty) \\rightarrow$ \u211D where \
        $f(x)=x^2+${2*a}x$. What is the value of $f^{-1}(${y-a**2})$?`;

    const hint = [
        'To solve $f^{-1}$ we must solve the equation $f(x) = y$ for $x$.',
        `Thus to solve $f(x)=x^2+${2*a}x$ we must solve the equation $x^2+${2*a}x = y$ for $x$.`,
        `We have been given the value of $y$, and so the equation we are trying to solve is:\
        $@ x^2+${2*a}x = ${y-a**2}$`,
        'We recall that:\
        $@ (a+b)^2 = a^2 + 2ab + b^2$\n\
        If we can transform our equation into this form, the $x^2$ will be easy to deal with.',
        'With this in mind, we rearrange the equation we are trying to solve to get: ',
        `$@ 0 = x^2+${2*a}x + ${a**2-y}$`,
        `We can see that when we assume that $a=x$, this means that $a^2 = x^2$ and $2ab = ${2*a}x$.`,
        `However, we note that $b^2\\neq ${a**2-y}$.`,
        `Because we know that $a=x$ and $2ab = ${2*a}x$, we can reason that $b=\\frac{2ab}{2a}=\\frac{${2*a}x}{2x}=${a}$, and thus $b^2=${a*a}$.`,
        `To make the final term equal $${a*a}$, we add $${y}$ to both sides of the equation.`,
        `Thus we transform the equation from:\
        $@ 0 = x^2+${2*a}x + ${a**2-y}$`,
        `to:\
        $@ 0+${y} = x^2+${2*a}x + ${a**2-y}+${y}$\
        $@ ${y} = x^2+${2*a}x + ${a**2}$`,
        `We recall that $(a+b)^2 = a^2 + 2ab + b^2$ and thus:\
        $@ ${y} = (x + ${a})^2$`,
        `Taking the square root of both sides we get:
        $@ \\pm${x+a} = x + ${a}$`,
        `We solve for $x$ to get two possible answers: \n\
        ANSWER 1:\
        $@ x = -${x+a} - ${a}$\
        $@ x = ${-x-a-a}$`,
        `ANSWER 2:\
        $@ x = ${x+a} - ${a}$\
        $@ x = ${x}$`,
        'As we are told that $f:[0,\\infty) \\rightarrow$ \u211D, \
        this means that $f^{-1}:$\u211D $\\rightarrow [0,\\infty)',
        'Thus the correct answer must be non-negative.',
        `The answer is: $${x}$.`,
        'ALTERNATIVE APPROACH:\n\
        We can take a different approach and use the quadratic formula.',
        'Recall that the quadratic formula tells us: \
        $@ x = \\frac{-b\\pm \\sqrt{b^2 - 4ac}}{2a}$ when $ax^2 + bx + c = 0$.',
        `Thus, when: \
        $@ 0 = x^2+${2*a}x + ${a**2-y}$`,
        `We have: \
        $@ a=1$ \
        $@ b=${2*a}$ \
        $@ c=${a**2-y}$`,
        `We substitute these values into the quadratic formula to get: \
        $@ x = \\frac{${-2*a}\\pm \\sqrt{${2*a}^2 - 4\\times${a**2-y}}}{2}$`,
        'For some values this may be relatively easy to solve without a calculator, for other values we may struggle.'
    ]
    return [text, x, hint];
}


export const foundationSet = [set1, set2, set3, set4, set5, set6];



/**
 * inverse question moved to foundations 
5 questions: 
    • sigma notation
    • pi notation
    • convex / concave 
    • equation of a line
    • log-log plot interpretation 
        ◦ straight line with slope and y-intercept
        ◦ straight line with points: p1 and p2 


Sets
Sigma / Pi notation
Functions
    • domain
    • codomain
    • image
    • zeroes / roots 
    • inverse ???????????????????????????????????????
    • injective / surjective / bijective 
    • convex / concave
Function types
    • linear
        ◦ slope
        ◦ y-intercept
    • polynomial
    • exponential
    • logarithmic 
    • power-law
    • log-log plot 
    • log-lin plot
    • lin-log plot 
 */