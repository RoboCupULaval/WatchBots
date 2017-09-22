from flask import Flask
from flask_socketio import SocketIO
from tinydb import TinyDB

app = Flask(__name__)
sio = SocketIO(app)
db = TinyDB('db.json', default_table='robots')

app.config.from_object('config.default')
app.config.from_envvar('APP_CONFIG', silent=True)
app.config['SECRET_KEY'] = 'secret!'

from app import views