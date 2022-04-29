# PTM Leaderboard

## Debug

- api

```bash
cd api
go run main.go
```

- web

```bash
cd web
yarn
yarn start
```

- file

```bash
cd filestorage
go run main.go
```

- attack

```bash
cd attack
python main.py
```

- send

```bash
cd send
go run main.go
```



## Release

```bash
vim base64.sh
bash bash64.sh
```

```bash
vim secret.yaml
```

```bash
kubectl apply -f namespace.yaml
kubectl apply -f secret.yaml
kubectl apply -f ./yaml/
```

| Pod    | TargetPort | NodePort |
| ------ | ---------- | -------- |
| web    | 12001      | 30001    |
| api    | 12002      | 30002    |
| auth   | 12003      | 30003    |
| attack |            |          |
| nats   | 4222       | 30005    |
| file   | 12006      | 30006    |
| send   | 12007      | 30007    |

