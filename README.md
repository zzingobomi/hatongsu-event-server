### Hatongsu Event Server

#### Reverse Proxy 실행

- 테스트용 도커 빌드

```bash
./reverse-proxy/build_and_push.sh <DOCKER_USERNAME> <DOCKER_PASSWORD>
```

- 네트워크
  - hatongsu
- 로컬포트 컨테이너 포트
  - 2567:2567
- 도커 볼륨
  - docker/hatongsu/certs:/etc/nginx/ssl
  - 읽기전용

#### Event Server 실행

- 테스트용 도커 빌드

```bash
./build_and_push.sh <DOCKER_USERNAME> <DOCKER_PASSWORD>
```

- 네트워크
  - hatongsu
- 로컬포트 컨테이너 포트
  - 자동:2567

#### TODO

- Colyseus 에서 uWebSocket 을 지원하는 듯하다. 한번 확인해볼것
  - https://docs.colyseus.io/server/transport/#native-c-websocket-transport-via-uwebsocketsjs
