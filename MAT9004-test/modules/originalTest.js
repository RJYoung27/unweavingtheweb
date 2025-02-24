let q1 = "Evaluate $\\displaystyle\\sum_{j=3}^{7}j$";

let q2 = "Evaluate $\\displaystyle\\prod_{j=2}^{4}j^2$";

let q3 = "Choose which of the following words describes the function $f(x)=2|x|+2$. \
    \nOptions: 'concave', 'convex', 'both', or 'neither'. Type the chosen word in the input field.";

let q4 = "Find the equation of the line through the points $(8,5)$ and $(6,-7)$. \
    The equation of the line should be of the form $y=mx+b$.\nWrite the answer as $(m,b)$.";

let q5 = "Suppose $f(x)=bx^a$, and that a log-log plot (with logarithms taken base 3) \
    of this function shows a straight line with slope $-2$ and y-intercept $3$. What is \
    $a$ and $b$? \nWrite the answer as $(a,b)$.";

let q6 = "Consider the function $f:[0,\\infty) \\rightarrow$ \u211D where \
    $f(x)=x^2+2x$. What is the value of $f^{-1}(24)$?";

let q7 = "If $f(x)=2(7x+4)^{\\frac{3}{2}}$, find $f'(0)$.";

let q8 = "If $f(x)=(2x^2-3)e^{3x}$, find the slope of the tangent line to the \
        graph of $f$ at $x=0$.";

let q9 = "Find the maximum value of the product $xy$, under the constraint that $2x + 3y$.";

let q10 = "For the function $h(x)=e^{2x^2+3x-5}$, find x at which h has a stationary value.";

let q11 = "Evaluate $\\int_{-2}^{4}(6x^2+6x-4)\\,dx$"; 

let q12 = "Find the stationary point of the function $f(x, y)= x-\\ln(x^2 + y^2)$, \
        with domain $(x, y) \\neq (0, 0)$. Express the point in the form $(a, b)$.";

let q13 = "For the function $g(x, y)=2xy(x^2+y)$, find the gradient vector \
        $\\nablag$ at the point $(2, 1)$. Express the vector in the form \
        $(a, b)$.";

let q14 = "If the gradient of the function $f$ satisfies: \
        $@ \\nabla f(x,y)= \\begin{pmatrix} 3x^2y^2 + 3x^2y \\\\ 2x^3y-2y+x^3 \\end{pmatrix} $\
        find the determinant of $H(1,-1)$, where $H$ refers \
        to the Hessian matrix.";

let q15 = "What is the residual sum of squares (RSS) when approximating $(2,5)$, \
        $(3,4)$, $(5,6)$ by $f(x)=2x+1$?";

let q16 = "Let $A = \\begin{pmatrix} 2 & 3 \\\\ 4 & x \\end{pmatrix}$. \
    For which $x \\in$ \u211D is $A$ not invertible?";

let q17 = "Let $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 0 & -3 \\\\ 1 & 0 & -1 \\end{pmatrix}$. \
    Then $A^{-1} = \\begin{pmatrix} 0 & -1 & x \\\\ \\frac{1}{2} & 2 & -\\frac{9}{2} \\\\ 0 & -1 & 2 \\end{pmatrix}$. \
    Find $x$.";

let q18 = "Let $A = \\begin{pmatrix} -2 & -4 & 2 \\\\ -2 & 1 & 2 \\\\ 4 & 2 & 5 \\end{pmatrix}$. \
    One of the eigenvalues of $A$ is $6$; if the corresponding eigenvector \
    is of the form $(1, y, z)$, find $y$ and $z$. \nYour answer should be \
    in the form $(y, z)$.";

let q19 = "Let $a = \\begin{pmatrix} 3 \\\\ 1 \\\\ 2 \\end{pmatrix}$ and \
    $a = \\begin{pmatrix} x \\\\ 2 \\\\ 5 \\end{pmatrix}$. Suppose that \
    $a$ and $b$ are orthogonal. What is $x$?";

let q20 = "Find the length of the vector $(4, 3, -12)$.";

let q21 = "Solve the following system of linear equations using Gaussian elimination: \
    $@ \\begin{pmatrix} 1 & -1 & 1 \\\\ 2 & 3 & -1 \\\\ 3 & -2 & -9 \\end{pmatrix} \
    \\begin{pmatrix} x \\\\ y \\\\ x \\end{pmatrix} = \
    \\begin{pmatrix} 8 \\\\ -2 \\\\ 9 \\end{pmatrix}$ \nYour answer should be \
    in the form $(x, y, z)$.";

let q22 = "How many $3$ digit numbers are there which contain only even digits \
    and in which no digits are repeated? (note: such a number cannot start \
    with a $0$, however any of the other digits may be zero, since $0$ is \
    considered to be even)"; 

let q23 = "A committee of $7$ must be formed out of a group of $10$ people. How \
    many different ways are there to form this committee?";

let q24 = "There are $32$ letters in the Russian alphabet. Suppose we form \
    a password $9$ letters long using only lower case letters from the Russian \
    alphabet. There are exactly $2n$ such passwords. Find $n$.";

let q25 = "At a bakery there are $4$ different types of loaves of bread. \
    How many different purchases of $8$ loaves can one make?";

let q26 = "Random variable $X$ is defined to be the value when a fair \
    six-sided die is rolled, and $Y$ is to be the value when a fair \
    ten-sided die is rolled. Find the expectation $E[2X + 4Y ]$."

let q27 = "A game is played in which a fair coin is tossed three times. \
    If $2$ or more heads are thrown the player wins $24$ dollars, if one \
    head occurs the player wins $8$ dollars and if no heads occur the player \
    loses $16$ dollars. What is the expected value of their winnings, in \
    dollars? \nNote: just put the number, do not put a dollar sign."

let q28 = "Suppose a continuous random variable $X$ has a probability density \
    function $h(x)$ defined by $h(x) = kx^2(1-x)$ for $0 < x < 1$, and \
    $h(x) = 0$ for $x$ outside this interval. Find $k$."

let q31 = "Suppose a random variable $X$ admits the pdf $h(x)=\\frac{3}{8}x^2$ \
    for $0 < x < 2$ and $0$ elsewhere. Find $E[X]$ and $Var(X)$. \
    \nReduce all fractions, and leave numbers as improper fractions rather \
    than mixed numbers or decimals. Write your answer as $(E[X], Var(X))$."

let q29 = "A graph has a degree sequence of $(1,2,2,2,3,3,3)$. How many edges \
    does it have?"; 

let q30 = "The graph $G$ has the adjacency matrix: $@ M = \
    \\begin{pmatrix} \
    0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\\\ \
    0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\\\ \
    0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\\\ \
    0 & 0 & 1 & 0 & 0 & 1 & 0 & 1 & 0 \\\\ \
    0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\\\ \
    0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\\\ \
    1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\\\ \
    0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\\\ \
    0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0  \
    \\end{pmatrix}$ \
    How many vertices, edges, and components does $G$ have? \
    \nWrite your answer as $(v,e,c)$.";

