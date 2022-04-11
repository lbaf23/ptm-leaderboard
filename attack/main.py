import asyncio
import nats
from config import init_config
from attack import start_attack
from database import PostgreSQL

config = init_config()
db = PostgreSQL(config)


async def main():
    nc = await nats.connect(config.get('nats', 'url'))
    sub = await nc.subscribe("foo", cb=handle)


async def handle(msg):
    data = msg.data.decode()
    start_attack(
        config,
        db,
        data.get('id'),
        data.get('taskId'),
        data.get('userId'),
        data.get('userName'),
        data.get('fileUrl'),
        data.get('modelName')
    )
    return {"code": 202}


if __name__ == '__main__':
    asyncio.run(main())
