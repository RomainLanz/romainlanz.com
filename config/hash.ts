import { defineConfig } from '@adonisjs/core/hash'

const hashConfig = defineConfig({
  default: 'scrypt',

  list: {
    /**
     * The scrypt driver uses the Node.js crypto module for hashing passwords.
     */
    scrypt: {
      driver: 'scrypt',
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    },

    /**
     * The argon2 driver needs the "argon2" npm package for hashing passwords
     *
     **************************
     *    npm i argon2
     **************************
     */
    argon: {
      driver: 'argon2',
      variant: 'id',
      version: 19,
      iterations: 3,
      memory: 65536,
      parallelism: 4,
    },

    /**
     * The bcrypt driver needs the "bcrypt" npm package for hashing passwords
     *
     **************************
     *    npm i bcrypt
     **************************
     */
    bcrypt: {
      driver: 'bcrypt',
      version: 98,
      rounds: 10,
    },
  },
})

export default hashConfig

declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
