var THREE_D_MATH = (function (){
	var maths = {};

	function radians (degs) { return (degs * Math.PI) / 180; }
	function degrees (rads) { return (rads / Math.PI) * 180; }

 	maths.makeThreeDeePoints = function (points) {
		var i = 0,
		threedeepoints = [];

		if(!(points instanceof Array)) {
			return console.error('needs to be an array');
		}

		if(points.length % 3 !== 0) {
			return console.error('3d points need to be in sets of three');
		}

		for(i = 0; i < points.length; i += 3) {
			threedeepoints.push({
				x : points[i],
				y : points[i + 1],
				z : points[i + 2]
			});
		}

		return threedeepoints;
	}


    maths.rotateX = function () {
		var i = 0,
		p,
		y1,
		z1,
		rads = radians(this.rVelX),
		cos = Math.cos(rads),
		sin = Math.sin(rads);

		for(i = 0; i < this.points.length; i += 1) {
			p = this.points[i];
			y1 = (p.y * cos) -  (p.z * sin);
            z1 = (p.z * cos) + (p.y * sin);
            p.y =  y1;
            p.z =  z1;
		}
	};

	maths.rotateY = function () {
		var i = 0,
		p,
		x1,
		z1,
		rads = radians(this.rVelY),
		cos = Math.cos(rads),
		sin = Math.sin(rads);

		for(i = 0; i < this.points.length; i += 1) {
			p = this.points[i];
            x1 = (p.x * cos) + (p.z * sin);
            z1 = (p.z * cos) - (p.x * sin);

            p.x = x1;
            p.z = z1;
		}
	};

	maths.rotateZ = function () {
		var i = 0,
		p,
		x1,
		y1,
		rads = radians(this.rVelZ),
		cos = Math.cos(rads),
		sin = Math.sin(rads);

		for(i = 0; i < this.points.length; i += 1) {
			p = this.points[i];
			y1 = (p.y * cos) -  (p.x * sin);
            x1 = (p.x * cos) + (p.y * sin);

            p.x =  x1;
            p.y =  y1;
		}
	};

	/* 
	* you must set the context 
	* of this method to be an instance of Scene
	*/
	maths.project = function (p3d, objcent) {
        var p2d = {};
		if(!this instanceof THREE_D_SCENE) {
			console.log('context of method project must be three d scene');
			return { x : 0, y : 0};
        }

        if(objcent) {
			this.scale = this.focusLength / (this.focusLength + p3d.z + this.center.z -objcent.z );
  			p2d.x =  this.center.x - objcent.x + p3d.x * this.scale;
			p2d.y =  this.center.y - objcent.y + p3d.y * this.scale;
        } else {
        	this.scale = this.focusLength / (this.focusLength + p3d.z + this.center.z );
  			p2d.x =  this.center.x + p3d.x * this.scale;
			p2d.y =  this.center.y + p3d.y * this.scale;
        }

        return p2d;
    };


	return maths; 
}());