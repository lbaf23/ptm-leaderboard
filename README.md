# PTM Leaderboard


## dev

### api

```bash
export GIN_MODE=debug
go run main.go
```

### web

```bash
cd web
yarn
yarn start
```



## prod


### database

> set database

```bash
cd database
```

```bash
kubectl apply -f db-pv.yaml
kubectl apply -f db-pvc.yaml
helm install postgresql bitnami/postgresql \
--set persistence.existingClaim=postgresql-pv-claim \
--set volumePermissions.enabled=true
```

> print password

```bash
echo $(kubectl get secret --namespace default postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
```


### api (gin)

> set password

```bash
vim ptm-leaderboard-db-password
```

> write db password

```bash
faas-cli secret create ptm-leaderboard-db-password --from-file ptm-leaderboard-db-password
```


### attack (python)




### deploy all functions

```sh
faas-cli template pull

faas-cli up -f stack.yml
```
