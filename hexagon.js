var Hexagon = function(startX, startY,thisColor) {
    var x = startX,
        y = startY,
        color=thisColor,
        onTheMove=false,
        onTarget=false,
        velocityY=0.0,
        id;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getOnTarget =function () {
        return onTarget;
    }

    var setOnTarget =function (t) {
        onTarget=t;
    }

    var setOnTheMove = function(newOnTheMove) {
        onTheMove = newOnTheMove;
    };

     var getVelocityY = function() {
       return velocityY;
    };

    var getOnTheMove =function () {
        return onTheMove;
    }
    
    var setColor = function(newColor) {
        color = newColor;
    };

    var getColor = function() {
        return color;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    var setVelocityY = function(newVeY) {
        velocityY = newVeY;
    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        setOnTheMove:setOnTheMove,
        setColor:setColor,
        getColor:getColor,
        getOnTheMove:getOnTheMove,
        getVelocityY: getVelocityY,
        setVelocityY: setVelocityY,
        getOnTarget:getOnTarget,
        setOnTarget:setOnTarget,
        id: id
    }
};

exports.Hexagon = Hexagon;