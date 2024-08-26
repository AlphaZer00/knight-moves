// Function knightMoves shows the shortest possible way to get from one square to another on a chess board by outputting all squares the knight will stop on along the way.

//Square factory
const Square = (x, y, n) => {
	let path;

	const getPath = () => {
		return path;
	};
	const setPreviousPath = (prev) => {
		path ||= prev;
	};
	return { x, y, n, getPath, setPreviousPath };
};

//Check if position is inside chess board
function isInBounds(x, y) {
	if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
		return true;
	}
	return false;
}

function knightMoves(startPos, targetPos) {
	//All moves
	let dx = [-2, -1, 1, 2, -2, -1, 1, 2];
	let dy = [-1, -2, -2, -1, 1, 2, 2, 1];
	//Queue for BFS
	let q = [];
	//Array containing path that knight takes
	let pathArr = [];
	// Variables for storing moves
	let x, y;

	//Create array to mark visited squares
	let visit = new Array(8);
	//Set all squares to unvisited
	for (let i = 0; i < 8; i++) {
		visit[i] = new Array(8);
		for (let j = 0; j < 8; j++) {
			visit[i][j] = false;
		}
	}

	//Push starting position to front of queue
	q.push(Square(startPos[0], startPos[1], 0));

	//Set starting position as visited
	visit[startPos[0]][startPos[1]] = true;

	//While there is at least one element in the queue
	while (q[0]) {
		//Current is first element in queue AND remove first
		let current = q.shift();

		//EXIT CASE: If current square is target square
		if (current.x == targetPos[0] && current.y == targetPos[1]) {
			//Push target square to pathArr
			pathArr.push(current);

			//Loop through previous squares from target and push to pathArr
			while (pathArr[pathArr.length - 1].getPath()) {
				const next = pathArr.at(-1).getPath();
				pathArr.push(next);
			}

			//Reverse pathArr so that squares are in order from start -> target
			pathArr.reverse();
			//Map elements to [x,y] instead of entire square object
			pathArr = pathArr.map((el) => {
				return [el.x, el.y];
			});
			console.log("Number of moves", current.n);
			return pathArr;
		}

		//IF CURRENT SQUARE !== TARGET SQUARE

		//Loop through possible moves
		for (let i = 0; i < 8; i++) {
			x = current.x + dx[i];
			y = current.y + dy[i];

			//If move is within the bounds of the chess board and has not been visited
			if (isInBounds(x, y) && !visit[x][y]) {
				//Create object from move
				const thisSquare = Square(x, y, current.n + 1);
				//Set previous path as current square
				thisSquare.setPreviousPath(current);
				//Add to queue
				q.push(thisSquare);
				//Mark as visited
				visit[x][y] = true;
			}
		}
	}
}

//Driver Code
console.log(knightMoves([0, 0], [0, 4]));
