# hkb-6
동혁과 해랑의 ~뱅크샐러드~ 가계부 프로젝트입니다 

# Getting Started

Development installation guide입니다.

```
$ git clone https://github.com/woowa-techcamp-2020/hkb-6.git
$ cd hkb-6
```

프로젝트를 clone받고 프로젝트 디렉토리로 이동합니다.

```
$ cd client
$ npm install
```

클라이언트 프로젝트에 dependency가 있는 node module들을 설치합니다.

```
$ touch .env.dev

### .env.dev
API_URL=[YOUR_API_URL_HERE]
```

클라이언트 App에 필요한 `.env.dev` 파일을 만듭니다.

```
$ cd ../server
$ npm install
```

서버 프로젝트에 dependency가 있는 node module들을 설치합니다.

```
$ touch .env

### .env
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_HOST=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
JWT_SECRET=
```

서버에 필요한 `.env` 파일을 만듭니다. 각 환경변수의 값을 알맞게 채워주세요.

```
$ cd ../
$ ./build_dev.sh
```

프로젝트 루트 디렉토리로 이동한 후 빌드 스크립트 `build_dev.sh` 를 실행합니다.
빌드 스크립트는 client application을 빌드해서 server의 `public` 디렉토리로 이동시켜줍니다.

```
$ cd server
$ npm run start:dev
```

위 과정이 끝났으면, 마지막으로 server 디렉토리로 이동해서 npm script를 통해 `nodemon`으로 서버를 실행시킬 수 있습니다.