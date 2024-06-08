module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/index.js',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      instances: '1',
    },
  ],
}
