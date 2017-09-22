#!flask/bin/python
from app import app, sio
import webbrowser
import eventlet

from robots_receiver import RobotsReceiver

eventlet.monkey_patch()

if __name__ == '__main__':
    robots_recv = RobotsReceiver()
    robots_recv.start()

    if not app.config['DEBUG']:
        webbrowser.open('http://localhost:5000')

    sio.run(app)
