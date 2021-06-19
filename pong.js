
const cvs=document.getElementById("pong");
const cts=cvs.getContext("2d");
// Draw functions
function drawRect(x,y,w,h,color){
  cts.fillStyle=color;
  cts.fillRect(x,y,w,h);
}
drawRect(0,0,cvs.width,cvs.height,"Black");
function drawCircle(x,y,r,color){
  cts.fillStyle=color;
  cts.beginPath();
  cts.arc(x,y,r,0,Math.PI*2,false);
  cts.closePath();
  cts.fill();
}
function drawText(text,x,y,color){
  cts.fillStyle=color;
  cts.font="75px fantasy";
  cts.fillText(text,x,y);
}
// Create User and computer paddles
const user={
           x:0,
           y:cvs.height/2-100/2,
           width:10,
           height:100,
           color:"White",
           score:0
}
const comp={
           x:cvs.width-10,
           y:cvs.height/2-100/2,
           width:10,
           height:100,
           color:"White",
           score:0
}
// Create a Ball
const ball={
         x:cvs.width/2,
         y:cvs.height/2,
         radius:10,
         speed:5,
         velocityX:5,
         velocityY:5,
         color:"White"
}
// Create and Draw Net
const net={
        x:cvs.width/2-1,
        y:0,
        width:2,
        height:10,
        color:"White"
}
function drawNet(){
    for(let i=0;i<=cvs.height;i+=15){
      drawRect(net.x,net.y+i,net.width,net.height,net.color);
    }
}
// function collision
function collision(b,p){
  p.top=p.y;
  p.bottom=p.y+p.height;
  p.left=p.x;
  p.right=p.x+p.width;
  b.top=b.y-b.radius;
  b.bottom=b.y+b.radius;
  b.left=b.x-b.radius;
  b.right=b.x+b.radius;
  return b.right>p.left && b.top<p.bottom && b.left<p.right && b.bottom>p.top;
}
// controling the user and computer paddles
cvs.addEventListener("mousemove",movePaddle);
function movePaddle(evt){
  let rect=cvs.getBoundingClientRect();
  user.y=evt.clientY-rect.top-user.height/2;
}

// render the functions
function render(){
  drawRect(0,0,cvs.width,cvs.height,color="Green");
  drawRect(user.x,user.y,user.width,user.height,user.color);
  drawRect(comp.x,comp.y,comp.width,comp.height,comp.color);
  drawNet();
  drawText(user.score,cvs.width/4,cvs.height/5,"White");
  drawText(comp.score,3*cvs.width/4,cvs.height/5,"White");
  drawCircle(ball.x,ball.y,ball.radius,"White");
}
function update(){
  ball.x+=ball.velocityX;
  ball.y+=ball.velocityY;

  comp.y+=(ball.y-(comp.y+(comp.height/2)))*0.1;
  if((ball.y+ball.radius>cvs.height)||(ball.y-ball.radius<0)){
    ball.velocityY=-ball.velocityY;
  }
  let player=(ball.x<cvs.width/2)?user:comp;
 if(collision(ball,player)){
    let collidepoint=(ball.y-(player.y+player.height/2));
    collidepoint=collidepoint/(player.height/2);
    let angleRad=(Math.PI/4)*collidepoint;
    let direction=(ball.x<cvs.width/2)?1:-1;
    ball.velocityX=direction*ball.speed*Math.cos(angleRad);
    ball.velocityY=direction*ball.speed*Math.sin(angleRad);
    ball.speed+=0.1;
  }
  if(ball.x-ball.radius<0){
    comp.score++;
    resetBall();
  }
  else if(ball.x+ball.radius>cvs.width){
    user.score++;
    resetBall();
  }

}
function resetBall(){
  ball.x=cvs.width/2;
  ball.y=cvs.height/2;
  ball.speed=5;
  ball.velocityX=-ball.velocityX;
}
function game(){
  update();//Movements collision detection
  render();
}
const frame=50;
setInterval(game,1000/frame);
