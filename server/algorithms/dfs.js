// =====================================
// Depth First Search (DFS)
// =====================================

const dfs = (graph, start, end) => {

    const visited = new Set();
    const path = [];

    function traverse(node) {

        visited.add(Number(node));
        path.push(Number(node));

        if (Number(node) === Number(end)) {
            return true;
        }

        if (!graph[node]) {
            path.pop();
            return false;
        }

        for (const neighbor of graph[node]) {

            if (!visited.has(Number(neighbor.node))) {

                if (traverse(neighbor.node)) {
                    return true;
                }

            }

        }

        path.pop();

        return false;

    }

    const found = traverse(start);

    return {
        reachable: found,
        path: found ? path : []
    };

};

module.exports = dfs;