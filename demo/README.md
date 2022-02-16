# Haircolor demo

## Contents

This demo shows how to use the Haicolor model to detect faces in a video stream.

## Setup

cd into the demo folder:

```sh
cd haircolor/demo
```

Install dependencies and prepare the build directory:

```sh
yarn
```

To watch files for changes, and launch a dev server:

```sh
yarn watch
```

## If you are developing haircolor locally, and want to test the changes in the demo

Cd into the blazeface folder:
```sh
cd haircolor
```

Install dependencies:
```sh
yarn
```

Publish haircolor locally:
```sh
yarn build && yarn yalc publish
```

Cd into the demo and install dependencies:

```sh
cd demo
yarn
```

Link the local haircolor to the demo:
```sh
yarn yalc link @tensorflow-models/haircolor
```

Start the dev demo server:
```sh
yarn watch
```

To get future updates from the haircolor source code:
```
# cd up into the haircolor directory
cd ../
yarn build && yarn yalc push
```
