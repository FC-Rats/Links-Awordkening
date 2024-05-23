import asyncio
import signal

from classes.server import WebsocketServer

async def run():
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    #loop.add_signal_handler(signal.CTRL_BREAK_EVENT, stop.set_result, None)

    server = WebsocketServer("localhost", 8765)
    await server.run(stop)

if __name__ == "__main__":
    asyncio.run(run())