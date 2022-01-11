module.exports = ((cmd, ops) => {

	let t,
		spawn = require('child_process').spawn(cmd, ops),
		stdout = spawn.stdout.on('data', (d) => {
			let data = d.toString().trim();
			for (let i in t.arrays.debug) {
				t.arrays.debug[i](data);
			}

			if (t.arrays.on[data]) {
				spawn.stdin.write(t.arrays.on[data] + '');
				delete t.arrays.on[data]
				let k = 0;
				for (let i in t.arrays.on) {
					k++;
				}

				if (k === 0) {
					spawn.stdin.end();
				}
			}


		}).on('error', (data) => {
			for (let i in t.arrays.error) {
				t.arrays.error[i](data);
			}
		}).on('close', (data) => {
			for (let i in t.arrays.end) {
				t.arrays.end[i](data);
			}
		});

	t = {

		arrays: {
			end: [],
			on: {},
			debug: [],
			error: [],
		},

		error: (func) => {
			this.arrays.error.push(func);
			return this;
		},

		on: (a, b) => {
			this.arrays.on[a] = b;
			return this;
		},

		end: (func) => {
			this.arrays.end.push(func);
			return this;
		},

		debug: (func) => {
			this.arrays.debug.push(func);
			return this
		},

	};

	return t;

});