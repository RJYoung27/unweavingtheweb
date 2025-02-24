
function buildGraph() {
    function bfs(array, start, components, count) {
        components[start] = count;
        const queue = [start];
        while (queue.length > 0) {
            let v = queue.shift();
            for (let i=0; i<array.length; i++) {
                if (array[v][i] == 1) {
                    if (components[i] == 0) {
                        components[i] = count;
                        queue.push(i);
                    }
                }
            }
        }
        return components;
    }
    const numV = Math.floor(Math.random()*4+5);
    const numE = Math.floor(Math.random()*(numV/2)+(numV/2));
    const array = Array(numV);
    for (let v=0; v<numV; v++) {
        array[v] = Array(numV).fill(0);
    }

    for (let e=0; e<numE; e++) {
        let i = Math.floor(Math.random()*numV);
        let j = Math.floor(Math.random()*numV);
        if (j>=i) {j = (j+1) % numV;}
        while (array[i][j] == 1) {
            i = Math.floor(Math.random()*numV);
            j = Math.floor(Math.random()*numV);
            if (j>=i) {j = (j+1) % numV;}
        }
        array[i][j] = 1;
        array[j][i] = 1;
    }
    //count components
    const components = Array(numV).fill(0);
    let count = 0;
    for (let i=0; i<numV; i++) {
        if (components[i] == 0) {
            count++;
            bfs(array, i, components, count);
        }
    }

    return [array, numV, numE, count];
}

function set30() {
    const numV = Math.floor(Math.random()*4+5);
    const degSeq = Array(numV).fill(0);
    const numE = Math.floor((Math.random()*(numV-1)*(numV-1)/2+numV)/2);
    for (let e=0; e<numE; e++) {
        let i = Math.floor(Math.random()*numV);
        let j = Math.floor(Math.random()*numV);
        if (j>=i) {j = (j+1) % numV;}
        degSeq[i]++;
        degSeq[j]++;
    }
    degSeq.sort();
    const seq = degSeq.join();
    const text = `A graph has a degree sequence of $(${seq})$. How many edges \
    does it have?`;

    return [text, numE];
}

function set31() {
    const graphInfo = buildGraph();
    const array = graphInfo[0];
    const v = graphInfo[1];
    const e = graphInfo[2];
    const comp = graphInfo[3];

    for (let i=0; i<array.length; i++) {
        array[i] = array[i].join(' & ');
    }
    const graphRep = array.join(' \\\\ ');

    const text = `The graph $G$ has the adjacency matrix: $@ M = \
        \\begin{pmatrix} \
        ${graphRep}
        \\end{pmatrix}$ \
        How many vertices, edges, and components does $G$ have? \
        \nWrite your answer as $(v,e,c)$.`;

    const ans = `(${v}, ${e}, ${comp})`
    return [text, ans];
}

export const graphSet = [set30, set31];