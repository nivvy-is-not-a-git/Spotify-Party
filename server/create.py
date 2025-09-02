from flask import Flask, request, session, jsonify, redirect, Blueprint
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import os
from urllib.parse import urlencode
from functions import generate_random_string, ensure_not_expired
import time

load_dotenv()

client_id=os.environ.get('SPOTIFY_CLIENT_ID')
client_secret=os.environ.get('SPOTIFY_CLIENT_SECRET')
redirect_uri=os.environ.get('SPOTIFY_REDIRECT_URI')


create_page = Blueprint ('create_page', __name__, url_prefix="/api")


def _bearer():
    token = session.get("access_token")
    if not token:
        # In a real app, raise/return 401
        raise RuntimeError("Missing access_token in session")
    return {"Authorization": f"Bearer {token}"}

def _spotify_get(url):
    r = requests.get(url, headers=_bearer(), timeout=20)
    if r.status_code == 401:
        # token expired etc. — handle refresh or return 401
        return None, 401
    return r.json(), r.status_code

@create_page.get("/test")
def test():
    return session['test']
    
@create_page.get("/me")
def me():
    data, status = _spotify_get("https://api.spotify.com/v1/me")
    if status != 200:
        return jsonify({"error": "spotify_me_failed"}), status
    # Return only what you need (id + display_name)
    return jsonify({"id": data.get("id"), "display_name": data.get("display_name")})

@create_page.get("/playlists")
def playlists():
    data, status = _spotify_get("https://api.spotify.com/v1/me/playlists")
    if status != 200:
        return jsonify({"error": "spotify_playlists_failed"}), status
    #the second [] in .getjust ensures that if items is empty, it uses [] so it doesn't crash
    # playlist_names = [pl["name"] for pl in data.get("items", [])]
    # playlist_ids= [pl["id"] for pl in data.get("items", [])]
    return jsonify(data)

