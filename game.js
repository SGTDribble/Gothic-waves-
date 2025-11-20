const canvas=document.getElementById('game');const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;

// Gothic player ship (simple silhouette)
function drawGothicShip(x,y){
  ctx.fillStyle='#7f0aff';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x-20, y+40);
  ctx.lineTo(x, y+30);
  ctx.lineTo(x+20, y+40);
  ctx.closePath();
  ctx.fill();
}

// Alien ships
function drawAlien(x,y){
  ctx.fillStyle='#0aff61';
  ctx.beginPath();
  ctx.ellipse(x, y, 25, 15, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillRect(x-15,y+10,30,5);
}

let player={x:canvas.width/2,y:canvas.height-80};
let bullets=[];setInterval(()=>{bullets.push({x:player.x,y:player.y-20})},200);

let enemies=[];
function spawn(){
  for(let i=0;i<6;i++) enemies.push({x:80+i*60,y:80});
}
spawn();

let touchX=null;
canvas.addEventListener('touchmove',e=>{touchX=e.touches[0].clientX});

function update(){
  if(touchX!==null){player.x+=(touchX-player.x)*0.2;}

  bullets.forEach(b=>b.y-=8);
  bullets=bullets.filter(b=>b.y>0);

  enemies.forEach(e=>{e.y+=0.3;if(e.y>canvas.height-120){alert('GAME OVER');location.reload();}});

  enemies.forEach((e,ei)=>{
    bullets.forEach((b,bi)=>{
      if(b.x>e.x-25 && b.x<e.x+25 && b.y>e.y-15 && b.y<e.y+15){
        enemies.splice(ei,1);bullets.splice(bi,1);
      }
    });
  });

  if(enemies.length===0) spawn();
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawGothicShip(player.x,player.y);
  bullets.forEach(b=>{ctx.fillStyle='white';ctx.fillRect(b.x-2,b.y,4,10);});
  enemies.forEach(e=>drawAlien(e.x,e.y));
}

function loop(){update();draw();requestAnimationFrame(loop);}loop();
