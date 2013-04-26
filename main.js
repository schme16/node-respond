module.exports = (function respond(cmd, ops){

	var t;

	var spawn = require('child_process').spawn(cmd, ops)
	var stdout = spawn.stdout.on('data', function(d){
		var data = d.toString().trim();
		for(var i in t.arrays.debug){
			t.arrays.debug[i](data);
		}

		if(t.arrays.on[data]){
			spawn.stdin.write(t.arrays.on[data]+'');
			delete t.arrays.on[data]
			var k = 0;
			for (var i in t.arrays.on) {
				k++;
			}

			if (k == 0) {
				spawn.stdin.end();
			}
		}



	}).on('error', function(data){
		for(var i in t.arrays.error){
			t.arrays.error[i](data);
		}
	}).on('close', function(data){
		for(var i in t.arrays.end){
			t.arrays.end[i](data);
		}
	});

	t = {

		arrays: {
			end:[],
			on:{},
			debug:[],
			error:[],
		},

		error: function(func){
			this.arrays.error.push(func);
			return this;
		},

		on: function(a,b){
			this.arrays.on[a] = b;
			return this;
		},

		end: function(func){
			this.arrays.end.push(func);
			return this;
		},

		debug: function(func){
			this.arrays.debug.push(func);
			return this
		},

	};

	return t;

});
