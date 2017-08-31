var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');


// console.log(rgb);

function Circle(x,y,dx,dy,radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;


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

	}
}

var circleArray = [];
for (var i = 0; i < 100; i++) {

	var radius = Math.random() * 70;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var speed = 5;
	var dx = (Math.random() - 0.5) * speed;
	var dy = (Math.random() - 0.5) * speed;
	

	circleArray.push(new Circle(x,y,dx,dy,radius));
}

console.log(circleArray);

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0, innerWidth, innerHeight)
	

	for (var i = 0; i< circleArray.length; i++) {
		circleArray[i].update();
	}

}

animate();