var ANIMATION_CONTROLLER = (function () {
	var troller = {},
	scenes = [],
	animFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function(/* function */ callback/*,  DOMElement  element */){
                    window.setTimeout(callback, 1000 / 60);
                  };
    }());

    function looper () {
    	var i = 0;

    	for(i = 0; i < scenes.length; i+= 1) {
    		scenes[i].update();
    	}

    	for(i = 0; i < scenes.length; i+= 1) {
    		scenes[i].render();
    	}

    	animFrame(looper);
    }

    troller.addScene = function (seen) {
    	if(seen instanceof THREE_D_SCENE) {
    		scenes.push(seen);
    	} else {
    		console.error('object needs an update and render function');
    	}
    };

    troller.removeScene = function (seen) {
    	var i = 0;
    	for(i = 0; i < scenes.length; i+= 1) {
    		if(seen.identity === scenes[i].identity) {
    			scenes.splice(i,1);
    		}
    	}
    }; 

    troller.init = function () {
    	looper();
    }

	return troller;

}());