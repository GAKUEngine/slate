Authentication
==============
Authentication (issuance of auth tokens) is done against the /authenticate endpoint. 
To authenticate, send *username* and *password* arguments in a query against this endpoint. 
Successful authentication will return a set of tokens, an *auth_token* which is used to perform 
queries and a *refresh_token* which can be used to obtain a new set of auth and refresh tokens. 
By periodically obtaining a new set of tokens with the refresh token, you can maintain a "session" 
indefinitely. If you do not redeem the refresh token it will expire after a set period of time, 
and the user will have to re-authenticate in order to start interacting with the API again. 
  
Keep in mind tokens are not encrypted by themselves - without encryption on the connection 
such as SSL/HTTPS the tokens will be susceptable to sniffing.

<aside class="warning">Auth token must be refreshed. By default, auth tokens expire after 3 
minutes. By default refresh tokens are valid for 5 minutes. This may be different on each server 
you are interacting with, so be sure to check the time to expiration in the response.</aside>

After obtaining the tokens you must put the auth_token in your HTTP(S) headers under the 
"Authorization" attribute (EG: "Authorization: abcdefg...XYZ"). Keep in mind you can make 
asynchronous token refreshes without worrying about a refresh request being sent before a 
request returns as long as you stagger your refreshes in such a way as newly refreshed tokens 
are obtained before the old ones expire.

<aside class="notice">A refresh request does not invalidate the previous token. All auth tokens 
are only expired by timeout, and there is no way to immediately revoke a token (by design, as per 
the JWT specification which GAKU auth is based off of).</aside>

The minimum amount of time any auth_token will be valid is 2 minutes, and the minimum a 
refresh_token will be valid is 3 minutes. We recommend you refresh your tokens about one minute 
before your auth_token expires. This way you can safely maintain a connection without having any 
more than 2 valid auth tokens active at the same time.

Initial Authentication
----------------------

| Parameter | Required | Description                      |
| --------- | -------- | -------------------------------- |
| username  | *        | username for authentication      |
| password  | *        | user password for uathentication |

```shell
curl -X POST \
':endpoint:/api/v1/authenticate?username=:username:&password=:password:'
```

```json
# request
{
  "username": ':username:',
  "password": ':password:'
}

# successful response (user authentication succeeded)
{
  "tokens": {
    "auth_token": "... a very long base64 string ...",
    "refresh_token": "... a very long base64 string ..."
  }
}

# failed response (user authentication failed)
{
  "error": {
    "user_authentication": ["invalid credentials"]
  }
}
```

```ruby
require 'manabu'
client = Manabu::Client.new('admin', '123456', ':endpoint:', 9000,
  force_secure_connection: true
)
```

```cpp
#include "manabu.h" 
```

Token Refresh
-------------

| Header Attribute | Required | Description                                   |
| ---------------- | -------- | --------------------------------------------- |
| Authorizaiton    | *        | The value of a current valid auth_token       |

| Parameter     | Required | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| refresh_token | *        | send :refresh_token: from authentication request |

```shell
curl -X POST \
':endpoint:/api/v1/authenticate/refresh/refresh_token=:refresh_token:'
```

```JSON
# request *NOTE!: You can not refresh with only JSON data, you *MUST* pass your the 
#  accompanying auth_token in your request headers!
{
  "refresh_token": "... a very long base64 string ..."
}

# successful response (user authentication refresh succeeded)
{
  "tokens": {
    "auth_token": "... a very long base64 string ...",
    "refresh_token": "... a very long base64 string ..."
  }
}

# failed response (refresh token invalid or not accompanied by the auth token
#  in the request header)
{
  "error": {
    "user_authentication": ["invalid or expired refresh token"]
  }
}
```

Refresh Token Invalidation ("Closing" a session)
------------------------------------------------
Refresh tokens are invalidated once used, so each time you refresh you also need 
to store the new refresh token if you intend to refresh the session. *However*, 
refresh tokens are invalidated even if the refresh request is invalidated. 
Specifically, refresh requests require the auth token be passed in the request 
header like all other authorized requests, and the auth token is matched with the 
corresponding refresh token - so, *if the auth token is not in the request header, 
or the token in the request header is invalid; the refresh token will still be 
invalidated despite the refresh request failing*. Because of this, you can 
effectively "close out" a session by intentionally sending a refresh request 
with the refresh token and without an auth token in the headers or with an 
invalid auth token in the headers - making further refreshes impossible and 
requiring a new set of tokens be issued with a new authorization request.
