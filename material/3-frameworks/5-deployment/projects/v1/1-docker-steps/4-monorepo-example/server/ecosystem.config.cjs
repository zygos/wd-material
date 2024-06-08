module.exports = {
  apps: [
    {
      name: 'server',
      script: './src/index.ts',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      interpreter: 'node',

      // or --loader tsx for older Node versions
      interpreter_args: '--import tsx',
      instances: '1',
    },
  ],
}
