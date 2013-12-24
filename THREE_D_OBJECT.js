var THREE_D_OBJECT = function (three_d_points, style) {
	var three_obj = {
		scene : null,
		points : three_d_points,
		style : style || 'rgb(255,0,0)',
		velX : 0,
		velY : 0,
		velZ : 0,
		rVelX : Math.random() * 0.2,
		rVelY : Math.random() * 0.2,
		rVelZ :Math.random() * 0.2,
		center : {
			x : Math.random() * 1000 -400,
			y : Math.random() * 1000 -400,
			z : Math.random() * 4000// -400
		}
	},
	friction = 0.91;


	three_obj.updateVelocities = function (vels) {
		var vel;
		for(vel in vels) {
			three_obj[vel] = vels[vel];
		}
	};

	three_obj.setScene = function (seen) {
		three_obj.scene = seen;
	};

	three_obj.update = function () {
		THREE_D_MATH.rotateX.call(three_obj);
		THREE_D_MATH.rotateY.call(three_obj);
		THREE_D_MATH.rotateZ.call(three_obj);
	};

	three_obj.render = function (ctx) {
			var i = 1,
			p2d,
			c2d;

			ctx.save(); 

			ctx.strokeStyle = style;
			ctx.beginPath();

			p2d = THREE_D_MATH.project.call(three_obj.scene, three_obj.points[0], three_obj.center);
			ctx.moveTo( p2d.x , p2d.y );

			if(three_obj.points.length > 1) {
				for(i = 1; i < three_obj.points.length; i += 1) {
					p2d = THREE_D_MATH.project.call(three_obj.scene, three_obj.points[i], three_obj.center );
					ctx.lineTo(p2d.x, p2d.y);
				}
			} else {
				ctx.lineTo(p2d.x + 1,p2d.y + 1)
			}

			ctx.stroke();
			ctx.restore();
		};

	return three_obj; 
};