module.exports = ((cmd, args, shell) => {
	const {spawn} = require('child_process');

		console.log(1)

	let t,
		spawnedCmd = spawn(cmd, args, {shell: shell === false || true}),
		stdout = spawnedCmd.stdout

	stdout
	.on('data', (d) => {
		console.log(`'${d.toString().trim()}'`)
		let data = d.toString().trim();
		for (let i in t.arrays.debug) {
			t.arrays.debug[i](data);
		}
		for (let i in t.arrays.on) {
			let test = t.arrays.on[i].a.test(data)
			console.log(data, t.arrays.on[i].a, test)
			
			if (test) {
				spawnedCmd.stdin.write(t.arrays.on[i].b + '\r\n');
				t.arrays.on.splice(i, 1)
				if (t.arrays.on.length === 0) {
					console.log(21111)
					spawnedCmd.stdin.end();
				}
				break
			}
		}
		


	})
	.on('error', (data) => {
		for (let i in t.arrays.error) {
			t.arrays.error[i](data);
		}
	})
	.on('close', (data) => {
		for (let i in t.arrays.end) {
			t.arrays.end[i](data);
		}
	})

	spawnedCmd.on('error', (data) => {
		for (let i in t.arrays.error) {
			t.arrays.error[i](data);
		}
	})

	t = {

		arrays: {
			end: [],
			on: [],
			debug: [],
			error: [],
		},

		error: (func) => {
			t.arrays.error.push(func);
			return t;
		},

		on: (a, b) => {
			t.arrays.on.push({a: typeof a === 'object' ? a : new RegExp(a, 'igm') , b: b})
			return t;
		},

		end: (func) => {
			t.arrays.end.push(func);
			return t;
		},

		debug: (func) => {
			t.arrays.debug.push(func);
			return t
		},

	};

	return t;

});