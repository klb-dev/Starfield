let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let mouse = { x:canvas.width / 2, y: canvas.height / 2 };
		canvas.addEventListener('mousemove', e => {
			mouse.x = e.x;
			mouse.y = e.y;
		})

		let stars = [];
		for(let i = 0; i < 2000; i++){
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				z: Math.random() * 1000
			});
		}

		function animate(){
			ctx.fillStyle = 'rgba(0,0,0,0.1)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
			stars.forEach(s => {
				s.z -= 3;
				if (s.z <= 0) s.z = 1000;
				let scale = 1000 / s.z;
				let x = (s.x - mouse.x) * scale + mouse.x;
				let y = (s.y - mouse.y) * scale + mouse.y;
				let dist = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
				ctx.beginPath();
				ctx.arc(x,y,scale,0,Math.PI * 2);
				ctx.fillStyle = `hsl(${dist % 360}, 100%,50%)`;
				ctx.fill();
			});
			requestAnimationFrame(animate);
		}
		animate();