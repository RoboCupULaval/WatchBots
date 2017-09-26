#!flask/bin/python
from gevent import monkey
monkey.patch_all()

from app import app, sio
import webbrowser

from robots_receiver import RobotsReceiver

@app.before_first_request
def start_robots_receiver():
    robots_recv = RobotsReceiver()
    robots_recv.start()

if __name__ == '__main__':
    if not app.config['DEBUG']:
        webbrowser.open("http://localhost:{}".format(app.config['PORT']))

    sio.run(app, port=app.config['PORT'])
