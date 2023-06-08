# Proxies filter

1. Create a file called `proxies.txt` and it should contain the proxies that you want to filter (checking if they are working) and the content should be similar to:

```
72.206.181.123:4145
107.181.168.145:4145
142.54.237.34:4145
74.119.147.209:4145
72.49.49.11:31034
72.195.34.35:27360
```

2. Build the project: `pnpm run build`

3. Run the project using `npm run start`

4. Your filtered proxies are in `filtered.txt`
