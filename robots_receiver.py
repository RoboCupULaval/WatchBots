from app import sio, db
from tinydb import where
from tinyrecord import transaction
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
            id = random.randrange(0, 6)
            updated_robot = {"info": {"id": id, "name": f"Robot {id}"},
                             "supply": {"batt": random.random() * 100, "voltage": random.random() * 16, "current": random.random() * 5, "power": random.random()},
                             "com": {"time_since_last_packet": 2}}
            sio.emit('robots_update', updated_robot)
            with transaction(db.table('robots')) as robots:
                robots.update(updated_robot, where('info').name == updated_robot['info']['name'])

            time.sleep(1)
