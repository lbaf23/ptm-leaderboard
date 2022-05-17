echo ===============database===============

echo dbhost:
echo -n dbhost | base64

echo dbname:
echo -n postgres | base64

echo dbpassword:
echo -n xxx | base64

echo dbport:
echo -n 5432 | base64

echo dbname:
echo -n ptm_leaderboard_db | base64


echo ===============casdoor===============

echo casdoorendpoint:
echo -n http://xxx:30003 | base64

echo casdoorclientid:
echo -n xxx | base64

echo casdoorclientsecret:
echo -n xxx | base64

echo casdoororganization:
echo -n ptm | base64

echo applicationname
echo -n ptm-leaderboard | base64


echo ===============nats===============

echo natsurl
echo -n nats://xxx@nats.ptm.svc.cluster.local:4222 | base64


echo ===============file===============
echo localserver:
echo -n http://xxx:30006/file | base64
 

echo ===============oss===============

echo region:
echo -n xxx | base64

echo accesskeyid:
echo -n xxx | base64

echo accesskeysecret:
echo -n xxx | base64

echo rolearn:
echo -n xxx | base64

echo rolesessionname:
echo -n ptm-session | base64

echo bucket:
echo -n xxx | base64
