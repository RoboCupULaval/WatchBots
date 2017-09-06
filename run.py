#!flask/bin/python
from app import app
import webbrowser

if __name__ == '__main__':
    if not app.config['DEBUG']:
        webbrowser.open('http://localhost:5000')
    app.run()
