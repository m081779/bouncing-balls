var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight - 8;
canvas.width = window.innerWidth - 8;
var ctx = canvas.getContext('2d');

var circleArray = [];

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 150;


window.addEventListener('mousemove', function (event) { 
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function () {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
})


function Circle(x,y,dx,dy,radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;


	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var a = Math.random();
	var rgb = 'rgba('+r+ ', ' +g+ ', ' +b+ ', ' +a+ ')';

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		ctx.fillStyle = rgb;
		ctx.fill();
	}

	this.update = function () {
		this.x+=this.dx;
		this.y+=this.dy;

		if (this.x + this.radius > canvas.width  || this.x - this.radius < 0) {
			this.dx=-this.dx;
		}

		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy=-this.dy;
		}

		this.draw();


		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {

			if (this.radius < maxRadius) {
				this.radius += 3;
			}
			
		} 

		else if (this.radius > this.minRadius){
			this.radius -= 1;
		}
	}
}


for (var i = 0; i < 800; i++) {

	var radius = Math.random() * 10 + 1;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var speed = 3;
	var dx = (Math.random() - 0.5) * speed;
	var dy = (Math.random() - 0.5) * speed;
	

	circleArray.push(new Circle(x,y,dx,dy,radius));
}


function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0, innerWidth, innerHeight)


	for (var i = 0; i< circleArray.length; i++) {
		circleArray[i].update();
	}

}

animate();