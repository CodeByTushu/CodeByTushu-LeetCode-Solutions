/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function(n, edges) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Array(n).fill(false);
    let complete = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;

        const queue = [i];
        const component = [];
        visited[i] = true;

        while (queue.length > 0) {
            const node = queue.shift();
            component.push(node);

            for (const next of graph[node]) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push(next);
                }
            }
        }

        const size = component.length;
        let ok = true;

        for (const node of component) {
            if (graph[node].length !== size - 1) {
                ok = false;
                break;
            }
        }

        if (ok) complete++;
    }

    return complete;
};
