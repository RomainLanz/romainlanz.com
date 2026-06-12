import { getActiveTest } from '@japa/runner';
import type { Test } from '@japa/runner/core';

export class BaseFixture {
	#test: Test<any> | undefined;

	protected getActiveTest() {
		if (this.#test) {
			return this.#test;
		}

		const activeTest = getActiveTest();

		if (!activeTest) {
			throw new Error('Cannot access the current test context outside of a running test');
		}

		this.#test = activeTest;

		return activeTest;
	}

	get assert() {
		return this.getActiveTest().context.assert;
	}
}
