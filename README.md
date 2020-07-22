# Setting up Movie Rental API on local machine

This guide is going to cover two ways of installing the API, the first one is installing everything on the local machine, and the second one is using docker.
**Table of content**
1. [Installing on Windows machine](#option-1)
2. [Installing with Docker](#option-2)
3. [Exploring the documentation](#documentation)
# Option 1
**Installing the API on a Windows 10 machine.**
The requirements are:

 1. PostgreSQL 12
 2. NodeJS 14
 3. Redis 3
 
**Installing PostgreSQL**
First of all, install PostgreSQL, in my case I am working with the version 12 for Windowsx86-64 operative system, you can download it from [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
During the installation the program will ask you for a username and a password, in my case the username is **postgres** and the password is **root**.
Once PostgreSQL is installed you have to create a new database, let's see how to create a database in the command line:

**Step 1)** Open the SQL Shell

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eVVltnr5waLmcpCduhAqASMBpnBrJV_c4uUF0cpbRKLEp7j8JBzpxIDhO-7lQqBJ-kOrSFgzVmRSn3GV-ecC_KGkW9VUPxA_UWs4UfkjQuq7Os10XxtAGR3RS0OtiOoRk9NGJfnN5x6mRpmteVK-Zrsw=w985-h461-no)

**Step 2)** Enter the requested information to connect

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3cxLefYXTFlvzi45ZkbFmBSPn0Gnw3wTR1pJ-jgmS0hGrapF9IqclWLz4prqXtOspEcvYK38nXDLw5JleiZ6x256i199iSFV2geuIScnbx34ztmvulQG6X_E7IUj30aBcTRsC2re_R6i3jrwpDFAWqkBQ=w1124-h337-no)

**Step 3)** Enter the command

    CREATE DATABASE movie_rental_dev;

**Step 4)** Enter \l command to get a list of all databases

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3epjix7oOfOCTHGVcI9zP6hvJNyD_lsFszVngsN6-yZr2kksS4YSbhyi0YUwSwD4RA48x7zRlTMl-WSrm5ZZT2coXxGd-ZpRx7eoo56-rIdHI0lTa-13nADquBvNqXMWaVyM-ArPD0aYvcckMjhV1yI9A=w1184-h309-no)

**Installing NodeJS**
Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).
Go to the Node.js [download page](https://nodejs.org/es/download/current/) to get the installer. In my case I am working with the 14.5.0 version which is the lastest at the time of writing this guide. To verify that node.js is installed run the command

    node --version
   And it should print the version
   

    Microsoft Windows [Versión 10.0.18362.959]
    (c) 2019 Microsoft Corporation. Todos los derechos reservados.
    
    C:\Users\carlos>node --version
    v14.5.0

**Installing Redis**
Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.
In this project Redis is being used to store a deny-list of tokens; a token is added to this list when the user calls the logout endpoint.

The 64-bit binary releases are created by building the [Microsoft's native port of redis](https://github.com/msopentech/redis) which have also been published on [NuGet](http://www.nuget.org/packages/redis-64), but as it's more convenient I provide a zip of the 64-bit binaries here.

#### 1. Download the [redis-latest.zip](https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip) native 64bit Windows port of redis

    wget https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip

#### 2. Extract `redis64-latest.zip` in any folder, e.g. in `c:\redis`

#### 3. Run the `redis-server.exe` using the local configuration

    cd c:\redis
    redis-server.exe redis.windows.conf

#### 4. Run `redis-cli.exe` to connect to your redis instance

    cd c:\redis
    redis-cli.exe

#### 5. Start playing with redis :)

    redis 127.0.0.1:6379> SET foo bar
    OK
    redis 127.0.0.1:6379> KEYS *
    1) "foo"
    redis 127.0.0.1:6379> GET foo
    "bar"
    redis 127.0.0.1:6379>

------
With everything in place, now it's time to download the repository, click on the Download button an then extract the .zip file, it is going to create a folder called carlos-moran-master (if the folder is named different, just replace "carlos-moran-master" with the right folder name).

![Image](https://lh3.googleusercontent.com/pw/ACtC-3coaohnPT6gQfisnS95MlVSidhYktHAFkrEHipwAr7xw_JyWyTxv_3VJTD-qZeK8LWPYFmgubcWEmVoGy2-_ToLcS8FpDGTMuzNHKQ7jFJefo4lLspm1LZFGvQYxS1poEXG9KZ4yWgtkdL2wWrP_1DLZQ=w988-h473-no)

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eqk3UKWwgAr-d83fvKCFWWprT8wqzCyXAZEcQVo7JD4kCJ0HMjpsS-n0mr8PE0jlWNO-Hq9P0T8AiZ4Q28tU-n_zOAZz2X5X2nPa6apIjrhQpPHumeO_xofNfO_v-cTu4F13i30SZMzkoQDZCaewKHVw=w181-h213-no)


Now open the CMD and navigate to that folder, in my case it would be:

    cd Downloads
    cd carlos-moran-master

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3cEF3SaMWGnLM_BwD4FyKVQX1v9CEo6A4SWAeixIMIU9TsRJkjk3s0tW22Fnf9M02uRFUNbNhGuhTdItyrbpEzhtNfZWZEK8xLY9Raf5y7OjmqT0sttnkQp-SN6OBDIiUb2kBCyWHMU4_xIQwiTWFHJRw=w516-h329-no)

Now it's time to install the node.js dependencies. For doing that run the command

    npm install
Now that all the dependencies are installed it is time to migrate (creating the database tables) and populate the database with default data (seed the database). Before doing that it is important to know that the database configuration is being store on the config/config.json file. So if you have a different username or password, you can make the changes here,
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eVRLwUGHyACZ3Tk8zsbOw-L8AA-FPjnzaMUukws6PCCDCD8O5R2Z3bVZjSsKx-0kc3j6huVyFMhT8LlhvGgUv8Zyo7XBSU-yiWJiReDXl-h1pUiWkS_BwvLIc6LhhgF4hFBXLrgJIvqiAFvQP6J-mXkA=w1148-h563-no)
To migrate run the command

    npx sequelize-cli db:migrate
  By default it is going to use the development configuration.
  The output of your console will look something like this:
  ![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3dLrmUCow7q_OH0OPuAlTLXn6n2-BA8MQlqXI17bXB4G4QhwfKdfjGv5kwIFMBbI09sNwVZu8TBRRoD0yZMbm23ArZ-G-ZsFu4K-z50krlXj3ACOuAA6cP5i-GU7cW3rEzN2BZ9oQB2WmO5loJFwxa3tw=w1092-h646-no)

Now it is time to seed the database. This will create a default Admin user with the email carlosmoran.97cr@gmail.com and "admin" password.
Run the command:

    npx sequelize-cli db:seed:all
 
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3cAiNClkK5MgHi_Z88Y2nsalYyZi6Tcjrk6zvCLZoQ_43B2uJUvg8QR7DC4RNEX_ZPOWL5YFIO2zqr2VYOHa8Eoxgx7O_LaxEWfMSVOHivsn-xhRJct9O2kLzhCm116b9i6eFy5xGH3o8ecUF1vEGrF7g=w725-h245-no)

The last step before running the API is creating a .env file in the repository folder:

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3fJoRahsrCFtNkeoWchL_13T9WNP2bmEwX4u2MGotc2q3ebw-sdozmmArAJKhDfVTOUhheq9MnCVWvlGCyp__hgXQQ4_jbXtesqUDT5WTQIYkcv804jOQTocJ4FbKLaYt-K6936JFuaDUAUpGAkKa79OA=w321-h334-no)

This file will contain some enviroment variables that the application needs to work. Open the file in your favorite IDE (in my case I am using Visual Studio Code), and paste the folowing content:

**WARNING: I know that is not recommended to paste secret keys here. I am using Cloudinary service to store images, and sendgrid to send emails but because this is a testing application I am pasting my secret key so you don't have to create a cloudinary account. But if you want to create an account feel free to do that, just paste the right keys in this file.** 

    DB_URI=postgres://postgres:root@localhost:5432/movie_rental_dev
    SECRET=MyjdEtubwbrXZ9dv8P469dIxUfjch4gyixJTg9W4
    TOKEN_EXPIRES_IN=30 days
    NO_IMAGE_URL=https://res.cloudinary.com/djeytlsy3/image/upload/v1595051229/no-image_x8bbzb.jpg
    CLOUDINARY_CLOUD_NAME=djeytlsy3
    CLOUDINARY_API_KEY=314341952938143
    CLOUDINARY_API_SECRET=7f3X2G5g7_ivnF82gvxkID90YTg
    RENTAL_TIME=2
    RENTAL_TIME_UNIT=days
    MONETARY_PENALTY_PER_DAY=0.5
    REDIS_URL=redis://localhost:6379
    SEND_GRID_API_KEY=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
    SENDER_EMAIL=carlosmoran.97cr@gmail.com
    TOKEN_HOURS_TO_LIVE=24


**NOTE: The first variable is the connection string for PostgreSQL, if you have a different username, password or database change it there, with the format postgresql://username:password@hostame:port/database**

And the file should look like this
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3cfydjAPKilsTnmdHqbXwJIvtueFTO3vQegLzOykdIBnE771lhrHGLdyg9c47VpA1rM_r3FPBPHcVIiBf96Pj9JBHV8MQWo3tVQ8RwOT9t2-WBqEPxDbUNgnRuFVJGn3_B8PzRQRlJuGZ_HCSZQIofDhQ=w1395-h969-no)

With all of that in place now the last step is running the application, for doing that run the command

    npm start
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3fKgjbFzykG2jjUndavqFD-_Sf131FDuVbycKy7tNUcDvdS1iUQEN-Nb2rcHb3yiwVVa4CgZphVzJJS0DJKnWlrC0vxo6Mq7YTkoRLjZ3QL5UtSF2ljCeSZyXtv0bwlRg-0hWhaFoSdz0xCS5PBlBru3w=w894-h268-no)
And if you see those success messages that means that everything is working as expected. You can try the API by login in with the default admin user. Just  make a POST request to the /api/v1/login endpoint with de default credentials. Just set a raw JSON body with the credentials:

    {
		"email":  "carlosmoran.97cr@gmail.com",
		"password":  "admin"
    }
And the API should return a JSON Web Token like the one in the screenshot
![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3ei32ZdLt0IQd6fApgyfuBTvdJSH4smhMnwgUTV5DfHoZidCYIJhDEORp63AXnpNyIFlYziZZOrYAdqEFwera_ptXY0CsqfNeQ1r7CoJTuOW8KNYK5zVUJf2JPXLJCIMBx_Be1xA3Z862BPR5CazZFm9Q=w811-h736-no)

That's all for this installation guide. If you found any trouble please contact me at the next email: carlosmoran.97cr@gmail.com and I will be glad to help you.

# Option 2
You can install a production deploy with Docker. First of all download or clone this repository, an then create a .env.prod file with the following content:

**WARNING: I know that is not recommended to paste secret keys here. I am using Cloudinary service to store images, and sendgrid to send emails but because this is a testing application I am pasting my secret key so you don't have to create a cloudinary account. But if you want to create an account feel free to do that, just paste the right keys in this file.** 

    DB_URI=postgres://postgres:root@postgres:5432/movie_rental_prod
    SECRET=MyjdEtubwbrXZ9dv8P469dIxUfjch4gyixJTg9W4
    TOKEN_EXPIRES_IN=30 days
    NO_IMAGE_URL=https://res.cloudinary.com/djeytlsy3/image/upload/v1595051229/no-image_x8bbzb.jpg
    CLOUDINARY_CLOUD_NAME=djeytlsy3
    CLOUDINARY_API_KEY=314341952938143
    CLOUDINARY_API_SECRET=7f3X2G5g7_ivnF82gvxkID90YTg
    RENTAL_TIME=2
    RENTAL_TIME_UNIT=days
    MONETARY_PENALTY_PER_DAY=0.5
    REDIS_URL=redis://redis:6379
    SEND_GRID_API_KEY=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
    SENDER_EMAIL=carlosmoran.97cr@gmail.com
    TOKEN_HOURS_TO_LIVE=24

**NOTE: The first variable is the connection string for PostgreSQL, if you have a different username, password or database change it there, with the format postgresql://username:password@hostame:port/database**

Now open the terminal or the command line and navigate to the project folder and type the next command:

    docker-compose up -d

After docker finish building the containers type the next commando to see if the containers are running.

    docker ps

And the output should be something like this:

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    133c1eb212c1        movie-rental_web    "node app.js"            3 hours ago         Up 3 hours          0.0.0.0:80->80/tcp       api
    639ab1e37552        postgres            "docker-entrypoint.s…"   4 hours ago         Up 4 hours          0.0.0.0:5432->5432/tcp   postgres
    b1654ad31132        redis:alpine        "docker-entrypoint.s…"   4 hours ago         Up 4 hours          0.0.0.0:6379->6379/tcp   redis

The containers are up and running, the last thing that we have to do is migrating and seeding the databse, first we need to enter to the api container environment, to do that type the next command:

    docker exec -ti api bash

And you will see that the prompt has changed (of course the container id will be different):

    root@133c1eb212c1:/usr/src/app#

For migrating type the next command:

    npx sequelize-cli db:migrate --env production

For seeding the database type:

    npx sequelize-cli db:seed:all --env production

Finally to exit of the container environment type:

    exit

# Documentation

You can visit the online and interactive documentation of the api [Here](https://applaudo-movie-rental-v1.herokuapp.com/)

For generating a token you can use the next admin credentials:

    email: carlosmoran.97cr@gmail.com
    password: admin

For generating normal user token the credentials are:

    email: user@example.com
    password: user

I didn't paste tokens here because they have a limited time to live.
