
//find f'(i), use chain rule / product rule

function fractionDerivative() {
        //TODO prevent 0 
        function frac1() {
                let inner = [2, 3, 4, 5, 6, 7, 8, 9, 10][Math.floor(Math.random()*9)];
                return [inner, 3, 2];
        }
        function frac2() {
                let inner = [2, 3][Math.floor(Math.random()*2)];
                return [inner, 4, 3];
        }

        const x = Math.floor(Math.random()*21-10);

        const scenario = [frac1, frac2][Math.floor(Math.random()*2)]();
        
        const innerToPower = scenario[0];
        const numerator = scenario[1];
        const denom = scenario[2];        
        const a = denom*Math.floor(Math.random()*5+1);

        const innerSum = Math.pow(innerToPower, denom);
        const b = denom*Math.floor(Math.random()*5+1);
        const c = innerSum - x*b;

        const f = `f(x) = ${a}(${b}x + ${c})^\\frac{${numerator}}{${denom}}`;

        const ans = numerator*a*b*innerToPower/denom;

        const hintIngredients = [a, b, c, numerator, denom];

        return [f, x, ans, hintIngredients]
}

function productChainDerivative(){
        function ln(x) {
                //ln(ax + c)
                const a = Math.floor(Math.random()*5+1);
                const c = 1 - a*x;
                // ax + c must add to 1
                const text = `\\ln(${a}x + ${c})`;
                return [text, a, 1, 0, 1];
        }

        function e(x) {
                //e^{ax + c}
                const a = Math.floor(Math.random()*5+1);
                const c = -a*x;
                // always will be f' = 0*e*0 = 0 need to remove e
                const text = `e^{${a}x + ${c}}`;
                const f_num = 1;
                const f_den = 1;
                return [text, 0, 1, f_num, f_den];
        }
        function simple(x) {
                //(ax^n + b)
                // n = 2 when x!=0, else n can be anything

                let n = 2;
                if (x == 0) {n = Math.floor(Math.random()*21-10)};
                const a = Math.floor(Math.random()*5+1);
                const b = Math.floor(Math.random()*21-10);
                const text = `(${a}x^${n} + ${b})`;
                const f = a*(x**n)+b; //can only be this, as n<0 only when x=0
                return [text, a*n*(x**(n-1)), 1, f, 1];
        }

        const x = Math.floor(Math.random()*21-10);
        const g = [ln(x), e(x)][Math.floor(Math.random()*2)];
        const h = simple(x);
        const text = `${h[0]}${g[0]}`
        const ans = g[1]*h[3] + g[3]*h[1]; 

        return [x, text, ans]

}

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

function clean(num, power=false) {
        if (num == 1) {return '';}
        if (num == -1) {return '-';}
        if (power == true) {return `^${num}`;}
        return num;
}

//TODO: merge clean and cleanVar
function cleanVar(num, variable='', power=false) {
        if (num == 0) {return '';}
        if (num == 1) {return variable;}
        if (num == -1) {return `-${variable}`;}
        if (power == true) {return `${variable}^${num}`;}
        return num;
}

function set7() {
        const x = fractionDerivative();
        const text = `Find $f'(${x[1]})$ when $${x[0]}$.`;
        const [a, b, c, numerator, denom] = x[3];
        const [duNum, duDen] = simplify(numerator*a, denom);
        const [daNum, daDen] = simplify(numerator-denom, denom);
        const [deNum, deDen] = simplify(duNum*b, duDen);

        const hint = [
                'This question requires us to use the chain rule: \
                $@ \\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx} $',
                `Let $u = ${b}x + ${c}$.`,
                `Thus $y = ${a}u^{\\frac{${numerator}}{${denom}}}$.`,
                `We differentiate $y$ with respect to $u$ to get: \
                $@ \\frac{dy}{du} = \\frac{${numerator}}{${denom}}\\times ${a}\\times u^{(\\frac{${numerator}}{${denom}}-1)}$ \n\
                $@ \\frac{dy}{du} = \\frac{${duNum}}{${duDen}}u^{\\frac{${daNum}}{${daDen}}}$`,
                `We differentiate $u$ with respect to $x$ to get: \
                $@ \\frac{du}{dx} = ${b}$`,
                `We substitute $\\frac{dy}{du}$ and $\\frac{du}{dx}$ into the chain rule to get: \
                $@ \\frac{dy}{dx} = \\frac{${duNum}}{${duDen}}u^{\\frac{${daNum}}{${daDen}}} \\times ${b}$`,
                `We now have two options for how to proceed. \
                The first option gives us the equation, and it's up to us to simplify. \
                The second option builds up the answer while keeping the numbers as small as possible. \
                Both options are effectively the same, and will give the correct answer.`,
                `OPTION 1: \nWe fully calculate out our differential to get:\
                $@ \\frac{dy}{dx} = ${deNum}(${b}x+${c})^{\\frac{${daNum}}{${daDen}}}$`,
                `We substitute $x=${x[1]}$ to find: \
                $@f'(${x[1]}) = ${deNum}(${b}\\times${x[1]}+${c})^{\\frac{${daNum}}{${daDen}}} $`,
                `Solving this equation will give us $f'(${x[1]})$ when $${x[0]}$.`,
                `OPTION 2: \nWe solve for $u$ when $x=${x[1]}$`, 
                `$@ u = ${b}x + ${c}$`,
                `$@ u = ${b}\\times${x[1]} + ${c}$ \n\
                $@ u = ${b*x[1]+c}$`,
                `We know that $\\frac{dy}{dx}$ includes $u^{\\frac{${daNum}}{${daDen}}}$, \
                so to keep our numbers small we can calculate this first:`,
                `$@ u^{\\frac{${daNum}}{${daDen}}} = \\sqrt[${daDen}]{${b*x[1]+c}}$`,
                `$@ u^{\\frac{${daNum}}{${daDen}}} = ${Math.pow(b*x[1]+c, 1/daDen)}$`,
                `We now have three numbers to multiply together: \
                $@ f'(${x[1]}) = ${b}\\times \\frac{${duNum}}{${duDen}} \\times u^{\\frac{${daNum}}{${daDen}}}$\n
                $@ f'(${x[1]}) = ${b}\\times \\frac{${duNum}}{${duDen}} \\times ${Math.pow(b*x[1]+c, 1/daDen)}$`,
                'We can calculate this to give us the answer!',
                `The answer is: ${x[2]}.`
        ]
        return [text, x[2], hint];
}

//find the slope of the tangent line to the graph of f at x=i.
function set8() {
        const x = productChainDerivative();
        const text = `Let $f = ${x[1]}$. Find the slope of the tangent line to the graph of $f$ at \
                when $x = ${x[0]}$. \nExpress your answer as an \
                improper fraction if necessary.`;
        return [text, x[2]]
}

//find the maximum value under a constraint (xy)
function set9() {
        // a and b are always positive 
        const a = Math.floor(Math.random()*9+2);
        // b is a number between [1,a-1] OR [a+1,a+??]
        const b = [Math.floor(Math.random()*(a-1) + 1), Math.floor(Math.random()*5 + (a+1))][Math.floor(Math.random()*2)];
        
        let scale2 = Math.floor(Math.random()*10-4);
        if (scale2>=0) {scale2++;} 
        const c = 2*a*b*scale2;
        const text = `Find the maximum value of the product $xy$, under the constraint that \
                $${a}x + ${b}y = ${c}$.`;

        const [num, den] = simplify(c, a*2);
        const ans = c/2*scale2 

        //when x = c / 2a the equation is maximised 
        //y = (c-ax) / b

        // max at: (c/2a) * (c-a(c/2a))/b
        // c(c-c/2)/2ab
        // c/2 * scale2

        const hint = [
                'This question looks like it is a multivariate question, but do not be fooled! \
                Can you see a way to reword it to reduce it to one variable?',
                'Note the the constraint allows us to rewrite the $y$ in terms of $x$, like so:',
                `$@ y = \\frac{${c} + ${-a}x}{${b}}$`,
                `Thus we are actually trying to find the maximum of the product: \
                $@ x(\\frac{${c} + ${-a}x}{${b}})$`, 
                "Let's expand that out to make it easier to differentiate, and call the function we are \
                trying to maximise $f$:",
                `$@ f(x) = \\frac{1}{${b}}(${-a}x^2 + ${c}x)$`,
                'We want to maximise this function, thus we need to find all stationary points.',
                `We find stationary points by finding the values of $x$ where $f'(x)=0$. \
                Thus we need to calculate $f'(x)$.`,
                `$@ f'(x) = \\frac{1}{${b}}(${-a*2}x + ${c})$`,
                `We now solve for $f'(x) = 0:$`,
                `$@ 0 = \\frac{1}{${b}}(${-a*2}x + ${c})$`,
                `$@ 0 = ${-a*2}x + ${c}$`,
                `$@ ${a*2}x = ${c}$`,
                `$@ x = \\frac{${c}}{${a*2}}$`,
                `$@ x = ${num}$`,
                `Now we know that $f'(${num})$ is a stationary point, we calculate $f(${num})$:`,
                `$@ f(${num}) = ${num}(\\frac{${c} + ${-a}\\times ${num}}{${b}})$`,
                `The answer is: $${ans}$`
        ]

        return [text, ans, hint];
}

//find where f(x) has a stationary point.
function set10() {
        //e^{ax^2 + bx + c}
        let a = Math.floor(Math.random()*20-9);
        if (a>=0) {a++;}
        let b = Math.floor(Math.random()*20-9);
        if (b>=0) {b++;}
        let c = 2*a*b*Math.floor(Math.random()*20-9);
        if (c>=0) {c++;}
        const text = `For the function $g(x)=e^{${a}x^2 + ${b}x + ${c}}$, find $x$ at which $g$ has a \
                stationary value. \nExpress your answer as an improper fraction if necessary.`;

        let num = -b; 
        let den = 2*a;

        let simplified = simplify(num, den);

        const hint = [
                `We are trying to find $x$ such that $g'(x) = 0.`,
                `To find $g'$ we need to use the chain rule: \
                $@ \\frac{dg}{dx} = \\frac{dg}{du}\\frac{du}{dx}$`,
                `Let $u=${a}x^2 + ${b}x + ${c}$.`,
                `Thus $g=e^u$.`,
                `We differentiate $g$ with respect to $u$ to get: 
                $@ \\frac{dg}{du} = e^u$`,
                `We differentiate $u$ with respect to $x$ to get:
                $@ \\frac{du}{dx} = ${a*2}x + ${b}$`,
                `We substitute $\\frac{dg}{du}$ and $\\frac{du}{dx}$ into the chain rule to get: \
                $@ \\frac{dg}{dx} = e^u \\times (${a*2}x + ${b})$`,
                'If we were to substitute $u$ back into this equation we would get a very ugly expression, \
                thus we pause to see if we can come up with a better plan.',
                `As we wish to find $x$ such that $g'(x) = \\frac{dg}{dx} = 0$, we can exploit the fact that \
                $ anything \\times 0 = 0$.`, 
                `Thus, if $g'(x) = 0$, and $g'(x) = e^u \\times (${a*2}x + ${b})$, then either $e^u = 0$ or $${a*2}x + ${b} = 0$.`,
                `It is impossible for $e^u = 0$, thus it must be true that $${a*2}x + ${b} = 0$.`,
                `We solve the equation:
                $@ ${a*2}x + ${b} = 0$ \n\
                $@ x = \\frac{${-b}}{${a*2}}$`,
                `The answer is: ${simplified[0]}/${simplified[1]}.`
        ];
        return [text, `${simplified[0]}/${simplified[1]}`, hint]
}

//definite integral 
function set11() {
        // integrate a to b: mx^2 + nx + p
        const a = Math.floor(Math.random()*5-4);
        const b = a + Math.floor(Math.random()*4+1);
        const m = Math.floor(Math.random()*8-4) * 3;
        const n = Math.floor(Math.random()*21-10);
        const p = Math.floor(Math.random()*21-10);
        const ans = m/3*b*b*b + n/2*b*b + p*b - (m/3*a*a*a + n/2*a*a + p*a) 
        const text = `Evaluate $\\int_{${a}}^{${b}}(${m}x^2+${n}x+${p})\\,dx$`;
        return [text, ans];
}

//find where f(x,y) has a stationary point
function set12() {
        function opt1() {
                /*
                +/- cx +/- ln(ax^p + by^q) +/- d 
                +/- cy +/- ln(ax^p + by^q) +/- d
                */
               const a = Math.floor(Math.random()*10+1);
               const b = Math.floor(Math.random()*10+1);
               const c = Math.floor(Math.random()*10+1);
               const d = Math.floor(Math.random()*10+1);
               const p = Math.floor(Math.random()*4+2);
               const q = Math.floor(Math.random()*4+2);

                const xORy = Math.floor(Math.random()*2); //0 is x; 1 is y

                const components = [];
                if (xORy == 0) {components.push(`${clean(c)}x`);}
                else if (xORy == 1) {components.push(`${clean(c)}y`);}
                components.push(`\\ln(${clean(a)}x${clean(p, true)} + ${clean(b)}y${clean(q, true)})`);
                components.push(`${d}`);

                const order = [0, 1, 2];                
                for (let i=0; i<3; i++) {
                        let randomI = Math.floor(Math.random()*3); 
                        [order[i], order[randomI]] = [order[randomI], order[i]];
                }

                const signs = [Math.floor(Math.random()*2), Math.floor(Math.random()*2), 
                        Math.floor(Math.random()*2)]; // 0 is +; 1 is -
                const signRepForOrder = ['', '+', '+'];
                for (let i=0; i<3; i++) {
                        if (signs[order[i]] == 1) {signRepForOrder[i]='-'};
                }

                const eq = `${signRepForOrder[0]} ${components[order[0]]} ${signRepForOrder[1]} \
                        ${components[order[1]]} ${signRepForOrder[2]} ${components[order[2]]}`;

                
                // Write answer nicely
                let ansSign = '';
                if (signs[0]==signs[1]) {ansSign = '-'};

                let vals; 
                if (xORy == 0) {vals = simplify(p, c);}
                else if (xORy == 1) {vals = simplify(q, c);}
                let val;
                if (vals[1] == 1) {val = vals[0];}
                else {val = `${vals[0]}/${vals[1]}`;}

                let ans;
                if (xORy == 0) {ans = `(${ansSign}${val}, 0)`;}
                else if (xORy == 1) {ans = `(0, ${ansSign}${val})`;}

                return [eq, ans];
        }
        const eq = opt1();
        const text = `Find the stationary point of the function $f(x, y)= ${eq[0]}$, \
        with domain $(x, y) \\neq (0, 0)$. Express the point in the form $(a, b)$, \
        and write any fractions as improper fractions.`;
        const ans = eq[1];
        return [text, ans];
}

//find the gradiant vector at a given point
function set13() {
        // g(x,y) = a xy/x/y(bx^p + c y^q)
        // gradient at point (m, n)

        const outerVar = [[1,1],[1,1],[1,0],[0,1]];
        const i = Math.floor(Math.random()*outerVar.length);
        const a = Math.floor(Math.random()*3+1);
        const b = Math.floor(Math.random()*3+1);
        const c = Math.floor(Math.random()*3+1);
        const p = Math.floor(Math.random()*2+1);
        const q = Math.floor(Math.random()*2+1);
        const m = Math.floor(Math.random()*5-2);
        const n = Math.floor(Math.random()*5-2);

        const s = outerVar[i][0];
        const t = outerVar[i][1];

        const eq = `${clean(a)}${['','x'][s]}${['','y'][t]}(${clean(b)}x${clean(p,true)}+${clean(c)}y${clean(q,true)})`;

        const text = `For the function $g(x, y)=${eq}$, find the gradient vector \
        $\\nablag$ at the point $(${m}, ${n})$. Express the vector in the form \
        $(a, b)$.`;

        const ansA = a*b*(p+s)*Math.pow(m,p+s-1)*Math.pow(n,t) + s*a*c*Math.pow(n,q+t); //scale second part by s so if no x, = 0
        const ansB = a*c*Math.pow(m,s)*(q+t)*Math.pow(n,q+t-1) + t*a*b*Math.pow(m,p+s); //scale second part by s so if no x, = 0
        const ans = `(${ansA}, ${ansB})`;

        return [text, ans];
}

function set14() {
        function partialDif(term, v) {
                // term is an array with three numbers
                // v is 1 for x, 2 for y
                let newTerm = Array(3);
                newTerm[0] = term[0]*term[v];
                newTerm[1] = term[1];
                newTerm[2] = term[2];
                newTerm[v] = Math.max(term[v]-1,0);
                return newTerm;
        }
        function calculateTotal(terms, x, y) {
                let total = 0;
                for (let i=0; i<terms.length; i++) {
                        total += terms[i][0]*Math.pow(x, terms[i][1])*Math.pow(y, terms[i][2]); 
                }
                return total;
        }
        function strExpression(terms) {
                const exp = [];
                for (let i=0; i<terms.length; i++) {
                        if (terms[i][0]!=0) {
                                exp.push(String(terms[i][0]));
                                if (terms[i][1] > 0) {
                                        if (terms[i][1]==1) {exp.push('x');} 
                                        else {exp.push(`x^${terms[i][1]}`);}}
                                if (terms[i][2] > 0) {
                                        if (terms[i][2]==1) {exp.push('y');} 
                                        else {exp.push(`y^${terms[i][2]}`);}}                                exp.push('+');
                        }
                }
                exp.pop();
                if (exp.length == 0) {return '0';}
                return exp.join('');
        }

        const p = [[3,1], [3,2], [4,1], [4,2]][Math.floor(Math.random()*4)];
        const q = [[1,3], [2,3], [1,4], [2,4]][Math.floor(Math.random()*4)];
        const r = [Math.floor(Math.random()*5+1), Math.floor(Math.random()*5+1)];
        const a = Math.floor(Math.random()*4+1);
        const b = Math.floor(Math.random()*4+1);
        const c = Math.floor(Math.random()*4+1);
        const [x, y] = [[0,1], [1,0], [-1,0], [0,-1], [0,2], [2,0], [0,-2], [-2,0]][Math.floor(Math.random()*8)];

        const term1 = [a, p[0], p[1]]
        const term2 = [b, q[0], q[1]]
        const term3 = [c, r[0], r[1]]

        const term1x = partialDif(term1, 1)
        const term2x = partialDif(term2, 1)
        const term3x = partialDif(term3, 1)

        const term1y = partialDif(term1, 2)
        const term2y = partialDif(term2, 2)
        const term3y = partialDif(term3, 2)

        const term1xx = partialDif(term1x, 1)
        const term2xx = partialDif(term2x, 1)
        const term3xx = partialDif(term3x, 1)

        const term1yx = partialDif(term1y, 1)
        const term2yx = partialDif(term2y, 1)
        const term3yx = partialDif(term3y, 1)

        const term1xy = partialDif(term1x, 2)
        const term2xy = partialDif(term2x, 2)
        const term3xy = partialDif(term3x, 2)

        const term1yy = partialDif(term1y, 2)
        const term2yy = partialDif(term2y, 2)
        const term3yy = partialDif(term3y, 2)

        const eq1 = strExpression([term1x, term2x, term3x]);
        const eq2 = strExpression([term1y, term2y, term3y]);

        const text = `If the gradient of the function $f$ satisfies: \
        $@ \\nabla f(x,y)= \\begin{pmatrix} ${eq1} \\\\ ${eq2} \\end{pmatrix} $\
        find the determinant of $H(${x},${y})$, where $H$ refers \
        to the Hessian matrix.`;

        const eqxx = calculateTotal([term1xx, term2xx, term3xx], x, y);
        const eqxy = calculateTotal([term1xy, term2xy, term3xy], x, y);
        const eqyx = calculateTotal([term1yx, term2yx, term3yx], x, y);
        const eqyy = calculateTotal([term1yy, term2yy, term3yy], x, y);

        const ans = eqxx*eqyy - eqxy*eqyx 

        const hint = [
                'The Hessian matrix for $f(x,y)$ is defined by: $@ H(x,y) = \
                \\begin{bmatrix} \
                f_{xx}(x,y) &f_{xy}(x,y) \\\\ f_{yx}(x,y) &f_{yy}(x,y)\
                \\end{bmatrix}$',
                'The determinant of a $2 \\times 2$ matrix is \
                $@ det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$ ',
                `We are given $f_x=${eq1}$, thus we can calculate $f_{xx}$ and $f_{xy}$:`,
                `$@ f_{xx} = ${strExpression([term1xx, term2xx, term3xx])}$`,
                `$@ f_{xy} = ${strExpression([term1xy, term2xy, term3xy])}$`,
                `We are also given $f_y=${eq2}$, thus we can calculate $f_{yx}$ and $f_{yy}$:`,
                `$@ f_{yx} = ${strExpression([term1yx, term2yx, term3yx])}$`,
                `$@ f_{yy} = ${strExpression([term1yy, term2yy, term3yy])}$`,
                `We now substitute $x=${x}$ and $y=${y}$ into each of our partial derivatives:`,
                `$@ f_{xx}(${x},${y})=${eqxx}$`,
                `$@ f_{xy}(${x},${y})=${eqxy}$`,
                `$@ f_{yx}(${x},${y})=${eqyx}$`,
                `$@ f_{yy}(${x},${y})=${eqyy}$`,
                `We can now fill in our Hessian matrix:`,
                `$@ H(${x}, ${y}) = \\begin{bmatrix} \
                ${eqxx} & ${eqxy} \\\\ ${eqyx} & ${eqyy} \
                \\end{bmatrix}`,
                `The determinant of $H(${x},${y}) = (${eqxx}\\times ${eqyy}) - (${eqxy} \\times ${eqyx}$).`,
                'Some things to notice:', 
                '* when $f_{xx}=0$ you do not need to calculate $f_{yy}$ \
                as $f_{xx}\\times f_{yy}=0$ (and vice versa when $f_{yy}=0$); the same reasoning can be applied \
                to $f_{xy}$ and $f_{yx}$.',
                '* when $x=0$ or $y=0$ many terms will end up evaluating to 0, so wait to do large \
                multiplications only once you know which terms will be used.',
                `The answer is: ${ans}.`
        ];

        return [text, ans, hint];
}


//RSS 
function set15() {
        let a = Math.floor(Math.random()*20 - 9);
        if (a>=0) {a++;}
        let b = Math.floor(Math.random()*20 - 9);
        if (b>=0) {b++;}

        const x1 = Math.floor(Math.random()*8-5);
        const x2 = Math.floor(Math.random()*3+1) + x1;
        const x3 = Math.floor(Math.random()*3+1) + x2;

        const error1 = Math.floor(Math.random()*7-3);
        const error2 = Math.floor(Math.random()*7-3);
        const error3 = Math.floor(Math.random()*7-3);

        const text = `What is the residual sum of squares (RSS) when approximating $(${x1},${a*x1+b+error1})$, \
        $(${x2},${a*x2+b+error2})$, $(${x3},${a*x3+b+error3})$ by $f(x)=${clean(a)}x+${b}$?`;
        const ans = x1*x1 + x2*x2 + x3*x3;
        return [text, ans];
}



export const functionSet = [set7, set8, set9, set10, set11, set12, set13, set14, set15];


class FunctionQuestions {
        // 9 questions
        // 1+ : find the derivative of a function
        // 1+ : 
}

/**
 * 10 questions: 
    • find f’(0)
    • find slope of line at x=0 (i.e., f’(0))
    • find max value of f(x,y) under constraint 
    • find stationary point (x for h(x) where h has stationary value) 
    • definite integral 
    • stationary point of f(x, y) with domain (x,y) = ##, in form (a,b)
    • find gradient vector of f(x,y) at point (a,b), in form (a,b)
    • given a gradient vector for f(x,y) , find the determinant of H(a, b)
    • calculate RSS 


Derivatives 
    • basic derivatives: constant / polynomial / exponential / logarithmic 
    • derivatives of functions: product rule / chain rule 
    • n-th derivative 
    • stationary point 
    • local extrema: local maximum / local minimum 
    • inflection point 
    • second derivative test
    • global minimum / global maximum 
    • (it appears that) in this unit only continuous functions on closed intervals are considered 
    • boundary point / stationary point / singular point 
Residual Sum of Squares (RSS) 
Integrals 
    • definite integral 
    • antiderivative 
    • Fundamental Theorem of Calculus
    • indefinite integral 
Binary relations
    • equation of a circle
    • equation of an ellipse
Multivariate calculus
    • contour maps
    • level set
    • gradient vector
    • stationary point
    • local minimum / local maximum / saddle point
    • second partial derivative with respect to _ / mixed partial derivative 
    • Hessian matrix
    • global extrema / optimal value 
    • convexity and concavity based on second derivatives 
 */