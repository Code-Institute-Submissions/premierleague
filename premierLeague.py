from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'premierLeague'
COLLECTION_NAME = 'projects'


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/premierleague/data")
def premierleague_data():

    FIELDS = {
        '_id': False,
        'team': True,
        'played': True,
        'won': True,
        'drawn': True,
        'lost': True,
        'goals_for': True,
        'goals_against': True,
        'goal_difference': True,
        'points': True,
        'position': True,
        'year': True
    }

    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS)
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run(debug=True)
