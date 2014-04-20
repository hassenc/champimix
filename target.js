var Target = function(startX, startY) {
    var x = startX,
        y = startY,
        idPlayer="",
        idHexagon=0,
        isCurrent=false,
        empty=true,
        id;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };


    var getIsCurrent =function (){
        return isCurrent;
    }   
    var setIsCurrent =function (current){
        isCurrent = current;
    } 
    
    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };


     var setEmpty = function(NewEmpty) {
        empty = NewEmpty;
    };

     var getEmpty = function() {
       return empty;
    };


    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        setEmpty:setEmpty,
        getEmpty:getEmpty,
        getIsCurrent:getIsCurrent,
        setIsCurrent:setIsCurrent,
        id: id
    }
};

exports.Target = Target;