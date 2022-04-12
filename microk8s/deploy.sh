docker tag lbaf23/ptm-leaderboard-attack:1.0.0 localhost:32000/ptm-leaderboard-attack:1.0.1
docker push localhost:32000/ptm-leaderboard-attack:1.0.1
microk8s kubectl apply -f attack-local.yml
 