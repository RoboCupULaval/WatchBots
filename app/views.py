from flask import render_template, send_from_directory

from app import app

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
