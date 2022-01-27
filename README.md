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

## database

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

get db password
```bash
echo $(kubectl get secret --namespace default postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
```

## api

dev

```bash
export GIN_MODE=debug
go run main.go
```

prod

set password

```bash
vim ptm-leaderboard-db-password
```

write db password


```bash
faas-cli secret create ptm-leaderboard-db-password --from-file ptm-leaderboard-db-password
```

deploy

```bash
faas-cli up -f api.yml
```


python

```bash
faas-cli template pull https://github.com/openfaas-incubator/python-flask-template
```

```bash
pipreqs ./ --encoding=utf-8 --force
```