# main.py

import asyncio
import signal
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from classes.server import WebsocketServer

async def run():
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    #loop.add_signal_handler(signal.CTRL_BREAK_EVENT, stop.set_result, None)

    server = WebsocketServer("localhost", 8765) #0.0.0.0 on Fabien's server
    await server.run(stop)

if __name__ == "__main__":
    asyncio.run(run())