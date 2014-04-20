/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 2,
		forceSaut=-8.0,
		screenWidth=750.0,
		sentimanHeight=60.0,
		sentimanWidth=49.0,
		velocityX = 5.0,
		velocityY = 0.0,
		gravity = 0.8,
		currentGround = 0.0,
		onGround = false;
	
	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		var q=5;
		var coordinates = (keys.move);
		x=coordinates[0];
		y=coordinates[1];
		


		return (prevX != x || prevY != y) ? true : false;
	};


	// Draw player
	var draw = function() {
		// console.log('draw in playerjs');
		

		sentiman=d3.select("#perso").append("use").attr("xlink:href","#character").attr("id","sentiman");
	    sentiman.style("transform","translate("+x+"px,"+y+"px)");
	    sentiman.style("-webkit-transform","translate("+x+"px,"+y+"px)");
	    sentiman.style("-moz-transform","translate("+x+"px,"+y+"px)");
	    sentiman.style("-ms-transform","translate("+x+"px,"+y+"px)");
	    sentiman.style("-o-transform","translate("+x+"px,"+y+"px)");

	    // decor=d3.select("#decor");
	    // decor.style("transform","translate("+(-startX)+"px,0)");
	    // decor.style("-webkit-transform","translate("+(-startX)+"px,0)");
	    // decor.style("-moz-transform","translate("+(-startX)+"px,0)");
	    // decor.style("-ms-transform","translate("+(-startX)+"px,0)");
	    // decor.style("-o-transform","translate("+(-startX)+"px,0)");

		// ctx.fillRect(x-5, y-5, 10, 10);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,
		draw: draw
	}
};