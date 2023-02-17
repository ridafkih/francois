<div align="center">
  <h1>François</h1>
  <sub>French to English in Discord</sub>
</div>

## Prerequisites

- If you plan to run the local machine-learning translation model, ensure you have Pytorch installed. If you're on Mac, make sure to install Pytorch Nightly (>2.0) as the standard version does not contain the necessary operations.
- Make sure to have Python3 installed, you can use conda if desired.
- Make sure you have NodeJS & NPM installed, as well as PNPM.
- A Docker Compose configuration exists in the root direction, you can use it to easily and quickly spin up a localized instance.
- Make sure you have `make` installed, this will speed up installation.

## Notices

- This will perform best if you have a CUDA-capable GPU installed.

## Setup

First, ensure you have the repository cloned and go into the root directory of the project.

These two commands will install and run the Python service, this may take a while.

```bash
make install
```

Create a `.env` file and populate the following environment variables.

```bash
# The bot's token, make sure to keep this a secret.
DISCORD_TOKEN=

# The bot client ID from the Discord developer portal.
DISCORD_CLIENT_ID=

# Should be the URL that points to the Python service. (eg. http://localhost:8000)
TRANSLATION_URL=
```

## Run

These two commands will run the Python service which runs the translator, as well as the Discord bot. Once that's done, the two can talk to each other and the translation service will begin.

```bash
make run
pnpm start
```
