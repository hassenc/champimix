/**************************************************
** GAME target CLASS
**************************************************/
var Target = function(idS,startX, startY,isEmpty,isCurrentState) {
    var x = startX,
        y = startY,
        idPlayer="",
        idHexagon=0,
        isCurrent=isCurrentState,
        empty=isEmpty,
        id = idS;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getIsCurrent =function (){
        return isCurrent;
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
    }

    var update = function(keys) {
        // Previous position
        // var b =false,
        //     prevX = x,
        //     prevY = y,
        //     prevOnTheMove =onTheMove;

        // var drag = (keys.drag);

        // if ((keys.dragging) && (parseInt(drag[0])===id)) {
        //         onTheMove=true;
        //         mover=drag[3];
        //         x=drag[1];
        //         y=drag[2];
        // }
        // else {
        //     onTheMove=false;
        //     mover="";
        // }

      
        // return (prevX != x || prevY != y || prevOnTheMove != onTheMove) ? true : false;
    };


    var draw = function() {
        var hexag;
        var draw = SVG('targets');
        draw.attr({class: "target", id:'h'+id})

        // var rect = draw.rect(100, 100).attr({x:x,y:y, fill: '#f06'})
        targetLine=[];
        n=6;
        angle=2*Math.PI/12;
        for (var i=0;i<n;i++){
            px=x+20*Math.cos(angle);
            py=y+20*Math.sin(angle);
            targetLine.push([px,py]);
            angle=angle+2*Math.PI/n
        }
        // console.log(targetLine);
        if (empty)
        {
            var polygon = draw.polygon('').fill('#122226').stroke({ width: 1 });
            polygon.plot(targetLine);
        }

        

    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id,
        setEmpty:setEmpty,
        getEmpty:getEmpty,
        getIsCurrent:getIsCurrent,
        update: update,
        draw: draw
    }
};
