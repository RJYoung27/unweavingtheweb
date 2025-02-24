
// invertable 
function set16() {
    //ad - bc = 0
    const loc = Math.floor(Math.random()*4);

    const f = [Math.floor(Math.random()*8 - 4), 
            Math.floor(Math.random()*3 + 1), 
            Math.floor(Math.random()*6 - 3),
            Math.floor(Math.random()*21 - 10)];

    // Get rid of most of the zeros
    if (f[0] == 0) {f[0] = Math.floor(Math.random()*4 + 1)}
    if (f[2] == 0) {f[2] = Math.floor(Math.random()*3 +1)}

    const v = [f[0]*f[1], f[0]*f[2], f[1]*f[3], f[2]*f[3]];
    const ans = v[loc];
    v[loc] = 'x';
    
    const text = `Let $A = \\begin{pmatrix} ${v[0]} & ${v[1]} \\\\ ${v[2]} & ${v[3]} \\end{pmatrix}$. \
    For which $x \\in$ \u211D is $A$ not invertible?`;
    return [text, ans];
}


const invM = [
    [[1, -1, 0,1, 0, -1,2, 3, -4], 1, [3, -4, 1,2, -4, 1,3, -5, 1]],
    [[1, 0, 2,0, 1, 4,0, 0, 1], 1, [1, 0, -2,0, 1, -4,0, 0, 1]],
    [[1, 2, 3,2, 0, -3,1, 0, -1], 2, [0, -2, 6,1, 4, -9,0, -2, 4]],
    [[1, 2, 3,2, 0, -3,0, 2, 5], 2, [-6, 4, 6,10, -5, -9,-4, 2, 4]],
    [[2, 0, -3,1, 2, 3,0, 2, 5], 2, [4, -6, 6,-5, 10, -9,2, -4, 4]], 
    [[3, 0, -2,1, 3, 4,0, 3, 4], 6, [0, 6, -6,4, -12, 14,-3, 9, -9]],
    [[1, 3, 4,0, 3, 4,3, 0, -2], 6, [6, -6, 0,-12, 14, 4,9, -9, -3]]
]

function set17() {
    const m = Math.floor(Math.random()*invM.length);
    const i = Math.floor(Math.random()*9);
    const ans = invM[m][2][i];


    const inverse = []
    for (let j=0; j<9; j++) {
        if (j == i) {inverse.push('x');}
        else {inverse.push(invM[m][2][j]);}
    }

    const text = `Let $A = \\begin{pmatrix} ${invM[m][0][0]} & ${invM[m][0][1]} & ${invM[m][0][2]} \\\\ \
        ${invM[m][0][3]} & ${invM[m][0][4]} & ${invM[m][0][5]} \\\\ ${invM[m][0][6]} & ${invM[m][0][7]} & ${invM[m][0][8]} \\end{pmatrix}$. \
        Then $A^{-1} = \\frac{1}{${invM[m][1]}}\\begin{pmatrix} ${inverse[0]} & ${inverse[1]} & ${inverse[2]} \\\\ \
        ${inverse[3]} & ${inverse[4]} & ${inverse[5]} \\\\ ${inverse[6]} & ${inverse[7]} & ${inverse[8]} \\end{pmatrix}$. \
        Find $x$.`;
    
    return [text, ans];
}


function set19() {
    function factorise(num) {
        const factors = [1, num];
        if ((num % 2) == 0) {factors.push(2); factors.push(num/2)}
        if ((num % 3) == 0) {factors.push(3); factors.push(num/3)}
        if ((num % 4) == 0) {factors.push(3); factors.push(num/4)}
        if ((num % 5) == 0) {factors.push(3); factors.push(num/5)}
        return factors;
    }
    //ab + cd = -ef
    const f = [
        Math.floor(Math.random()*5 +1), 
        Math.floor(Math.random()*11 -5), 
        Math.floor(Math.random()*5 +1),
        Math.floor(Math.random()*11 -5)];

    const ab = f[0]*f[1];
    const cd = f[2]*f[3];
    const ef = (ab + cd)*-1;

    const efFac = factorise(ef); 
    f.push(efFac[Math.floor(Math.random()*efFac.length)]);
    f.push(ef/f[f.length-1]);

    const xi = Math.floor(Math.random()*6);
    const x = f[xi];
    f[xi] = 'x';

    const v1 = [f[0], f[2], f[4]];
    const v2 = [f[1], f[3], f[5]];

    const text = `Let $a = \\begin{pmatrix} ${v1[0]} \\\\ ${v1[1]} \\\\ ${v1[2]} \\end{pmatrix}$ and \
    $b = \\begin{pmatrix} ${v2[0]} \\\\ ${v2[1]} \\\\ ${v2[2]} \\end{pmatrix}$. Suppose that \
    $a$ and $b$ are orthogonal. What is $x$?`;

    return [text, x];
}

function set20() {
    function squareSquares() {
        const s = [[1, 2, 2], [1, 4, 8], [2, 3, 6],
            [2, 4, 4], [3, 6, 6], [4, 4, 7],
            [2, 6, 9], [6, 6, 7], [4, 8, 8], 
            [3, 4, 12]][Math.floor(Math.random()*10)] 
        const sign = [[1,-1][Math.floor(Math.random()*2)],
                [1,-1][Math.floor(Math.random()*2)],
                [1,-1][Math.floor(Math.random()*2)]]
        const order = [[0,1,2], [0,2,1], [1,0,2], [1,2,0], [2,0,1], [2,1,0]][Math.floor(Math.random()*6)];

        return [s[order[0]]*sign[0], s[order[1]]*sign[1], s[order[2]]*sign[2]];

    }
    const val = squareSquares();
    const text = `Find the length of the vector $(${val[0]}, ${val[1]}, ${val[2]})$.`;
    return [text, Math.sqrt(val[0]*val[0]+val[1]*val[1]+val[2]*val[2])];
}


function determinate(matrix) {
    const a = matrix[0][0]; 
    const b = matrix[0][1];
    const c = matrix[0][2];
    const d = matrix[1][0]; 
    const e = matrix[1][1]; 
    const f = matrix[1][2]; 
    const g = matrix[2][0]; 
    const h = matrix[2][1]; 
    const i = matrix[2][2]; 

    return a*(e*i-f*h) + b*(d*i-f*g) + c*(d*h-e*g);
}


let q17 = "Let $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 0 & -3 \\\\ 1 & 0 & -1 \\end{pmatrix}$. \
    Then $A^{-1} = \\begin{pmatrix} 0 & -1 & x \\\\ \\frac{1}{2} & 2 & -\\frac{9}{2} \\\\ 0 & -1 & 2 \\end{pmatrix}$. \
    Find $x$.";

let q18 = "Let $A = \\begin{pmatrix} -2 & -4 & 2 \\\\ -2 & 1 & 2 \\\\ 4 & 2 & 5 \\end{pmatrix}$. \
    One of the eigenvalues of $A$ is $6$; if the corresponding eigenvector \
    is of the form $(1, y, z)$, find $y$ and $z$. \nYour answer should be \
    in the form $(y, z)$.";


let q21 = "Solve the following system of linear equations using Gaussian elimination: \
    $@ \\begin{pmatrix} 1 & -1 & 1 \\\\ 2 & 3 & -1 \\\\ 3 & -2 & -9 \\end{pmatrix} \
    \\begin{pmatrix} x \\\\ y \\\\ x \\end{pmatrix} = \
    \\begin{pmatrix} 8 \\\\ -2 \\\\ 9 \\end{pmatrix}$ \nYour answer should be \
    in the form $(x, y, z)$.";



function todo() {
    return ['todo', 'todo'];
}


export const linearSet = [set16, set17, todo, set19, set20, todo];


/*
#3, 0, -2
#1, 3, 4
#0, 3, 4

INVERSE
#0, 1, -1
#2/3, -2, 7/3
#-1/2, 3/2, -3/2
-----------------------------

1, 3, 4
0, 3, 4
3, 0, -2

INVERSE
1, -1, 0
-2, 7/3, 2/3
3/2, -3/2, -1/2

------------------------
#1, 2, 3
#2, 0, -3
#1, 0, -1

INVERSE: 
#0, -1, 3
#1/2, 2, -9/2,
#0, -1, 2

----------------------------------------
#1, 2, 3
#2, 0, -3
#0, 2, 5

INVERSE: 
#-3, 2, 3
#5, -5/2, -9/2
#-2, 1, 2

--------------------------
#2, 0, -3
#1, 2, 3
#0, 2, 5

INVERSE: 
#2, -3, 3
#-5/2, 5, -9/2
#1, -2, 2

--------------------------

 */