// =====================================
// A* Search Algorithm
// =====================================

class PriorityQueue {

    constructor() {
        this.items = [];
    }

    enqueue(node, priority) {

        this.items.push({ node, priority });

        this.items.sort((a, b) => a.priority - b.priority);

    }

    dequeue() {

        return this.items.shift();

    }

    isEmpty() {

        return this.items.length === 0;

    }

}

// Heuristic Function
// (Currently 0 because we don't have GPS coordinates yet)
// Later we'll use Latitude & Longitude.

const heuristic = (current, goal) => {

    return 0;

};

const astar = (graph, start, end) => {

    const openSet = new PriorityQueue();

    const gScore = {};
    const fScore = {};
    const previous = {};

    for (const node in graph) {

        gScore[node] = Infinity;
        fScore[node] = Infinity;
        previous[node] = null;

    }

    if (!graph[start] || !graph[end]) {

        return {
            path: [],
            distance: Infinity
        };

    }

    gScore[start] = 0;

    fScore[start] = heuristic(start, end);

    openSet.enqueue(start, fScore[start]);

    while (!openSet.isEmpty()) {

        const { node } = openSet.dequeue();

        if (Number(node) === Number(end))
            break;

        for (const neighbor of graph[node]) {

            const tentativeGScore =
                gScore[node] + neighbor.weight;

            if (tentativeGScore < gScore[neighbor.node]) {

                previous[neighbor.node] = node;

                gScore[neighbor.node] = tentativeGScore;

                fScore[neighbor.node] =
                    tentativeGScore +
                    heuristic(neighbor.node, end);

                openSet.enqueue(
                    neighbor.node,
                    fScore[neighbor.node]
                );

            }

        }

    }

    if (gScore[end] === Infinity) {

        return {
            path: [],
            distance: Infinity
        };

    }

    const path = [];

    let current = end;

    while (current !== null) {

        path.unshift(Number(current));

        current = previous[current];

    }

    return {

        path,

        distance: gScore[end]

    };

};

module.exports = astar;