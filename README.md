
# Nginx Proxy_Pass Host Header Test

This Docker setup demonstrates the default behavior of nginx's `proxy_pass` directive regarding the Host header.

## Setup & Running

1. Clone this repo

2. Run it
```bash
docker-compose up --build
```

3. Open your browser and go to: http://localhost:8080

## Test Routes

- **http://localhost:8080/with-variable** - Uses `proxy_pass $backend_url`
  
- **http://localhost:8080/without-variable** - Uses `proxy_pass http://backend:3000`  
  
- **http://localhost:8080/with-upstream** - Uses `proxy_pass http://backend_upstream`

## What to Look For

1. The **Host** header (highlighted in yellow) will be different for each route
2. The **X-Nginx-Route** header shows which nginx location was used
3. The **X-Original-Host** header shows what nginx put in its $host variable
4. The **X-Original-Http-Host** header shows what nginx originally received in the Host header from the web request

## Observed Results

- **Variable in proxy_pass**: Sets Host header to the proxy target's hostname and port
- **Hardcoded URL**: Sets Host header to the proxy target's hostname and port
- **Upstream name**: Sets Host header to the upstream block name

In all cases, the default behavior aligns with [nginx's documented behavior](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/#passing-request-headers):

> "By default, NGINX modifies two header fields in proxied requests, “Host” and “Connection”, 
> and eliminates the header fields whose values are empty strings. “Host” is set to the value 
> of the $proxy_host variable, and “Connection” is set to close.

