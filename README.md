# Proxies filter

1. Create `proxies.txt` file and add the proxies that you want to filter

`proxies.txt`

```
72.206.181.123:4145
107.181.168.145:4145
142.54.237.34:4145
74.119.147.209:4145
72.49.49.11:31034
72.195.34.35:27360
```

2. Build the project: `pnpm build`

3. Run the project using `pnpm start`

4. Your filtered proxies are in `filtered.txt`

If you don't have proxies you can get proxies with

```bash
pnpm start -g
```
