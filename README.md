PTM Leaderboard
===

```sh
faas-cli template pull

faas-cli up -f stack.yml
```

or

```sh
faas-cli build -f stack.yml

faas-cli push -f stack.yml

faas-cli deploy -f stack.yml
```


## api

dev

```bash
export GIN_MODE=debug
go run main.go
```

prod

```bash
faas-cli up -f api.yml
```