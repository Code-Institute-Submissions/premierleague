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

@app.route("/teams/manchesterunited")
def manchesterunited():
    return render_template("manchesterunited.html")

@app.route("/teams/manchestercity")
def manchestercity():
    return render_template("manchestercity.html")

@app.route("/teams/chelsea")
def chelsea():
    return render_template("chelsea.html")

@app.route("/teams/arsenal")
def arsenal():
    return render_template("arsenal.html")

@app.route("/teams/tottenhamhotspur")
def spurs():
    return render_template("tottenhamhotspur.html")

@app.route("/teams/liverpool")
def liverpool():
    return render_template("liverpool.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/premierleague/team/<teamname>')
@app.route("/premierleague/data")
def premierleague_data(teamname=None):

    if teamname:
        filter = {"team": teamname}
    else:
        filter = {}

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
        projects = collection.find(filter, projection=FIELDS)
        return json.dumps(list(projects))



if __name__ == '__main__':
    app.run(debug=True)
