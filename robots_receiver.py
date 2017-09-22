from app import sio, db

import threading
import time
import random


class RobotsReceiver:

    def __init__(self):
        self._thread = threading.Thread(target=self._receive_packet, daemon=True)

    def start(self):
        self._thread.start()

    def _receive_packet(self):
        while True:
            sio.emit('robots_update', {"info": {"id": 0, "name": "Robot 0"}, "supply": {"batt": random.random() * 100, "voltage": random.random() * 16, "current": random.random() * 5, "power": random.random()}, "com": {"time_since_last_packet": 2}})
            time.sleep(5)
