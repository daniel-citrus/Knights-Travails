const Board = (() => {
    let graph = createGraph(3);

    function resizeGraph(dimension) {
        if (dimension < 3) {
            console.error(`The dimensions must be greater than 3.`);
            return;
        }

        graph = createGraph(dimension);
    }

    function createGraph(height) {
        const graph = new Map();

        for (let x = 0; x < height; x++) {
            for (let y = 0; y < height; y++) {
                graph.set(`${[x, y]}`, knightMoves(x, y, height));
            }
        }

        const keys = Array.from(graph.keys());

        for (let key of keys) {
            let content = '';
            let contents = graph.get(key);

            if (!contents.length) {
                content = '[blank]';
            } else {
                contents.forEach((item) => {
                    content += `[${item[0]},${item[1]}] `;
                });
            }

            console.log(`[${key}]: ${content}`);
        }
        return graph;
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

            possibleMoves.push([newX, newY]);
        }

        return possibleMoves;
    }

    function getShortestPath(start, end) {
        const startX = start[0];
        const startY = start[1];
        const endX = end[0];
        const endY = end[1];

        console.log(`------------------------------`);
        console.log(`Start: [${start}], End: [${end}]`);
        // set to remember visited cells
        // DFS

        helper(startX, startY);

        function helper(x, y, visited = new Set(`${[2, 0]}`)) {
            visited.add(`${[x, y]}`);
            console.log(visited);

            if (x === endX && y === endY) {
                return { count: 0, coord: [x, y] };
            }

            const possibleMoves = graph.get(`${[x, y]}`);

            for (let move of possibleMoves) {
                console.log(move);
                if (!visited.has(move)) {
                    console.log('nope');
                }
            }
        }
    }

    return {
        graph,
        getShortestPath,
        resizeGraph,
    };
})();

Board.getShortestPath([1, 2], [2, 0]);
