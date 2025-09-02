import string, random, time, requests
from flask import session

def generate_random_string(length):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range (length))

def ensure_not_expired(client_id, client_secret):
    now=int(time.time())
    print ("this is the new time",now)
    if now>=session['expires_at']:
        auth=(client_id, client_secret)
        res = requests.post(
        "https://accounts.spotify.com/api/token",
        data={"grant_type": "refresh_token", "refresh_token": session['refresh_token']}, auth=auth,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=15
    )
    if res.status_code!=200:
        return None
    t = res.json()
    session['access_code']=t['access_code']
    if 'refresh_token' in t:
        session['refresh_token']=t['refresh_token']
    #we subtract 30 for safety sake justin case spotify clocks andour clock is slightly different and just to ensure no gotchas anywhere result in our overall failing because expiry track fails
    session['expires_at']=session['expires_in']+time.time()-30

        
    return session['access_token']
    