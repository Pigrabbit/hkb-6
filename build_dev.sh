#!/bin/bash

SERVER_PUBLIC_FOLDER=./server/public

if [ -d "$SERVER_PUBLIC_FOLDER" ]; then
    echo "기존 server 번들 결과 파일을 삭제합니다..."
    rm -r "$SERVER_PUBLIC_FOLDER"
fi

cd ./client

echo "FE production 빌드를 시작합니다..."
npm run build:dev

echo "빌드 된 결과 client public 폴더를 server로 복사합니다"
cp -r ./public ../server/

sleep 1
cd ../

if [ -f "$SERVER_PUBLIC_FOLDER" ]; then
    echo "$SERVER_PUBLIC_FOLDER 이동 완료!"
fi
