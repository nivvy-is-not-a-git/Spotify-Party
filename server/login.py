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


login_page = Blueprint ('login_page', __name__, url_prefix="/api")


@login_page.get("/login")
def login():
    #state is used for security. generates a string that when user meets login page and sents information, the request will come back with the string that will then be verified by us to make sure that it is the "same" person logging in
    state = generate_random_string(16)
    session['oauth_state'] = state
    scope = 'user-read-private user-read-email'
    params = {
        'client_id': client_id,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': redirect_uri,
        'state': state
    }
    query_string= urlencode(params)
    url='https://accounts.spotify.com/authorize?'+ query_string
    return redirect(url, code=302)

@login_page.get("/callback")
def callback():
    #returned_state is the state returned after coming back from the login page. we are gonna check returned_state against stored_state to make sure they are the same. if they aren't that means someone tried to tamper.
    returned_state=request.args.get('state')
    stored_state=session.get("oauth_state")
    code=request.args.get('code')
    print("COOKIE HEADER:", request.headers.get("Cookie"))
    print("RETURNED:", request.args.get("state"))
    print("STORED:", session.get("oauth_state"))


    if returned_state!=stored_state:
        returned_state=None
        return redirect("/#"+urlencode({'error': 'state_mismatch'}))  
    if not code:
        return redirect("/#"+urlencode({'error': 'missing_code'}))  
    else:
        #the client_id:client_secret header has to be encoded into byte and theninto base 64 via spotify api instructions. auth={} does that automatically for us
        data={
            'code': code,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
        headers={
            'content-type': 'application/x-www-form-urlencoded'
        }
        #thankfully dont have to manually convert to base64, it is handled by library when i do auth= line below.
        auth=(client_id, client_secret)
        #exchanging authorization keys for access tokens so i can access user spotify data
        response=requests.post('https://accounts.spotify.com/api/token', data=data, auth=auth, headers=headers)
        token = response.json()
        session['access_token']=token.get('access_token')
        session['token_type']=token.get('token_type')
        session['scope']=token.get('scope')
        session['expires_in']=token.get('expires_in')
        session['expires_at']=session['expires_in']+time.time()
        session['refresh_token']=token.get('refresh_token')
        session['test']='is this thing on?'
        print (session['refresh_token'], session['expires_in'])
        return redirect('/')

def congrats():
    return redirect ()
    
# def ensure_refresh_token():

