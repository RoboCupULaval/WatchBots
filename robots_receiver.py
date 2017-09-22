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
            robots_list = db.table('robots').all()
            for id in range(6):
                updated_robot = {"info": {"id": id, "name": f"Robot {id}"},
                                 "supply": {"batt": random.random() * 100, "voltage": random.random() * 16, "current": random.random() * 5, "power": random.random()},
                                 "com": {"time_since_last_packet": 2}}

                if any(robot['info']['name'] == updated_robot['info']['name'] for robot in robots_list):
                    sio.emit('robots_update', updated_robot)
                    with transaction(db.table('robots')) as robots:
                        robots.update(updated_robot, where('info').name == updated_robot['info']['name'])
                else:
                    sio.emit('robots_insert', updated_robot)
                    with transaction(db.table('robots')) as robots:
                        robots.insert(updated_robot)

                time.sleep(1)
