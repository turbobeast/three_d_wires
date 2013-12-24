var THREE_D_SCENE = function (ctx, center, fl, backgroundStyle, width, height) {
	
	var context = ctx,
	bgStyle = backgroundStyle || 'rgba(0,0,0,0.1)',
	width = width || 600,
	height = height || 600,
	velZ = 0;
	objs = [];

	this.center =  {
		x : center.x || 200,
		y : center.y || 200,
		z : center.z || 400
	};
	this.focusLength =  fl || 550;
	this.identity = Math.round(Math.random() * 10000000)

	this.setCenter = function (cent) {
		this.center = cent; 
	};

	this.zoomAround = function (val) {
		velZ += val;
	}


	this.update = function () {
		var i = 0;
		this.center.z += velZ;
		velZ *= 0.96;

		for(i = 0; i < objs.length; i += 1) {
			objs[i].update();
		}
	};

	this.render = function () {

		context.save();
		context.fillStyle = bgStyle;
		context.fillRect(0,0,width, height);
		context.restore(); 

		for(i = 0; i < objs.length; i += 1) {
			objs[i].render(context);
		}
	};

	this.addObject = function (three_obj) {
		if(typeof three_obj.update === 'function' && typeof three_obj.render === 'function') {
			three_obj.setScene(this);
    		objs.push(three_obj);
    	} else {
    		console.error('object needs an update and render function');
    	}
	};

	this.updateSize = function (wid, hite) {
		width = wid;
		height = hite;
		this.center.x = width * 0.5;
		this.center.y = height * 0.5;
	};
};