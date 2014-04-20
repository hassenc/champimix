/**************************************************
** GAME Hexagon CLASS
**************************************************/
var Hexagon = function(idS,startX, startY,thisColor) {
    var x = startX,
        y = startY,
        color=thisColor,
        onTheMove=false,
        mover="",
        onTarget=false,
        targetId=-1,
        id = idS;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var getOnTheMove =function () {
        return onTheMove;
    }

    var getOnTarget =function () {
        return onTarget;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setColor = function(newColor) {
        color = newColor;
    };

    var getColor = function() {
        return color;
    };

    var setY = function(newY) {
        y = newY;
    };

    var setOnTheMove = function(newOnTheMove) {
        x = newOnTheMove;
    };

    var update = function(keys) {
        // Previous position
        var b =false,
            prevX = x,
            prevY = y,
            prevOnTheMove =onTheMove;
            prevOnTarget =onTarget;

        var drag = (keys.drag);
        if (typeof currentTargetId !== 'undefined'){
                tx=targets[currentTargetId].getX();
                ty=targets[currentTargetId].getY();
        }
        if ((keys.dragging) && (parseInt(drag[0])===id)) {

                currentTargetId=getClosestTargetId(targets,drag[1],drag[2]);

                if (onTarget) {
                    onTarget=false;
                    targets[targetId].setEmpty(true);
                    targetId=-1;


                    // for (var i=0;i<targets.length;i++){
                    //     if (targets[i].getEmpty()){
                    //         currentTargetId=targets[i].id;
                    //         break;
                    //     }
                    // }
                    
                }
                onTheMove=true;
                mover=drag[3];
                if ((Math.abs(tx-drag[1])<10) && (Math.abs(ty-drag[2])<10)){
                    x=tx
                    y=ty
                }
                else{
                    x=drag[1];
                    y=drag[2];   
                }

                
                

        }
        else {
            if ((x===tx)&&(y===ty)){
                onTarget=true;
                targetId=currentTargetId ;
                targets[currentTargetId].setEmpty(false);
                // for (var i=0;i<targets.length;i++){
                //         if (targets[i].getEmpty()){
                //             currentTargetId=targets[i].id;
                //             break;
                //         }
                // }
            }
            else{
            onTheMove=false;
            // onTarget=false;
            mover="";
            }
        }

      
        return (prevX != x || prevY != y 
                    || prevOnTheMove != onTheMove
                    || prevOnTarget != onTarget) ? true : false;
    };


    var draw = function() {
        var hexag;
        var draw = SVG('decor');
        draw.attr({class: "hex falling", id:'h'+id})

        // var rect = draw.rect(100, 100).attr({x:x,y:y, fill: '#f06'})
        hexagonLine=[];
        n=6;
        angle=2*Math.PI/12;
        for (var i=0;i<n;i++){
            px=x+20*Math.cos(angle);
            py=y+20*Math.sin(angle);
            hexagonLine.push([px,py]);
            angle=angle+2*Math.PI/n
        }
        // console.log(hexagonLine);
        var polygon = draw.polygon('').fill(color).stroke({ width: 1 });
        polygon.plot(hexagonLine);

        var drag = d3.behavior.drag()
        .on('drag', function () {
            var coordinates = (keys.move);
            cor_x=coordinates[0];
            cor_y=coordinates[1];
            cor_id=d3.select(this).attr("id").substring(1);
            keys.onMouseDrag(cor_x,cor_y,cor_id,localPlayer.id);

        });
        d3.select("#decor").selectAll("svg").call(drag);

    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id,
        getColor:getColor,
        setColor:setColor,
        setOnTheMove:setOnTheMove,
        getOnTheMove:getOnTheMove,
        getOnTarget:getOnTarget,
        update: update,
        draw: draw
    }
};
