<div align="center">
  <h1>François</h1>
  <sub>French to English in Discord</sub>
</div>

---
<div align="center">
  <img alt="screen recording of translation in discord" src="https://user-images.githubusercontent.com/9158485/219866528-211dd2db-1753-41df-ba3f-ea8beea39ab7.gif" width="400" />
</div>

---

## Prerequisites

- Make sure you have NodeJS & NPM installed, as well as PNPM.

### If Using Translation Service

- Ensure you have Pytorch installed. If you're on Mac, make sure to install Pytorch Nightly (>2.0) as the standard version does not contain the necessary operations.
- Make sure to have Python3 installed, you can use conda if desired.
- A Docker Compose configuration exists in the root direction, you can use it to easily and quickly spin up a localized instance.
- Make sure you have `make` installed, this will speed up installation.

## Notices

- This will perform best if you have a CUDA-capable GPU installed.

## Setup

> **Note**
> If you plan on using DeepL to translate messages, you can skip right to setting up the Discord bot.

### Setup the Translation Service

First, ensure you have the repository cloned and go into the root directory of the project.

These two commands will install and run the Python service, this may take a while.

```bash
make install
```

### Setup the Discord Bot

Create a `.env` file and populate the following environment variables.

```bash
# The bot's token, make sure to keep this a secret.
DISCORD_TOKEN=

# The bot client ID from the Discord developer portal.
DISCORD_CLIENT_ID=

# Should be the URL that points to the Python service. (eg. http://localhost:8000)
TRANSLATION_URL=

# If this is set, DeepL will be used with the API key provided for all translations,
# if it is not set it will try to use the translation service and local model.
DEEPL_API_KEY=
```

Install the dependencies with `pnpm`.

```bash
pnpm install
```

## Run

If you want to run the translation service, run the following command.

```bash
make run
```

Finally, you can run the Discord bot.

```bash
pnpm start
```
