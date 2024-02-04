##### Build Packages
```bash
npm install --workspace=packages --if-present
```

```bash
npm run build --workspace=packages --if-present
```

##### Publish 
First publish the core package.
```bash
npm version minor --workspace=packages/core --if-present
npm publish --workspace=packages/core --if-present
```

Then upgrade core package version in package.json
```bash
npm version minor --workspace=packages/vue2 --if-present
npm publish --workspace=packages/vue2 --if-present
```

##### Set version
```bash
npm version minor --workspace=packages --if-present
```

##### Test
```bash
npm run test --workspace=packages --if-present
```
