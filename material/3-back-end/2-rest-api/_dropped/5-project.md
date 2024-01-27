Part 5: Practical Project (1 Peer + 1 STL correction) - Discord bot

- [Quick setup, using v14](https://www.youtube.com/watch?v=pDQAn18-2go)
- [Documentation (v14)](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome)

Stack:
- Express.js
- SQLite
- Kysely
- zod
- Vitest (allowed alternatives: jest)
- ESLint + Prettier
- TypeScript

- `README.md` should provide sufficient instructions on how to run the bot and what the bot can do.
- Use migrations for database schema changes.
- Have a method for testing the bot interactions without having to run the bot itself.

## Starting resources:

Right now, we are recommending to use `discord.js` package over directly interacting with `@discordjs/core`/`@discordjs/ws`, as these packages are less documented and have fewer examples.

- [Quick setup, using v14](https://www.youtube.com/watch?v=pDQAn18-2go)
- [Documentation (v14)](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome)
- [Giphy API](https://developers.giphy.com/docs/api/endpoint)
- [Giphy API (npm)](https://www.npmjs.com/package/@giphy/js-fetch-api)
- [Tenor API](https://tenor.com/gifapi/documentation)

- You might want to separate out the Discord bot interactions into a separate module (maybe this would be a good time to introduce a `service` layer for some of your modules?)

Note:
  - Important: make sure that `.env` is added to your `.gitignore`. Do not commit and do not share your `.env` file with anyone since it will include a Discord token. Provide a `.env.example` file with public values. If anyone needs to run your project, they will need to use their own Discord token, which is easy to get.

{{ 30 - 40 hours }}
