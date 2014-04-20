/**************************************************
** GAME KEYBOARD CLASS
**************************************************/
var Keys = function(up, left, right, down,dragging,move,drag,select,selecting) {
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false,
		dragging = dragging || false,
		move= move || [0,0],
		select=select || [0,0];
		selecting=selecting || false;
		drag= drag || [0,0,0,""];
		
	var onKeyDown = function(e) {
		var that = this,
			c = e.keyCode;
		switch (c) {
			// Controls
			case 37: // Left
				that.left = true;
				break;
			case 38: // Up
				that.up = true;
				break;
			case 39: // Right
				that.right = true; // Will take priority over the left key
				break;
			case 40: // Down
				that.down = true;
				break;
		};
	};
	
	var onKeyUp = function(e) {
		var that = this,
			c = e.keyCode;
		switch (c) {
			case 37: // Left
				that.left = false;
				break;
			case 38: // Up
				that.up = false;
				break;
			case 39: // Right
				that.right = false;
				break;
			case 40: // Down
				that.down = false;
				break;
		};
	};

	// var onMouseDown = function() {
	// 	var that = this;
	// 	that.dragging = true;
	// }
	var onMouseUp = function() {
			var that = this;
			that.dragging = false;
			that.selecting =false;
		}

	var onMouseMove = function(coords) {
			var that = this;
			that.move = coords;
		}

	var onMouseDrag = function(x,y,id,pid){
			var that = this;
			that.dragging = true;
			that.drag = [id,x,y,pid];
	}

	var onSelectHex = function(id,pid){
		var that = this;
			that.selecting = true;
			that.select = [id,pid];
	}
	// function onDragDrop(dragHandler, dropHandler) {
 //        var drag = d3.behavior.drag();

	//     drag.on("drag", dragHandler)
	//     .on("dragend", dropHandler);
	//     return drag;
	// }

	 
	//  function dropHandler(d) {
	//        // alert('dropped');
	// }

	// function dragmove(d) {
	//         d3.select(this)
	//       .attr("x", d.x = d3.event.x)
	//       .attr("y", d.y = d3.event.y);
 //    }


	return {
		up: up,
		left: left,
		right: right,
		down: down,
		dragging:dragging,
		move:move,
		select:select,
		selecting:selecting,
		onMouseUp:onMouseUp,
		// onMouseDown:onMouseDown,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp,
		onSelectHex:onSelectHex,
		onMouseMove: onMouseMove,
		onMouseDrag:onMouseDrag
	};
};