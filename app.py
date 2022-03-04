from flask import Flask, render_template, request
from utils import utils

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/search")
def search():
    return render_template("search.html")

@app.route("/publish")
def publish():
    return render_template("publish.html")

@app.errorhandler(404)
def not_found_error(error):
    return render_template("error.html", error_num=404), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template("error.html", error_num=500), 500

if __name__ == "__main__":
    app.run(debug=True)
