import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

// rollup.config.js
export default [
    {
        input: 'src/main.js',

        output: {
            file: 'public/bundle.js',
            format: 'iife',
            sourcemap: true,
        },
        plugins: [
            resolve(), // tells Rollup to look in node_modules
            commonjs(),
            // In dev mode, call `npm run start` once
            // the bundle has been generated
            serve(),

            // Watch the `public` directory and refresh the
            // browser on changes when not in production
            livereload('public')
        ],
        watch: {
            clearScreen: false
        }
    }
];

