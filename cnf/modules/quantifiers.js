
class Quantifier {
    constructor(setSize, clauseSize, x, alphabet, literalsNegated, literal) {
        this.setSize = setSize;
        this.clauseSize = clauseSize;
        this.x = x;
        this.alphabet = alphabet;
        this.literalsNegated = literalsNegated;
        this.literal = literal;
        this.expression = Quantifier.buildExpression(setSize, x, literalsNegated);
        this.currentRowCount = 0;
        this.currentRowSetting = new Array(setSize);
        this.currentClauseSetting = new Array(this.expression.length);
        this.truthtable = null;
        this.truthtableRow = -1;
        console.log(this.expression);
    }

    makeLiteral(litID) {
        let lit = document.createElement('span');
        lit.setAttribute("class", "lit");
        lit.setAttribute("class", `lit_${litID}`);
        lit.innerText = ` ${this.literal}${this.alphabet[litID]} `;
        return lit;
    }

    buildShownClause(clauseNum) {

        let clause = document.createElement('span');
        clause.setAttribute("class", "clause");
        clause.setAttribute("id", `clause_${clauseNum}`);
        clause.append(document.createTextNode("("));
        clause.append(this.makeLiteral(this.expression[clauseNum][0]));
        for (let i=1; i<this.clauseSize; i++) {
            clause.append(document.createTextNode("OR"));
            clause.append(this.makeLiteral(this.expression[clauseNum][i]));
        }
        clause.append(document.createTextNode(")"));
        return clause;
    }

    buildShownExpression() {
        let e = document.createElement('p');
        e.appendChild(this.buildShownClause(0));
        for (let i=1; i<this.expression.length; i++) {
            e.append(document.createTextNode(" AND "));
            e.appendChild(this.buildShownClause(i));
        }
        return e;
    }

    calcCurrentRowCount() {
        return this.currentRowCount;
    }

    static buildExpression(setSize, x, literalsNegated) {
        // Q: can I access instance fields or must I pass values? 
        function build_clauses(n, excluded, sub_exp) {
            if (n==1) {
                //sub_exp.append( [v for v in var_i if v not in excluded] )
                let temp = [];
                for (let i=0; i<setSize; i++) {
                    if (!(excluded.includes(i))){
                        temp.push(i);
                    }
                }
                sub_exp.push(temp);
            } else {
                    var x = excluded[excluded.length-1];
                    for (let i=(x+1); i < setSize; i++) { 
                        build_clauses(n-1, excluded.concat([i]), sub_exp)
                } 
            }
        }

        let expression = []
        let myx = x;
        if (literalsNegated) {myx = setSize - x}
        build_clauses(myx, [-1], expression);
        expression.reverse();
        return expression;  
    }
}


export class AtMost extends Quantifier {
    constructor(setSize, x, alphabet) {
        super(setSize, x+1, x, alphabet, true, "~");
        this.display = "at most";
    }

    //static???
    helpText() {
        //pass
    }

    truthTable() {
        //pass
    }

}


export class AtLeast extends Quantifier {
    constructor(setSize, x, alphabet) {
        super(setSize, setSize-x, x+1, alphabet, false, "");
        this.display = "at least";
        //TODO: this.x is is so badly done!!! have to pass setSize-x because x+1 happens AFTER calling super 
    }

    helpText() {
        //pass
    }

    truthTable() {
        //pass
    }

}
