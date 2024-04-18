# Traders-Hub Deriv V2

[![Coverage Status](https://coveralls.io/repos/github/deriv-com/traders-hub/badge.svg?branch=main)](https://coveralls.io/github/deriv-com/traders-hub?branch=main)
[![Coveralls](https://github.com/deriv-com/traders-hub/actions/workflows/coveralls.yml/badge.svg)](https://github.com/deriv-com/traders-hub/actions/workflows/coveralls.yml)
[![Node Version](https://img.shields.io/badge/node-v18.16.0-green)](https://nodejs.org)
[![React Version](https://img.shields.io/badge/react-v18.2.0-blue)](https://reactjs.org)
[![Typescript Version](https://img.shields.io/badge/typescript-v5.2.2-blue)](https://www.typescriptlang.org)
[![Build staging and Deploy to Cloudflare Pages](https://github.com/deriv-com/traders-hub/actions/workflows/build-and-deploy-staging.yml/badge.svg)](https://github.com/deriv-com/traders-hub/actions/workflows/build-and-deploy-staging.yml)

This is a new version of the Traders-Hub Deriv website. It is a separate project from the original Traders-Hub Deriv website, and is intended to be a complete rewrite of the original website. This project is build using react and tailwindcss.

This template was generated using `create-deriv-v2`

## Getting started

Setup SSL Certificates

To run this project, you will need the dev.pem and cert.pem SSL certificate keys.

You can obtain these keys from any member of the TradersHub team.

If you desire to use the default directory:

-   In `cert` directory, copy `cert.example.pem` & `dev.example.pem` to `cert.pem` & `dev.pem` respectively
-   Paste the respective certificate keys to `pem` files.
-   Create a new `.env` from the `.env.example` file within the root directory

If you prefer to use a different directory:

Once you have these keys, add them to your local machine. You can place them in any directory, but remember the path where you placed them.
Next, you need to include the paths to these keys in your .env file. Add the following lines to your .env file:

```
DEV_PEM_PATH='YOUR_PATH/dev.pem'
CERT_PEM_PATH='YOUR_PATH/cert.pem'
```

After setting up the SSL certificates, you can run the development server.

To run the development server:

```bash
npm run dev
```

To generate a build:

```bash
npm run build
```
