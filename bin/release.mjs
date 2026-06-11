#!/usr/bin/env node

import { execFile as execFileCallback } from 'node:child_process';
import { spawn } from 'node:child_process';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);

const colors = {
	bold: (value) => `\u001b[1m${value}\u001b[22m`,
	cyan: (value) => `\u001b[36m${value}\u001b[39m`,
	dim: (value) => `\u001b[2m${value}\u001b[22m`,
	green: (value) => `\u001b[32m${value}\u001b[39m`,
	red: (value) => `\u001b[31m${value}\u001b[39m`,
	yellow: (value) => `\u001b[33m${value}\u001b[39m`,
};

async function run(command, args, options = {}) {
	const { stdout } = await execFile(command, args, {
		...options,
	});

	return stdout.trim();
}

async function runInherited(command, args) {
	await new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: 'inherit' });

		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
		});
	});
}

const currentBranch = await run('git', ['branch', '--show-current']);
if (currentBranch !== 'main') {
	console.error(colors.red(`Error: you must be on the 'main' branch (currently on '${currentBranch}')`));
	process.exit(1);
}

await runInherited('git', ['fetch', 'origin', 'main', '--tags']);

const [localSha, remoteSha] = await Promise.all([
	run('git', ['rev-parse', 'HEAD']),
	run('git', ['rev-parse', 'origin/main']),
]);

if (localSha !== remoteSha) {
	console.error(colors.red('Error: local main is not in sync with origin/main. Pull or push first.'));
	process.exit(1);
}

const today = new Date().toISOString().slice(0, 10).replaceAll('-', '');
const prefix = `v${today}`;
const existingTags = await run('git', ['tag', '--list', `${prefix}*`, '--sort=-version:refname']);
const lastTag = existingTags.split('\n').filter(Boolean)[0];
const nextTag = lastTag ? `${prefix}.${Number(lastTag.split('.').at(-1)) + 1}` : `${prefix}.1`;

console.log(`\n${colors.bold('Next release:')} ${colors.cyan(nextTag)}\n`);

const lastRelease = (await run('git', ['tag', '--sort=-creatordate'])).split('\n').filter(Boolean)[0];
if (lastRelease) {
	console.log(colors.dim(`Commits since ${lastRelease}:`));

	const log = await run('git', [
		'log',
		'--format=%C(yellow)%h%C(reset) %C(bold blue)%<(12)%al%C(reset) %s%C(auto)%d%C(reset)',
		`${lastRelease}..HEAD`,
	]);

	console.log(log || colors.yellow('  No new commits.'));
	console.log();
}

const readline = createInterface({ input, output });
const confirm = await readline.question(`Create release ${colors.cyan(nextTag)}? ${colors.dim('[y/N]')} `);
readline.close();

if (!/^[Yy]$/.test(confirm)) {
	console.log(colors.yellow('Aborted.'));
	process.exit(0);
}

await runInherited('git', ['tag', '-m', nextTag, nextTag]);
await runInherited('git', ['push', 'origin', nextTag]);

const releaseArgs = ['release', 'create', nextTag, '--title', nextTag, '--generate-notes', '--latest'];
if (lastRelease) {
	releaseArgs.push('--notes-start-tag', lastRelease);
}

await runInherited('gh', releaseArgs);

console.log(colors.green(`\nRelease ${nextTag} created!`));
console.log(colors.dim('Docker image will be built and pushed by GitHub Actions.'));
