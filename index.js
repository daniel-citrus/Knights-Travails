const Board = (size) => {
    let graph = createGraph(size);

    function resizeGraph(dimension) {
        if (dimension < 3) {
            console.error(`The dimensions must be greater than 3.`);
            return;
        }

        graph = createGraph(dimension);
    }

    /**
     *
     * @param {*} height
     * @returns Adjacency list for all possible moves; key: string, value: array containing possible moves from cell {x, y}
     */
    function createGraph(height) {
        const graph = new Map();

        for (let x = 0; x < height; x++) {
            for (let y = 0; y < height; y++) {
                graph.set(`${x},${y}`, getPossibleMoves(x, y, height));
            }
        }

        return graph;
    }

    function createNode(x, y) {
        return { x, y };
    }

    /**
     * Create an array for all possible knight moves given the starting coordinates. Moves are not included if they exceed boundaries.
     * @param {number} x
     * @param {number} y
     * @param {number} boundary - board upper-bound
     * @returns {array}
     */
    function getPossibleMoves(x, y, boundary) {
        const possibleMoves = [];
        const moves = [
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: -1 },
            { x: -1, y: 2 },
            { x: -2, y: 1 },
            { x: 1, y: -2 },
            { x: -2, y: -1 },
            { x: -1, y: -2 },
        ];

        for (let move of moves) {
            let newX = x + move.x;
            let newY = y + move.y;

            if (newX < 0 || newY < 0 || newX >= boundary || newY >= boundary) {
                continue;
            }

            possibleMoves.push(createNode(newX, newY));
        }

        return possibleMoves;
    }

    function knightMoves(start, end) {
        start = { x: start[0], y: start[1] };
        end = { x: end[0], y: end[1] };

        return backtrack(start, end, bfs(start));

        // Generate a shortest path list for each node relative to the starting node using Dijkstra's algorithm
        function bfs(start) {
            const queue = [{ x: start.x, y: start.y }];
            const distance = new Map();
            const parent = new Map();
            let node = start;
            distance.set(`${node.x},${node.y}`, 0); // distance of starting node is 0

            while (queue.length) {
                node = queue.shift();
                const nodeKey = `${node.x},${node.y}`;

                for (let move of graph.get(nodeKey)) {
                    const moveKey = `${move.x},${move.y}`;

                    if (!distance.has(moveKey)) {
                        parent.set(moveKey, node);
                        distance.set(moveKey, distance.get(nodeKey) + 1);
                        queue.push(move);
                    }
                }
            }

            return parent;
        }

        /**
         * Use shortestPaths adjacency list to find the shortest path from start to end. Uses end node to backtrack to the start node.
         * @param {node} end - {x, y}
         * @param {node} start
         * @param {map} shortestPaths
         */
        function backtrack(end, start, shortestPaths) {
            const path = [];
            let { x, y } = start;

            while (!(x === end.x && y === end.y)) {
                path.unshift([x, y]);
                let current = shortestPaths.get(`${x},${y}`);
                x = current.x;
                y = current.y;
            }

            path.unshift([x, y]);
            return path;
        }
    }

    return {
        graph,
        knightMoves,
        resizeGraph,
    };
};

const board = Board(8);
const moves = board.knightMoves([0, 0], [7, 7]);

console.log(`You made it in ${moves.length - 1} moves!`);
console.log(`Here's your path:`);

moves.forEach((move) => {
    console.log(move);
});
