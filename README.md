# Contest Application (with React & Apollo)

An appliction for creating and managing contests created by several organizations.

> :warning: Graphcool will be sunsetted July 1, 2020, so I need to change the backend code :expressionless:

## Getting Started

### 1. Download the example

```sh
git clone git@github.com:kiranlm/contest.git
cd server
```

### 2. Create your Graphcool service

```sh
# Install latest version of the Graphcool CLI
npm install -g graphcool

# Install dependencies and deploy service
yarn install
graphcool deploy
```

When prompted which cluster you want to deploy to, choose any of the **Shared Clusters** options (`shared-eu-west-1`, `shared-ap-northeast-1` or `shared-us-west-2`).

> Note: The service's schema is created based on the type definitions in [`./server/types.graphql`](./server/types.graphql).

#### 3. Connect the app with your GraphQL API

Paste the `Simple API` endpoint from the previous step to `./src/index.js` as the `uri` argument in the `createHttpLink` call:

```js
// replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
const httpLink = new createHttpLinkHttpLink({ uri: '__SIMPLE_API_ENDPOINT__' });
```

> Note: You can get access to your endpoint using the `graphcool info` command.

### 4. Install dependencies & run locally

Navigate back into the root directory of the project, install the dependencies and run the app:

```sh
cd ..
yarn install
yarn start
```

You can now use the app at `http://localhost:3000`.

We :purple_heart: **Opensource**
