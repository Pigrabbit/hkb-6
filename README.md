# hkb-6
동혁과 해랑의 `뱅크샐러드` 가계부 프로젝트입니다 

## 👀Demo

![demo1](./images/part1.gif)

![demo2](./images/part2.gif)

## 📝 기획서

[https://docs.google.com/presentation/d/17QLlxQxgFxyvvV6uh8_7sD3SeXIu5bN986nm94uycX8/edit#slide=id.g8b5e1ec338_0_0](https://docs.google.com/presentation/d/17QLlxQxgFxyvvV6uh8_7sD3SeXIu5bN986nm94uycX8/edit#slide=id.g8b5e1ec338_0_0)

## 이번 프로젝트 주요 구현 내용 

### FE 프로그래밍 요구사항
- Model과 View의 역할을 또렷하고 나누고, 관계를 느슨하게 한다.
- Observer 패턴을 활용할 수 있다.
- Single Page Application을 만든다.(여러개의 페이지 개발이 아니고 하나의 페이지에서 모든 렌더링을 한다.)
- Routing을 부분적으로 적용해서 주요 콘텐츠가 URL라우팅이 되도록 한다.
- 상태(state)관리 
    - 데이터 변경을 위한 함수는 순수함수여야 한다.
    - immutable 방식으로 데이터 변경을 시도한다.
- 데이터 시각화는 SVG나 Canvas기술을 활용해서 제작한다. 라이브러리를 사용하지 않는다.
   
### BE 프로그래밍 요구사항
- express + mysql2 사용
- 백엔드는 JSON 기반의 Web API로 응답
- ERD를 먼저 그리고 백엔드 설계를 진행한다.
- passport local을 이용해서 로그인을 구현한다.
- 가능한 한 자주 배포를 한다. 정상 동작하는 배포 버전에는 꼭 태깅을 한다.
- passport + Oauth 로그인을 구현한다.
- passport + Oauth + JWT를 이용해서 인증한다.
- 별도의 외부도구나 CI툴을 사용하지 않고 EC2에 자동배포를 구현한다.



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