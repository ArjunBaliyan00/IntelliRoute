class PriorityQueue {

    constructor() {
        this.queue = [];
    }

    enqueue(node, priority) {
        this.queue.push({ node, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

}

const dijkstra = (graph, start, end) => {

    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    // Initialize
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    // Agar start ya end graph me hi nahi hai
    if (!graph[start] || !graph[end]) {
        return {
            path: [],
            distance: Infinity
        };
    }

    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {

        const { node } = pq.dequeue();

        if (Number(node) === Number(end))
            break;

        for (const neighbor of graph[node]) {

            const newDistance = distances[node] + neighbor.weight;

            if (newDistance < distances[neighbor.node]) {

                distances[neighbor.node] = newDistance;
                previous[neighbor.node] = node;

                pq.enqueue(neighbor.node, newDistance);

            }

        }

    }

    // Destination unreachable
    if (distances[end] === Infinity) {
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
        distance: distances[end]
    };

};

module.exports = dijkstra;