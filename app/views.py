from flask import render_template, send_from_directory, jsonify
from tinydb import Query

from app import app, sio, db

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/img/<path:path>')
def send_img(path):
    return send_from_directory('static/img', path)

@app.route('/fonts/<path:path>')
def send_fonts(path):
    return send_from_directory('static/fonts', path)

@app.route('/get_robots_list')
def send_robots_list():
    robots_list = db.table('robots').all()
    return jsonify(robots_list)

@sio.on('ping')
def ping(data):
    print('Ping received : ', data)
    sio.emit('ping', data)
