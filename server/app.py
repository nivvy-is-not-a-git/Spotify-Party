from flask import Flask, redirect
from login import login_page
from create import create_page
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import os
from urllib.parse import urlencode
from functions import generate_random_string
import time

app = Flask(__name__)   

load_dotenv()
app.secret_key=os.environ.get("SECRET_KEY")
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5173"])


app.register_blueprint(login_page)
app.register_blueprint(create_page)

@app.get('/')
def congrats():
    return redirect("http://127.0.0.1:5173")
    
# def ensure_refresh_token():
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
