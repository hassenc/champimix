/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	hexags,			// Hexags
	currentTargetId,
	socket;			// Socket connection


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	
	// Declare the canvas and rendering context
	// canvas = document.getElementById("gameCanvas");
	// ctx = canvas.getContext("2d");

	// // Maximise the canvas
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen

	// var startX = Math.round(Math.random()*(canvas.width-5)),
	// 	startY = Math.round(Math.random()*(canvas.height-5));

	var startX = -45.0;
		startY = 0.0;

	hexags=[];
	targets=[];



	// Initialise the local player
	localPlayer = new Player(startX, startY);
	

	// Initialise socket connection
	socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});



	// Initialise remote players array
	remotePlayers = [];

	// Start listening for events
	setEventHandlers();

	d3.select('#Layer_1').on('mousemove', function()
		    {	var coordinates = [0,0]; 
		    	if (localPlayer) {
		    		coordinates = d3.mouse(this);
					keys.onMouseMove(coordinates);
				};
		    }
		    );



	
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);

	socket.on("your id", onYourId);

	socket.on("add hexag", onAddHexag);

	socket.on("fall hexag", onFallHexag);

	socket.on("move hexag", onMoveHexag);

	socket.on("add target", onAddTarget);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};



// window.addEventListener("mousedown",  function() {
// 													if (localPlayer) {
// 														keys.onMouseDown();
// 													};
// 												}

// 						, false);

window.addEventListener("mouseup",  function() {
													if (localPlayer) {
														keys.onMouseUp();
													};
												}

						, false);


// Browser window resize
function onResize(e) {
	// Maximise the canvas
	console.log('resize fail');
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;
};

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

	// Send local player data to the game server
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});
};

function onYourId(data) {

	localPlayer.id=data.id;
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);
	// Initialise the new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = data.id;

	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
};

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
};

function onMoveHexag(data) {
	// console.log("one hexag was moved");
	console.log("moved"+data.id);
	var moveHexag = hexagById(data.id);

	// hexag not found
	if (!moveHexag) {
		console.log("hexag not found: "+data.id);
		return;
	};

	// Update hexag position
	moveHexag.setX(data.x);
	moveHexag.setY(data.y);

};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

function onAddHexag(data) {
	var newHexagon = new Hexagon(data.id,data.x, data.y,data.color);
	hexags.push(newHexagon);


	for (var j = 0; j < hexags.length; j++) {
		hexags[j].draw();
	};

};

function onFallHexag(data) {
	var fallHexag = hexagById(data.id);

	// Player not found
	if (!fallHexag) {
		console.log("Hexag not found: "+data.id);
		return;
	};

	// Update player position
	fallHexag.setX(data.x);
	fallHexag.setY(data.y);
};


function onAddTarget(data) {
	var newTarget = new Target(data.id,data.x, data.y,data.empty,data.isCurrent);
	targets.push(newTarget);
	
	if (newTarget.getIsCurrent()){

		currentTargetId=newTarget.id;
	}
	d3.select("#targets").selectAll("svg").remove();
	for (var j = 0; j < targets.length; j++) {
		
		// if (!newTarget.getEmpty() || newTarget.getIsCurrent() ){

		targets[j].draw();

		// }
	};

};

/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// console.log("i moved");
		// Send local player data to the game server
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
	};

	// console.log(hexags.length);
	for (var j = 0; j < hexags.length; j++) {
		// console.log(hexags[j].id);
		if (hexags[j].update(keys)) {
			socket.emit("move hexag", {id:hexags[j].id ,x: hexags[j].getX(),
											 y: hexags[j].getY(),
											 onTheMove: hexags[j].getOnTheMove(),
											 onTarget: hexags[j].getOnTarget()

											});
		};
	};
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	// ctx.clearRect(0, 0, canvas.width, canvas.height);

	// console.log('draw in gamejs');
	d3.select("#perso").selectAll("use").remove();
	d3.select("#decor").selectAll("svg").remove();
	// d3.select("#targets").selectAll("svg").remove();

	// Draw the local player
	// localPlayer.draw();

	// Draw the remote players

	for (var i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw();
	};

	for (var j = 0; j < hexags.length; j++) {
		// console.log(hexags[j].getOnTheMove());
		// if (!(hexags[j].getOnTheMove())){
			hexags[j].draw();
		// }
		
	};

	// if (typeof currentTargetId !== 'undefined')
	// {
	// 	targets[currentTargetId].draw()
	// }

	
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

function hexagById(id) {
	var i;
	for (i = 0; i < hexags.length; i++) {
		if (hexags[i].id == id)
			return hexags[i];
	};
	
	return false;
};

function getClosestTargetId(targets,x,y){
	indexMin=0;
	minDist= 999999;
	for (var i = 0; i < targets.length; i++) {

		if (targets[i].getEmpty())   {
			d= (targets[i].getX()-x)*(targets[i].getX()-x) + (targets[i].getY()-y)*(targets[i].getY()-y);
			if (d<minDist){
				minDist=d;
				indexMin=i;
			}
		}

	};

	return indexMin;
}