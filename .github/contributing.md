##### Build Packages
```bash
npm install --workspace=packages --if-present
```

```bash
npm run build
```

##### Release
Then upgrade core package version in package.json
```bash
./bin/release.sh minor
```

##### Test
```bash
npm run test
```
