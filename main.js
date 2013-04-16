		function suppose(cmd, ops){
			
			d = {
				
				spawn: require('child_process').spawn(cmd, ops),
				
				array: {},
				
				error: function(func){
					this.errorFunc = func;
					return this;
				},
				
				on: function(a,b){
					this.array[a] = b;
					return this;
				},				
				
				end: function(func){
					this.endFunc = func;
					var ddd = this;
					console.log(this)
					this.spawn.stdout.on('data', function(d){
						var data = d.toString().trim();
						if(ddd.array[data]){
							
							console.log('`'+data+'`')
							ddd.spawn.stdin.write(ddd.array[data]+'\n');
							setTimeout(function(){p.spawn.stdin.write('\n')},200);
							delete ddd.array[data]
							var k = 0;
							for (var i in ddd.array) {
								k++;
							}
							console.log(k)
							if (k == 0) {
								ddd.spawn.stdin.end();
							}
						}
					}).on('error', function(data){
						(ddd.errorFunc||function(){})(data)
					}).on('close', function(data){
						(ddd.endFunc||function(){})(data);
						
					});
					return this;
				},
				
			};
			

			
			return d;
		}
		