from flask import render_template, send_from_directory, jsonify

from app import app, sio

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
    robots_list = [
        {'info': {'id': 0, 'name': 'Robot 0'}, 'supply': {'batt': 22, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 2}},
        {'info': {'id': 1, 'name': 'Robot 1'}, 'supply': {'batt': 45, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 10}},
        {'info': {'id': 2, 'name': 'Robot 2'}, 'supply': {'batt': 13, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 22}},
        {'info': {'id': 3, 'name': 'Robot 3'}, 'supply': {'batt': 98, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 1}},
        {'info': {'id': 4, 'name': 'Robot 4'}, 'supply': {'batt': 56, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 0.1}},
        {'info': {'id': 5, 'name': 'Robot 5'}, 'supply': {'batt': 72, 'voltage': 15.6, 'current': 1.3, 'power': 20.28},
         'com': {'time_since_last_packet': 5}}
    ]
    return jsonify(robots_list)

@sio.on('ping')
def ping(sid, data):
    print('Ping received : ', sid, data)
    sio.emit('ping', data, room=sid)
