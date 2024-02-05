npm run install --workspace=packages --if-present
npm version patch --workspace=packages/core --if-present
npm publish --workspace=packages/core --if-present

npm version patch --workspace=packages/vue2 --if-present
npm publish --workspace=packages/vue2 --if-present
