/*
|--------------------------------------------------------------------------
| JavaScript entrypoint for running ace commands
|--------------------------------------------------------------------------
|
| Since, we cannot run TypeScript source code using "node" binary, we need
| a JavaScript entrypoint to run ace commands.
|
| This file runs "bin/console.ts" file as a child process and uses "ts-exec"
| loader to run TypeScript code.
|
| Executing this file is same as running the following command.
| "node --import=@poppinss/ts-exec bin/console.js"
|
*/

import '@poppinss/ts-exec';

await import('./bin/console.js');
