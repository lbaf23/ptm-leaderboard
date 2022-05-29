

def publish(client, subject, payload):
    try:
        client.publish(subject=subject, payload=payload)
    except BrokenPipeError:
        while True:
            try:
                print("[nats] reconnect")
                client.reconnect()
                client.publish(subject=subject, payload=payload)
                break
            except:
                pass
