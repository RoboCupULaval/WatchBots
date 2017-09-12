#!flask/bin/python
from app import app, sio
import socketio
import eventlet.wsgi
import webbrowser

if __name__ == '__main__':
    if not app.config['DEBUG']:
        webbrowser.open('http://localhost:5000')
    app = socketio.Middleware(sio, app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
