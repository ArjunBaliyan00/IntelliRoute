// =====================================
// Breadth First Search (BFS)
// =====================================

const bfs = (graph, start, end) => {

    const visited = new Set();
    const queue = [];
    const parent = {};

    queue.push(start);
    visited.add(start);
    parent[start] = null;

    while (queue.length > 0) {

        const current = queue.shift();

        if (Number(current) === Number(end)) {
            break;
        }

        if (!graph[current]) continue;

        for (const neighbor of graph[current]) {

            if (!visited.has(neighbor.node)) {

                visited.add(neighbor.node);

                parent[neighbor.node] = current;

                queue.push(neighbor.node);

            }

        }

    }

    // Destination not reachable
    if (!visited.has(Number(end)) && !visited.has(String(end))) {
        return {
            path: [],
            reachable: false
        };
    }

    const path = [];

    let current = end;

    while (current !== null) {

        path.unshift(Number(current));

        current = parent[current];

    }

    return {
        reachable: true,
        path
    };

};

module.exports = bfs;