
canvas=document.getElementById("screen");
ctx=canvas.getContext("2d");
canvas.height=innerHeight;
canvas.width=innerWidth;
	
var x=10;
var  y=10;
var Y=0;
var itt=0
const fps=60;
const player={
    x:0,
    y:10,
    dy:4,
    dir:1,
    height:100,
    width:20,
    score:0,
    draw:()=>{

        // ctx.clearRect(0,0,innerWidth,innerHeight)
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.fillRect(player.x,player.y,player.width,player.height);
        ctx.fill();
       // player.y+=player.dy*player.dir;
        if(player.y+player>=innerHeight){
            player.dir=player.dir*-1
        }
        if(player.y>0 &&player.y<10)
            player.dir=player.dir*-1
    }
 }
 const cpu={
    x:innerWidth-20,
    y:300,
    height:100,
    width:20,
    dy:0,
    dir:1,
    score:0,
    draw:()=>{

        // ctx.clearRect(0,0,innerWidth,innerHeight)
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.fillRect(cpu.x,cpu.y,cpu.width,cpu.height);
        ctx.fill();
        cpu.y+=cpu.dy*cpu.dir*2;
        if(cpu.y+cpu.height>=innerHeight){
            cpu.dir=cpu.dir*-1
        }
        if(cpu.y>0 &&cpu.y<(cpu.height/4))
            cpu.dir=cpu.dir*-1
        
    },
 }

 const ball={
    
    x:10,
    y:50,
    height:10,
    width:10,
    dy:5,dx:-9,xDirection:1,yDirection:1,
    draw:()=>{
        itt++;
        // ctx.clearRect(0,0,innerWidth,innerHeight)
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.fillRect(ball.x,ball.y,ball.width,ball.height);
        ctx.fill();
        ball.x+=ball.dx*ball.xDirection;
        ball.y+=ball.dy*ball.yDirection;
        if(ball.y+ball.height>=innerHeight){
            ball.yDirection=ball.yDirection*-1
            if(ball.xDirection>0)
                Y=next()+200;
            if (itt===8){
                
                console.log(`X2:${ball.x}`)
                console.log(`Y2:${ball.y}`)
            }
        }
        if(ball.y>0 &&ball.y<ball.height){
            ball.yDirection=ball.yDirection*-1
            if(ball.xDirection>0)
                Y=next()-200
            // cpu.dir*=-1;
            


            // console.log(`X:${ball.x}`)
            // console.log(`Y2:${ball.y}`)
        }
        if(ball.x+ball.width>=innerWidth){
            ball.xDirection=ball.xDirection*-1
            // console.log(`Actual ${ball.y}`)
            itt++;
            // console.log(itt);
            if(!testCollision("cpu"))
                player.score+=1;
            
            // console.log(`X2:${ball.x}`)
            // console.log(`Y2:${ball.y}`)
        }
        if(ball.x>0 &&ball.x<ball.width){
            
            ball.xDirection=ball.xDirection*-1
            // console.log(`X1:${ball.x}`)
            // console.log(`Y1:${ball.y}`)
            // console.log((innerWidth-100)/((1000/fps)*ball.dx))
            
            if(!testCollision("player")){
                cpu.score+=1;
                
                // ball.Direction*=-1;
            }
            Y=next()   
            // console.log(`Predicted ${Y} `)
            
            // console.log('---------------')
        }
        if(ball.x>innerHeight/5 && ball.y<innerHeight/1.2){
            // let test=(itt%=10)
            // console.log(test)
            if(itt%50===0){
                if(Math.random()*2>1){
                    ball.yDirection=ball.yDirection*-1
                }
                if(ball.xDirection<0){
                    Y=next()
                }
                console.log(cpu.y)
                // Math.random
                // ball.xDirection=ball.xDirection*-1
                // console.log(ball.xDirection)
                // console.log("Hi")
            }
            // else{
                
            //     ball.yDirection=ball.yDirection*-1
            // }


        }
        if(cpu.y<0)
            cpu.y=-cpu.y

    }       
}

const testCollision=(type)=>{

    if (type==="cpu"){
        let distance = Math.round(Math.sqrt(Math.pow(ball.x-(cpu.x+(cpu.width/2)),2)+Math.pow(ball.y-(cpu.y+(cpu.height/2)),2)))
        
       
        if(ball.height > distance){
            console.log(distance)
            ball.yDirection*=-1;
            return true
        }
        else 
            return false
    }
    else if(type==="player"){
        let distance =Math.round( Math.sqrt(Math.pow(ball.x-(player.x+(player.width/2)),2)+Math.pow(ball.y-(player.y+(player.height/2)),2)))
        // console.log(distance)
        if(distance<player.height/2){
            ball.yDirection*=-1;
            return true
        }
        else 
            return false
    }

}
const next=()=>{
    var yFinal,xtemp1,xtemp2;
    yFinal=0
    // console.log("Up")
    if(ball.yDirection<0){
        xtemp1=((-5-(-ball.y))/(-ball.dy/ball.dx))+ball.x
        //  console.log(`collision at :${xtemp1}`)
        if(xtemp1<innerWidth){
            // console.log(0)
            xtemp2=innerWidth-xtemp1
            yFinal=(-ball.dy/ball.dx)*(innerWidth-xtemp1)-35
        }
        else{
            // console.log(1);
            yFinal=(-ball.dy/ball.dx)*(xtemp1-ball.x)-ball.y
            // console.log(xtemp1)
        }
    }
    else{
        //Ball motion in negetive y axis
        // console.log("Down")
        xtemp1=(((-innerHeight+50-(-ball.y))/(-ball.dy/ball.dx))+ball.x+52)*-1
        // console.log(`collision at :${xtemp1}`)
        if(xtemp1<innerWidth){
            xtemp2=innerWidth-xtemp1
            yFinal=(-ball.dy/ball.dx)*(innerWidth-xtemp1)-innerHeight+40
            // console.log(1)
            // console.log(yFinal)
            // console.log("Hi");
        }
        else{
            yFinal=(-ball.dy/ball.dx)*(xtemp1-ball.x)-ball.y
            // console.log(0)
            // console.log(yFinal)
        }

    }
    return Math.abs(yFinal)
}

addEventListener('keydown',(e)=>{
    // console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            console.log("Up")
            player.y-=5*2;
            break;
        case "ArrowDown":
            player.y+=5*2;
            console.log("Down")
            break;
    }
}
    )
    var b=52;
const draw=()=>{
    ctx.clearRect(0,0,innerWidth,innerHeight)
    player.draw()
    cpu.draw()
    ball.draw()
    ctx.fillStyle="blue"
    ctx.beginPath()
    ctx.fillText("Player             Score            Cpu",innerWidth/5,100)
    ctx.fillText(`${player.score}                                           ${cpu.score}`,innerWidth/4.5,200)
    ctx.font="50px aria"
    ctx.fill()

    if(Y>0){

         if(Math.abs(cpu.y-Y)<20){
            cpu.dy=0
            // console.log("helllo")
        }
        else if(Math.abs(Y-cpu.y)>20){
            cpu.dy=12
            // console.log(Y)
            // console.log(cpu.y)
        }
        else if (Y-cpu.y<0){
            // console.log(cpu.y)
            cpu.dy=-12
        }
    }
    // console.log(Y-cpu.y<-2)
    requestAnimationFrame(draw,30)
    
    
}
    
    // setInterval(draw,fps);
    draw()