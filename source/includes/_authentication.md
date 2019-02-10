# Authentication
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
minutes. By default refresh tokens are valid for 20 minutes. This may be different on each server 
you are interacting with, so be sure to check the time to expiration in the response.</aside>

## initial authentication

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

## refresh

| Parameter     | Required | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| refresh_token | *        | send :refresh_token: from authentication request |

```shell
curl -X POST \
':endpoint:/api/v1/authenticate/refresh/refresh_token=:refresh_token:'
```
