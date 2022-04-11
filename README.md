# PTM Leaderboard

## dev

### api

run gin

```bash
cd api
go run main.go
```

### web

run front end

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

> print db password

```bash
echo $(kubectl get secret --namespace default postgresql -o jsonpath="{.data.postgresql-password}" | base64 --decode)
```

### web

> set casdoor key

```bash
vim ptm-leaderboard-casdoorconf
```

> write key

```bash
faas-cli secret create ptm-leaderboard-casdoorconf --from-file ptm-leaderboard-casdoorconf
```

### api (gin)

> set db password

```bash
vim ptm-leaderboard-db-password
```

> write db password

```bash
faas-cli secret create ptm-leaderboard-db-password --from-file ptm-leaderboard-db-password
```

### attack (python)

### casdoor

```bash
git clone https://github.com/casdoor/casdoor.git
cd web && yarn && yarn build

cd conf && vim app.conf

# edit dbname = 
#   leave it empty
# edit dataSourceName = "user=postgres password=password host=localhost port=5432 dbname=casdoor sslmode=disable"
# edit driverName = postgres
# edit runmode = prod

cd ..

cd object && vim adapter.go

# uncomment import
#   _ "github.com/lib/pq"

cd ..

go mod tidy

go build main.go
./main
```

port

12001:30001 web

12002:30002 api

12003:30003 auth

12004:30004 attack

4222:30005 nats
