
function buildTruthTableRow(q) {
    function clauseContainsTrueLiteral(q, literal) {
        let clause = literal.parentElement;
        let clauseID = parseInt(clause.id.split("_")[1]);
        let expClause = q.expression[clauseID];

        // at least
        if (!q.literalsNegated) {
            for (let v of expClause) {
                if (q.currentRowSetting[v]) {return true};
        }}
        // at most
        else {
            for (let v of expClause) {
                if (!q.currentRowSetting[v]) {return true};
        }}
        return false; 
    }

    function updateTruthTable(cellID, q) {   
        let cell = document.getElementById(`cell_${cellID}`);
        //todo: narrow search
        let literals = document.getElementsByClassName(`lit_${cellID}`);

        // if currently None or False
        if (!q.currentRowSetting[cellID]) {
            q.currentRowSetting[cellID] = true;
            q.currentRowCount++;

            cell.style.backgroundColor = "lightGreen";
            cell.textContent = "T";

            for (let literal of literals) {
                if (q.literalsNegated) {
                    literal.style.color = "red";
                    if (!clauseContainsTrueLiteral(q, literal)) {
                        literal.parentElement.style.backgroundColor = "lightCoral";
                    }
                }
                else {
                    literal.style.color = "green";
                    literal.style.fontweight = "bold";
                    literal.parentElement.style.backgroundColor = "lightGreen";
                }
            }
        } else {
            q.currentRowSetting[cellID] = false;
            q.currentRowCount--;

            cell.style.backgroundColor = "lightCoral";
            cell.textContent = "F";


            for (let literal of literals) {
                if (q.literalsNegated) {
                    literal.style.color = "green";
                    literal.style.fontweight = "bold";
                    literal.parentElement.style.backgroundColor = "lightGreen";
                }
                else {
                    literal.style.color = "red";
                    if (!clauseContainsTrueLiteral(q, literal)) {
                        literal.parentElement.style.backgroundColor = "lightCoral";
                    }
                }
            }
        }

        // update Expression cell 
        let expCell = document.getElementById("cell_exp");

        if ((q.currentRowCount>=q.x && !q.literalsNegated) || (q.currentRowCount<=q.x && q.literalsNegated)) {
            expCell.style.backgroundColor = "lightGreen";
            expCell.textContent = "T";
        } else {
            expCell.style.backgroundColor = "lightCoral";
            expCell.textContent = "F";
            }
        }
    
    if (q.truthtableRow > -1) {
        const delrowbutton = q.truthtable.getElementById("rowbutton");
        delrowbutton.remove();


        let cells = q.truthtable.getElementsByClassName(`row_${q.truthtableRow}`);
        for (let i=0; i<cells.length; i++) {
            cells[i].removeEventListener("click", () => updateTruthTable(q.truthtableRow, i, q));
        }
    }
    
    q.truthtableRow++; 
    q.currentRowCount = 0;
    q.currentRowSetting = new Array(q.setSize);
    q.currentClauseSetting = new Array(q.expression.length);

    let tr2 = document.createElement("tr");
    for (let i=0; i<q.setSize; i++) {
        let cell = document.createElement("td");
        cell.setAttribute("id", `cell_${i}`);
        cell.setAttribute("class", `row_${q.truthtableRow}`);
        cell.addEventListener("click", () => updateTruthTable(q.truthtableRow, i, q));

        cell.textContent = "";

        tr2.appendChild(cell);
    }
    let expression_cell = document.createElement("td");
    expression_cell.setAttribute("id", `cell_exp`);
    tr2.appendChild(expression_cell);

    let button_cell = document.createElement("td");
    let rowbutton = document.createElement("button");
    rowbutton.setAttribute("id", "rowbutton");
    rowbutton.textContent = "New row";
    rowbutton.addEventListener("click", () => buildTruthTableRow(q));
    button_cell.appendChild(rowbutton);

    return tr2;
}

export function buildTruthTable(q) {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tr1 = document.createElement("tr");
    for (let i=0; i<q.setSize; i++) {
        let cell = document.createElement("th");
        cell.textContent = q.alphabet[i];
        tr1.appendChild(cell);
    }
    let expression_cell = document.createElement("th");
    expression_cell.textContent = "Expression";
    tr1.appendChild(expression_cell);

    let new_row_cell = document.createElement("th");
    new_row_cell.textContent = "";
    tr1.appendChild(new_row_cell);

    thead.appendChild(tr1);
    table.appendChild(thead);
    
    let tbody = document.createElement("tbody");
    tbody.appendChild(buildTruthTableRow(q));

    table.appendChild(tbody);
    q.truthtable = tbody;
    return table;
}
