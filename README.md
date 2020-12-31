# AI Demo (Web Interface)
This is a demo app illustrating how to build a custom machine learning pipeline. It consists of 
this web interface built using NextJS/React and ChartsJS, plus two APIs using Golang and Cloud Run, 
and backend processors using Python and Cloud Functions.

# Demo (submit, review, and view jobs)
![API Demo](./img_demo.gif)

# Architecture
![AI demo architecture](./img_arch.png)

# Components
- [Config](https://#) (pending)
- [Web App](https://github.com/mikesparr/ai-demo-web) (this repo)
- [Ingest API](https://github.com/mikesparr/ai-demo-ingest)
- [Predict API](https://github.com/mikesparr/ai-demo-predict)
- [Processors](https://github.com/mikesparr/ai-demo-functions)

# Prerequisites
You must be familiar with Google Cloud Platform and have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud` CLI) installed. 
If you want to recreate the **AI Demo** then you will want an active project with billing enabled.

* NOTE: when you are done remember to **DELETE THE PROJECT** to avoid unneccessary billing.

# Install
You can run this app locally if you have NodeJS installed, or you can run in Docker (if installed).

## Setup
```bash
# clone repo and change to directory
git clone git@github.com:mikesparr/ai-demo-web.git
cd ai-demo-web
```

## Run local (node)
```bash
# set env vars with API url
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=<YOUR-API-URL>
NEXT_PUBLIC_API_KEY=<YOUR-API-KEY> # if applicable and using gateway + auth (recommended)

# run in development mode (see package.json for other scripts)
npm install
npm run dev
```

## Run in Docker
```bash
# build image
docker image -t ai-demo-web .

# run image (passing in API url and key)
docker run --name ai-demo-web -e NEXT_PUBLIC_API_URL=<YOUR-API-URL> -e NEXT_PUBLIC_API_KEY=<YOUR-API-KEY> -p 3000:3000 ai-demo-web
```

# Usage
Visit http://localhost:3000 to interact with the app
- toggle the Dark Mode icon in nav bar to switch viewing modes (optional)

# Other considerations
- Finish functionality (new batch and corrections)
- Automated testing
- Pagination
- Authentication
- Personalization
- Further optimize Docker image size (if possible)

# Contributing
This is just a demo so fork and use at your own discretion.
