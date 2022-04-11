import asyncio
import nats
from nats.errors import ConnectionClosedError, TimeoutError, NoServersError

async def main():
    nc = await nats.connect("nats://localhost:4222")

    async def message_handler(msg):
        subject = msg.subject
        reply = msg.reply
        data = msg.data.decode()
        print("Received a message on '{subject} {reply}': {data}".format(
            subject=subject, reply=reply, data=data))

    sub = await nc.subscribe("foo", cb=message_handler)

    await sub.unsubscribe(limit=2)
    await nc.publish("foo", b'Hello')
    await nc.publish("foo", b'World')
    await nc.publish("foo", b'!!!!!')

    # Synchronous style with iterator also supported.
    sub = await nc.subscribe("bar")
    await nc.publish("bar", b'First')
    await nc.publish("bar", b'Second')

    try:
        async for msg in sub.messages:
            print(f"Received a message on '{msg.subject} {msg.reply}': {msg.data.decode()}")
            await sub.unsubscribe()
    except Exception as e:
        pass

    async def help_request(msg):
        print(f"Received a message on '{msg.subject} {msg.reply}': {msg.data.decode()}")
        await nc.publish(msg.reply, b'I can help')

    sub = await nc.subscribe("help", "workers", help_request)

    try:
        response = await nc.request("help", b'help me', timeout=0.5)
        print("Received response: {message}".format(
            message=response.data.decode()))
    except TimeoutError:
        print("Request timed out")

    await sub.unsubscribe()

    await nc.drain()

if __name__ == '__main__':
    asyncio.run(main())