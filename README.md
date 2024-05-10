# 📚 대구동네도서관

> 대구광역시\_스마트도서관 도서검색서비스 API를 활용한 세미 프로젝트

![README_대구동네도서관](https://github.com/59Youn/project_Daegu/assets/162939328/a769e1be-3d58-421f-838f-3c9d3a265a80)

> #### 진행기간 : 24.04.18 ~ 24.04.28
>
> ![html5](https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
> ![css3](https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
> ![javascript](https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white)

<br>

## 기획목적

주변에 가까운 도서관이 없는 대구 시민을 대상으로, 대구 시내 곳곳에 위치한 스마트 도서관을 편하게 이용하게 하기 위함

<br>

## 주요기능

1. 도서관 별 인기 대출 목록 및 신간 목록 제공
2. 소장 목록 키워드 검색
3. 도서 클릭 시 상세정보(청구기호, 보유 도서관 등) 제공

<br>

## API 목록

**대구광역시\_스마트도서관 도서검색서비스**
(https://www.data.go.kr/data/15125628/openapi.do)

'대구광역시'의 공공도서관 스마트도서관 도서검색서비스

- 스마트도서관 고유코드를 기준으로 스마트도서관의 위치, 스마트도서관 보유도서 검색, 인기도서 검색, 신착도서 검색을 지원하는 공공도서관 스마트도서관 도서검색서비스

<br>

## 프로젝트 이슈

- GITHUB에 배포할 시 특정 이미지가 로드되지 않는 문제점 발생
- 이미지 경로가 'http'로 시작되는 것이 원인 -> noimg 파일을 임의로 다운받아 대체함

<br>

## 아쉬운 점

- pagination 기능을 구현하지 못함
