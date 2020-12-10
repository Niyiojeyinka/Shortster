# Shortster

<p>A fullstack link shortner web application based on MERN Stack</p>
<br>
<a href="#backend">Backend</a><br>
<a href="#api">API Docs</a>

<a href="#frontend">Frontend</a>

<br>
<br>
<div id="backend">
This backend uses MYSQL Database.
to run this api,
<ul>
<li>Clone this repo<li><br>
<li>navigate to the backend sub directory <code>cd backend</code><li><br>
<li>install dependencies by running <code>npm install</code><li><br>
<li>Get Mysql Database Ready,and navigate to <code>backend/config/config.json < development ></code>
to change the <code>username</code> <code>password</code> <code>database</code> <code>host</code> to your 
mysql Credentials.
if you will be running the test also,you edit the test key for testdatabase also.
Run tests with <code>npm test</code>
<li><br>
<li>Next step is to start the server by running <code>npm start</code><li><br>
</ul>

</div>

<br>
<div id="api">
  <b>Documentation<b><br>

### Shorten URL

<code><b>POST</b> api/urls/{customShortCode}</code><br>
<small>params : customShortCode--optional</small><br>

```json
{
  "url": "https://milo.com/ur2h"
}
//request body json
```

<small>body : json</small><br>

    ```json

{
"name": "Shortened",
"host": "http://localhost:9100",
"message": "code shortened successfuly.",
"data": {
"shortcode": "good"
}
}
//successful shortening

    ```

<code><small>Response Status : 201 created</small></code>
<br><br>

</div>

<br>
<div id="frontend">

</div>
