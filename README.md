

# Setting up Movie Rental API on local machine

This guide is going to cover two ways of installing the API, the first one is installing everything on the local machine, and the second one is using docker.

## Option 1
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
![enter image description here](https://lh3.googleusercontent.com/0fpMXfMIdBgQbVCALtNHsGUq7hwnSb2bVmTcbe2tS9GJGeIJHhAL06YYJJyMVb-A-MrW64o4sBmQfJP26obRUqBe85ans6dqGbHdFxvSIyvJ8o5-H68-drQB9_SMQxKrYWsCga84pQR0iXY3cVQULSQhBjR203CMheb-lBLrcuwskplMGKvqmTVVcDp_3rJpyCLhfxDh1ab8Nl2P_U0WYVhkzt1Mm0or9aa1kASHN2zBKquXH3AaM-VTQIO0xuHHdQ9fd3KS_HBeEnBi2WRKNw_wcmaMw0ye8k5C-Ef7V4hZwu838AgRInNDAGzEHjL3Jejek5eJb6pY_vuWVv4hRL8to9kEb0eWojH5lvQsJKLirwXPvmuenH_Vnb463_hNfKFr3PRLuVIMQYmYhRNEd84cMBE4FeTyTqukvbKdY7cqrlZL7etEQ45dVzVKvql6qjMeYMZPrBtEkQJa6oatZlYUVyRxOjf3Wi4M7nCQuJ1Sj5iRyF_KdGSUg3CzFzpUIFVMqc8UjVhepNYtJZ18u0R4H8rxWXnBOsmOlUQ9CyGaqOLjUCahRXw_XBNCe-9UmZiIYUEbfpQc4m0aSCMXr0nY23_GqE6lkugb3XyF1e6NhOCZWI5MI4quMelnoEMLrmmbzTmDBw7yI3KTnNMl8ysup97G0H4_SUrUer3lQqAEOtesuhAV_edpKoygkT8=w985-h461-no?authuser=0)
**Step 2)** Enter the requested information to connect
![enter image description here](https://lh3.googleusercontent.com/qD_E7lZpERIJVD4ryvXyPUyb3aK0nCwXxf254KenCPR4non2e7ReBPLnMSJmcVOlRknOY_X63d9fnWdd021scAYxOmL_Tls6-MJr0VQ0_me9IJkk3T8e5v8_3cqurjggQOBl1Uw-_BHKlPksnJGA9ugO-N48njSyAm8kAv2VibJ8relkeQId5BiumaxpsuUHYstZfGoRRBYQeWXrK4tSlcXdM1a2rU4qIYYkCLoz71Yc2vLtNxfj9ooRpfo5jLkdZdOhW316x6SmqFKt9MsMReBCrCzGzGpjmxBXTgzOytNYUJx6Ikd6n7FW5ecQFj8mQ0NHwL72ntanR2Th0ZBZmsp1r_i0Aq60LUk76fktvn6Ef5hF_fnAhSF_xuS9CQQu_nqXqktfdTNzdE9f47WijAPgDxvtLtpkTXzZkKFgxj0uQXI00curi80qSCOdq_DLZ6GhOCFli8PXTrClyvIEREcIY6VCcgB-twsVIamDyzJDqUnlEztc12v49f8JZGMgjHQ3GunKZCtq2IkzbAxdNyXHTRn7j1pL6n_ChN-9u1zki_ezG_1LiTG6P-eCUqbteiOPINBf9RNFG0GDIdAkCXlu_Eh9n6TUgDcXUulptapsxnYJI515e6yhEjpr21KbZkoFoUUqCQUmD3f6azktiEqTSZL7hUqsjZCZQtEX6-aN1TX-f1nrlvOFYPDspkU=w1124-h337-no?authuser=0)
**Step 3)** Enter the command

    CREATE DATABASE movie_rental_dev;
**Step 4)** Enter \l command to get a list of all databases
![enter image description here](https://lh3.googleusercontent.com/rWcfUMfcLELlFR33P1118_hqYJdrDUpC0eicTfeTPp65TZk7Z447k0Abui6xdqcD1aUAn4PZ6rgEIROkYt-OZvbnVbAssnwynjYSIvTSJPXj_o2BI9FDKyaiMFV2hcqnQdNYt-AnaNSqkjXFh2lh1hq9i0Hf4XvlUnYblJ6cFycSVjmC-v_IakLbSrSlVTrYGSKx61L-NOZIVnJ9a2KnQQVgkrHCAeehYdP3YqLvuCOieQSlwGAIdhR-FuAuXMcO9RrypxcG5jWkXRY5zI-t8LwkwC09hNH4J7SagMUiDXE30CQ3dyE6UzYWiJ9dppPvwQhsiKJZxm8oUs2w5fTOeXgI5uBm6IESEFoVMImO0lM7UcjDF9mJtq4D3MrXIR2As5f8B2PA4Z0CppS4g3YClWON408lPzKqCz_HYb4obBvuEGE0FylX1GfJSHO-F2rjgWCYl3KKUq-E7gqa-jXgKyI8BBI5yTAaVQxYa3sILhldgZeLbtZ3r0rXAMg9M_y9f40uC_ybXbiVc0RxTvqphKyCi8nhDwoe9W9SFdxmSODwMDOMEhca9fOeAYAuNrAf792OSdzm3tep5vRq6nwsajKzG8YHPQfAEAS4nmL5vyqKMnVYdLjt61rNscoMkKlRUyrEme1Cpp-x3dnEcPR4WnHte9VtBekDBiryeM-n9tcdENcKGfoOZSuW-hJTbJo=w1184-h309-no?authuser=0)

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
With everything in place, now it's time to download the repository, click on the Download button an then extract the .zip file, it is going to create a folder called carlos-moran-master (if the folder is named different, just replace "carlos-moran-master" with the right folder name), now open the CMD and navigate to that folder, in my case it would be:

![enter image description here](https://lh3.googleusercontent.com/CDi644TnvcrTbErosPEdau6Qo-gw6IsLxxXuRLmqYYZy4nFXPUyHON2BYlhgL-XpByiZMw_4tvKvvjMmLIbjI3kTteuwdtUcx7-IHAV1m_CYaEq_iZcNq9yUIvQRfjUpKV-Ha0z0MRpo506qytsCnT5U1ZQO6ad-LToqiXcAlrHIsbotWvkG3nkBhe8E52RYZwKm2-9spGg9B4TvVYURca_KetPPPeRR4ZvkDXtEz4TMAJmkBN473UCB5HKePrInqi4M257oiL-4SFoQoSamFv3V-4gx_WHEmpJceXavA9bTYbu_kyyZJOPlX92QLDJ8lSTvh9kcK0PWYmvA9_jwL7z8EIJymxL2kFpS0utBZevPDZtES5KBlw2R5nPHVPP_0clq2SPlC0d7Z4YcUSdQC1a9uZByGuyXOisFeTSXkVUdZMPZEwMVmapS4v2UWgurEJLFVrJGJMnHNlUoe90-zpJA3qFcMLKvIqZIWZWGpICSkNxK_scclvubGtCo9Ia5d6k-VvAAbuZaDv0g0eUA82E-f_6KukLSKhaO71fzeJIZJ8IydtPGkwYyalwQHpO4hFvgOx1Ig4RqBAhQEoJHqFmeShgLHRrVtUk6xwYv2Lh8Am2RMIBm3-BW2wiL56ta_ydf7ifCsf19ZXjliwg2JFDFDhXIhS0c5qHPX9L9wQBp-yOf_uAy1wse0gp-ots=w181-h213-no?authuser=0)
   
    cd Downloads
    cd carlos-moran-master
   ![enter image description here](https://lh3.googleusercontent.com/iGqpCYw0IMkSJjtiR32gGytNH0BUcFRguI6PGp65bO9dTAw-Kib6iRcG8PcUpWy1q4IfjJd9yXUwg1w8pyOiaNjO1yWqYC9JAVxxpUQnrS40ktXhW7TEMnLZWAoSuiGCxBBhaqgv_LkOCWOr02yI37OTbZWYvYH6ICKTy4G6t43YWBvxCx35y2gURwGqkPJPiMvRFQTSqh7Jfs5S4Y3VmM-_ngSbVjkuzkhPK3OB9KRjO8WJrO6t01vatYQbO8LhB6ABBe-3c41JpQ-C_si8m_LuTCSwREInVtBuxEFe1uc5EvZnSGQbjXf2gXYc_Vfo18k4uwK_gVBRqIyPoVXhBJNflgQqR_Y8arihs0_HgvE7B0f3oMQob-ZNsj2By2UeOMTrEIlWoJ7l8YuwmuZkz4UBdajAt19K5YvJiSR_9oEojy3TChEwBvhavHXhWVfQulcWJva8wsJaD6OkEEN6-tI-xOronWASUUCKmFwvAXlnbfYjt-952amRM860gM2JPXvefsiKSC2QLeidw6GTW1mfsNIFSTxIz8BRTGCdKPi9bh3z1jvQhur-JRpaGSqXJJDa76DTPkEBvKY6ZvfYj9nB4XDN8cvifLAEyIzQwPk_46Q1g-dSHuTYAQqthhr8ZtfcLvhID-kgRl4R5NioSvvBwvQ1MlgCwXgdWND5COLtuqRVW9DGJsBYGOuz_Gk=w499-h318-no?authuser=0)
Now it's time to install the node.js dependencies. For doing that run the command

    npm install
Now that all the dependencies are installed it is time to migrate (creating the database tables) and populate the database with default data (seed the database). Before doing that it is important to now that the database configuration is being store on the config/config.json file. So if you have a different username or password, you can make the changes here,
![enter image description here](https://lh3.googleusercontent.com/P2eTtEYGwZUwQs1zI2CKQY4xXw8PhznIhfHmxjT5IvNcmR1uy7W0_ogtmH5lkTWXnCmmwcB-mGsuSHTc1NTkzdFIb3kebVh5Y8pGlw_7wGEzM5_qUn9EsArZFtp33EEiT9ImYXAckNweCqubUz1N3WDg_zIrLmA5jWPL4Q4NsuW0g16qemfEiQI2m8ad7wdsgu27xc4WC1--sMCDTbqT0NQqLYQ8xt6dqNp-KWu1ulnjvdmw8mIBcmMP4zLl5iBUn0iUYbKxj5LW-gvJbEQklnjFHW6t6tAkB_o7f-H_vDxmyO0jorlJVOxAt8fk3J6VUgL2TBxcPHO0bN4fBSK2b1-CsQv-XAwct2KDmzzo-4PY48J1jZUIAvD8npIkW6_m5fHXFMFuvDxeRzd4tiJPU5PZQn75fBzZCXONZ_kmk7S75qQV1FpRX8Dmhpd12le9iVaWs6wgXOO0l1bDRERjfIhLlDF-N0IddCrugrmWCNjCB4bZfMpQU_E3Ku7au7fWFhmFO8ENCD0V5n3o1mNnJ9RgSOqeg1GAuUJtFg2eeFBmjFSYjOv3hdUFJRexW7Zhx_S5QxsWwYIdHUqjUc1u7yygBUpspt1Dh0NE8_x6K0iC7EsGftaydVtAbXgRnMQiTfSQN0ethlYxpMD2mlHnUaOg_NX0dAssSVhM_p-B1FicHQvc76MJYMIRyT_PKyQ=w1148-h563-no?authuser=0)
To migrate run the command

    npx sequelize-cli db:migrate
  By default it is going to use the development configuration.
  The output of your console will look something like this:
  ![enter image description here](https://lh3.googleusercontent.com/bntfMAOOdo4HOIvEPKbEJ1JZ9ZRTF4qLraS1xRzyWCSzvS5DUAvlZD4mI5xeAX6UmC5s0KOIEhd99dPJ8lrvf0d8aJDVDPfMiAZ3xw7G9zi4ItS2haNViMMqm2zXhVtcbPw6-azh63K4ntDLr_Y-Pvvtx8VwpGWIi3Y81Sn33MbZu_RMmlo9cpRR4dq2z8uoOByVHqSgB9y4X8wFO3divMeAmWI83vahLq26cq3r4tyT-4BNmZ0XaWRZwil9D3vPG7f8BUk21CJv8gE5DpIyfBsWvM8T6NnUPN5wfQULMXpgDo3boujSs6Otr_vx6uagir3DfsfadojsDfuRYfQLoUG9JWDQ6gCt5dNvalSQV6EtaB8l4gZRg80iF-G_pYH9RqkI0QwrNtFJY7JlCxb30cbcrJYAABU7s9j_J9axnmd-LE_qAwcsW4jLvrZFTTnACxxmd8v6P-vVTURSjWyRZMJOvur0kpgLzrpV315VMYxs4tq2z2nlyrgm9orYDanj8CL7E9zzUZROYwIRx_4ROxYCmgiCFdOHAIXjRiCpiNJ6V2dVkoYr-jMT-RUx0iRVo-VnLIo2gr2tSW33i5Nmhmu8f2tvmk3KuXjk-NNJ2MgJA-Z0NxiCZ9Tet8Mc7QnEKoD7n2qrAJWGTDvl07tt2xcC-mZn_PovsfFo-kBUWCLpxfg-VFyQsYfnBiB9fTc=w651-h385-no?authuser=0)

Now it is time to seed the database. This will create a default Admin user with the email carlosmoran.97cr@gmail.com and "admin" password.
Run the command:

    npx sequelize-cli db:seed:all
 
![enter image description here](https://lh3.googleusercontent.com/7C5HYh6P1XTd2ekhgoKjjZllY6rmgXhxA4UfIFD6rw3McpbNYbJtYU0Zn1bnv5f34oGHnHhtezS0DvihWyIqAq7IO0ARCjoclSvaOlsQs1q7N9ocDPdJ47mv2wBhP0QqKcS0gjCmNDz2DLAiMDdrFBpa5yBX5TJ8KwctmVTlCkFkRuWLjp3pZ3Quw6hc-Y-MRYDmANZmaFPC1mYCxqzoxBXEa-rVcU9MTJLmYwN0gijbLGnW9L0dpjhNWwAWpx9v8MaQjw4hQRAwjYAES3LgAcKkCBWUukqnu-5MKD5jKzb5L4pggXNlcirFZv9whL_dtWc5aug5bDZf1nicRZps_oMErQ-4D0dkccaG5CtAEsDQiJYJFDa_TADiRU50nAJb47rLsrWTWckGnC0M723SiCyAg2HhvS_Po_tg8glcBgb9Xun3SwKfRgEoZ5y33aPlLv43sUuYDHKNHp861utAbJKg2E_dVsvlV-7VF6XaDk1pneSrp7GzOWJvNUqcvNbVoE3VpZzJHABFVFnHU6v3s6TAt3v-V4k5ty-AWHYRBGOEC04eGAkwkKXlzTipB0eNVltvaec_tsoz7JxfHhGqgwD3AbNt5jQDR7-h8iOyUsg2AMjhJDDSepBaXmqHLBXcx2VauUJYHzpy_OH_Z-Q6uPB9p3WdCrpu_21ZW3oAPLdcbM36X0sHx7Riy7-qmPc=w725-h245-no?authuser=0)
 The last step before running the API is creating a .env file in the repository folder:
 ![enter image description here](https://lh3.googleusercontent.com/E0V0_kYb2YXv1HQcrg9bJfmvcyY3tA0vTt3-A-cQ0OKPIzE32o0oIH9EhSIZwMF_v_GVjUtDRVUJiu3zQokgtonHe40yxcpuP7I4NAjAl9tSACVBgu95Dv-kdBPiNNOCSH28EeP-v3E1vHwoD7ONNhocUlhGBMhqwMqmyLCIewnuxutrXWHRJCJqvJyL28Pom1zD2G5bZANQvrLxva8zPPwxM1Fw4BfBbKgDVkfwl1fHDRB0NRDN5Bps5a_8KdEZPDChhG1BxCHnB-Bmz1etTLzKxZJb_U7ElfeUNMF0u4d18D4vkNOgqfJozOjjcoIv-iY5mYNi4Env6QZeoMCcwv8hDTyRKKHkoamQH6mhXsH5NsQf7t-1A88lyaH0wegswRkxfXuuFgyu3qSltuyNBb_Yr2UL4YmjaH7ix7oMKMOBgMBi5rk_Erb1CskKXRuB-djR9NGjryJM5yqNb3CPQ30ZI-2eoQqCswcWBdarfAqef079Kpjok14ZvLkLTHEkIk9-XfUwUr0LrSzlOCGAIgFqA1Ki7MH3SCxkQ4RZD4wbvq6ifGDadJjwiCc_1BZw7fGM4owxDKFWGGXULaKPOMNGQYcnkrfF1JuuFuj2Z_Pal2KznAqAnq9HdgpqkAUTluh58I7oDDHgX8A0ltPeFFlAkr9WpnHvIkn3yRk9RLY0uGDIq7lEGokJd_vPFa0=w321-h334-no?authuser=0)
 This file will contain some enviroment variables that the application needs to work. Open the file in your favorite IDE (in my case I am using Visual Studio Code), and paste the folowing content:
**WARNING: I know that is not recommended to paste secret keys here. I am using Cloudinary service to store images but because this is a testing application I am pasting my secret key so you don't have to create a cloudinary account. But if you want to create an account feel free to do that, just paste the right keys in this file.** 

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
And the file should look like this
![enter image description here](https://lh3.googleusercontent.com/gnYWjHoPv1tIJMXecor4NBcVFldSy-CUC182Rt5U5DCtteWg4QV_1-ak-HwmqowePfIjO_Tydyj05cc2ahGh-2CKm9q1R-wFef5bri1v5QG3q6eq3Mp1qvBdYUy9eZ57QRIEyerMgG8QdvZeqS0SdEsuVxoqxtWblPbJKbbgl79bCNNYeMBHbcqvb-rJQAgyzHkxf1tVztp8aBbMWlLamNKjtQc57gQP9jN2l_6TgE5R6X67-EAMuUTcUoVmjDXwYse9b2YXxnnwUaq6szFhX9HlVI3HenKB4bjzZB6aQWWfuGL58bnI4qePPshVpHNm4xMUcvKfB_mvsf_2lH4KaFY4RiHArjEKfv8lnRi3NNnB3xxrsiOcoieZyDbfhBg6TtbIxcOh8XuyH-VzigTIVr-JPcbj4AThXwvWSsmhsebH3sAISzuCoYDaCq8p4YpVumVGTtW02gBRWFCDABZ3saxgyFmdf-wqm87Aqg0bFUPVtO2vIOZ661yyFZApnfmrP0EfjMdAAfZfUKM2C3_h6pRml9TcQoQBHTW-TFnCbF_b-xv3vKn0PGzYHjCZp44cDwKxYp48nH70Ky-gpWStHri72gdg8thiOpYYGK_204GR01lZ82tdz_kCH5oZMz_6CygF0DcFrUlvNyVyMiUSzeOxxitr4PzUwSENiiBhIbAM6OCVkTsHtE9D5HSaSuo=w1395-h969-no?authuser=0)

With all of that in place now the last step is running the application, for doing that run the command

    npm start
![enter image description here](https://lh3.googleusercontent.com/sB3UfwX72w1zG73pJ8zW3dmT2gRM31RPbVGHiVKlNjvBxUUn6Ct1RtyAI2xRoqpKuBvwtZAJiaiUZQOAxtFU_DXhYYkuNfFCVJLvNWk5AO2FCu9um4iElwRE2OQD-xTfo6A-ae7fIRdt6RQZLxmovapu9x76IO_vRfqxp2XH3oVymgrcr3WvkpLlGdmeozQ6gZLZL_c8RjheGytqMMj-0hlQTh2HTGw5bqKVvmT3qAct8G8tnAjpKBJba71h6JRys1cR9v-D5KrjdXI2seFNwKbr6I94jmC5uTyhhHvUez-hLEyByjm1_5hRX-1NiGB1RdfySeclU26FHHKQPQJWOmjyjgN0jFCKrHtLJWuctlIrSB_yjaf9wVlnBiajIoTVhM-7HaeVZVM9bT_6klWr8iT1gQ-O_uz4nIq5XZ5rvjukdwGS-gcRFUDcFwqfFaSUi0XAEwUPLOTPLNKjpe_5B_CMq1sU9syyUXpIL5GrZXR16CszST0R-gAxIvUsxP6yvvbfLICoWdfJeYOyN4oUBfe3jGveVcJMYRyM5ki0zjCelDacs014gazckrCKh3xi3NRjx4h2Vk3W04u2IB0WiSvhxbIGSLrWzsGuT02X6j7dD5soxh8HPw9TjMmIUGovxKW62M4IF5eNktN9Tsm-WvaYdpM_P3DNfVzNDTsQNk3UjzwkeuA00e5gSB-FSfs=w894-h268-no?authuser=0)
And if you see those success messages that means that everything is working as expected. You can try the API by login in with the default admin user. Just  make a POST request to the /api/v1/login endpoint with de default credentials. Just set a raw JSON body with the credentials:

    {
		"email":  "carlosmoran.97cr@gmail.com",
		"password":  "admin"
    }
And the API should return a JSON Web Token like the one in the screenshot
![enter image description here](https://lh3.googleusercontent.com/2Zrz5GRKGruSfVhHiv8mrSuKAd7CffOffNJ3rnkzo8xSN1apJXVSWsJ3d4P8R8ktUDjnV3RDoP5u1S1DuBRN1o77GFi7tq3A7U1lIbL5MSVOCHMsYdcpXmpK1-rX4P6T8CJPvjX4BQgIR_kry_ktkG5nXp4bDv_ptVd8oPl5-l3rb9NZdP0CsyIT5Ij3mgfHZicTz_U76HK_oZyT1Io1I-igLxwCWCPSfKNXf8T7Qj20KvEy8TBdfjvYWriO5vtle8BQgZcyJEppMuajAhygcG6WFSZRCrV9sK-AWkANAbCRrUBCH_1KM9l9h8LolNX2QY7_JHdnifhA2li2Ca35nhK0LIjSb_UTb6D0yQN9hOcBLaFTdQHH4cV3uFVIRbLi6ajaF5A8fhSFc-HIGGpEzzgI3crMQarAAAZ-p6DUj1uqWwesmMWgGuXvfZedbCUCDb3dyFTHBn9ETy6usK5HE8ETgRHRuzVCWqRwUmWqI5rebOzc7oxpGyTdfVpptYGqfDgfpnmtx1XdYWJ6IH9HdwQs-egaUbSYUdo-xpsk_rHqball0RHN5w5qY1Aiig3vQlIgxJypd-4IzMQ3IywMK_UWXPUClfFLBgAYUZsZubz2wPfK_n1NuhusLYUY4vFrJO7-lvzlhiif8hBD8C_m_ibivi0sNYOzw5pZGKP0unl6sZeWodThilu8c-hsp6w=w811-h736-no?authuser=0)

That's all for this installation guide. If you found any trouble please contact me at the next email: carlosmoran.97cr@gmail.com and I will be glad to help you.

# Option 2
Installing the API with docker. Currently working on this guide :) it will be available soon.