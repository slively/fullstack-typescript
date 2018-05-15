import { spawn, ChildProcess } from 'child_process';
const treeKill = require('tree-kill');

const children = [];

export const runYarnCommand = (cmd: string) => {
	const child = spawn('yarn', [cmd], { cwd: __dirname + '/..', env: process.env });
	const pid = child.pid;

	children.push(pid);
	child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);
	child.on('exit', (code, signal) => {
		console.log(`${cmd} exited with code ${code} and signal ${signal} (pid: ${pid})`);
	});

	return child;
};

export const killAll = () => {
	children.forEach(pid => treeKill(pid));
};

export const kill = (child: ChildProcess) => {
	treeKill(child.pid);
};

process.on('SIGINT', killAll);
