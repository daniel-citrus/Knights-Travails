const Board = (() => {
    let graph = createGraph(5);

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
                graph.set(`${x},${y}`, knightMoves(x, y, height));
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
    function knightMoves(x, y, boundary) {
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

    function getShortestPath(start, end) {
        const queue = [start];
        const previous = new Map(); // remember parent for each cell

        while (queue.length) {
            // pop for current node
            const [x, y] = queue.pop();
            const key = `${x},${y}`;
            const possibleMoves = graph.get(key);

            //  if not visited add to queue and store parent
            for (let move of possibleMoves) {
                const moveKey = `${move.x},${move.y}`;

                if (previous.has(moveKey)) {
                    continue;
                }

                queue.push([move.x, move.y]);
                previous.set(moveKey, createNode(x, y)); // store parent

                if (previous.has(`${end[0]},${end[1]}`)) {
                    break;
                }
            }

            if (previous.has(`${end[0]},${end[1]}`)) {
                break;
            }
        }

        const result = backtrack(start, end, previous);
        console.log(...result);

        function backtrack(start, end, previous) {}

        /*  Array.from(previous.keys()).forEach((key) => {
            console.log(
                `key: ${key}; value: [${previous.get(key).x},${
                    previous.get(key).y
                }]`
            );
        }); */
    }

    return {
        graph,
        getShortestPath,
        resizeGraph,
    };
})();

Board.getShortestPath([3, 3], [4, 3]);
