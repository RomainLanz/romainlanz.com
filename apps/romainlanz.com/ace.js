/*
|--------------------------------------------------------------------------
| JavaScript entrypoint for running ace commands
|--------------------------------------------------------------------------
|
| Since, we cannot run TypeScript source code using "node" binary, we need
| a JavaScript entrypoint to run ace commands.
|
| This file runs "bin/console.ts" file as a child process and uses "ts-node/esm"
| loader to run TypeScript code.
|
| Executing this file is same as running the following command.
| "node --loader=ts-node/esm bin/console.js"
|
*/

import 'ts-node-maintained/register/esm';

await import('./bin/console.js');
