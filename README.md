## 유기동물 검색 서비스 Forever-Pawtners

이 서비스에서 평생 함께 할 반려동물을 찾아보세요

더 이상 반려동물을 사지 마세요

⚡️ 이 서비스는
공공데이터의 [농림축산식품부 농림축산검역본부\_동물보호관리시스템 유기동물 정보 조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098931)
를 이용합니다.

[서비스 바로가기](https://forever-pawtners.vercel.app)

---

#### 구현 해야 할 것들

###### 🤯 ISSUE (2025.6.11)

유기동물 정보 조회 서비스가 V2 로 업그레이드 됨에 따라 현재 서비스가 제대로 동작하지 않음.
아래 문제들을 해결해야 함.

- [x] 농림축산식품부 유기동물 정보 조회 서비스 api URL 변경..
- [x] 변경 된 Model 적용 필요
  - [x] 유기동물종 적용
  - [x] 유기동물 데이터 적용
- [x] 변경 된 Model 과 기존 Database 구조와 어떻게 통합시킬지..??
  - [x] supabase 새로운 유기동물 저장 DB 추가
  - [x] 기존 데이터 새로운 DB 로 이관
- [x] 이미지 프록시 적용
  - 공공데이터 이미지는 http 만 제공 -> https 환경에서 이미지 주소 호출 시 이미지를 불러올 수 없음
  - next 서버를 이용해서 이미지를 불러오도록 수정
- [ ] 이제 이미지 2개 제공하게 됨 -> 상세페이지 slider 적용 (보류: 동일한 이미지..)
- [ ] 변경된 api 필드 참고하여 필요한 데이터 표시 추가
  - [x] 안락사 당한 경우 안락사 사유 표시

##### 인증

- [x] 카카오 로그인
- [ ] 네이버 로그인

##### 전반적인 것들

- [x] api route 적용 (이제 SERVICE_KEY 를 외부에 노출하지 않을 수 있게 됨!)~~
- [x] 시도군구 (공공 데이터 포털로 가져오는 경우 간헐적으로 timeout error 가 남.)

  - [x] 별도 api router 로 분리
  - [x] 시도군구 데이터 supabase database 에 저장
    - [x] 분리 한 api router 에서 DB 에 저장 된 정보 가져오기
  - ~~[ ] tanstack query 로 가져올 때 cache 전략 사용해보기~~

- [x] data fetching useQuery 적용
  - [x] 유기동물 리스트
    - [x] server side prefetch 적용
  - [x] 광역시/도, 시군구
    - [x] 광역시/도 server side prefetch 적용

##### 메인화면

- 목록 표시하기

  - [x] 시/도/군/구 데이터 불러오기
  - [x] 보호소 데이터 불러오기
  - [x] 견/묘/기타축종 데이터 불러오기
  - [x] 상세 화면 표시하기 (shadcn/dialog)
  - [x] 목록 페이징 처리 (무한 스크롤, useIntersectionObserver)
  - [x] 시/도/군/구 에 대한 타입 정의
  - [x] 검색 화면 처리
  - [x] 보호소 위치 지도 표시
    - [x] 검색 조건 개별 해제
    - [x] 검색 조건 전체 해제
    - [x] 시/도/군/구 화면 표시
    - [x] 품종 화면 표시
    - [x] 중성화 여부 화면 표시
    - [x] 상태 (공고중/보호중) 화면 표시
    - [x] 유기날짜
    - [x] Select 박스 placeholder 추가

- 검색 기능

  - [x] 시도군구를 통한 검색 기능
  - [x] 검색 후 페이징 기능
  - [x] 품종으로 검색 기능
  - [x] 중성화 여부로 검색 기능
  - [x] 날짜를 통한 검색 기능

- 더 이쁘게 만들기

  - [x] 상세 페이지 이미지 사이즈를 조절할 필요가 있다

- ~~recoil atom과 타입을 분리할 수 있을지 고민해보기~~ (recoil -> zustand 변경)
- react-query 적용하기
  - [x] paws > initialData 중복 코드 제거
  - [x] searchBox > 견종 데이터를 state 가 아닌 useQuery 가 반환한 데이터 사용하도록 처리
  - [x] 결과 없을 시 분기를 통한 UI 표시 처리
  - [x] 상세 페이지 server side prefetch 적용

##### 상세 페이지

- [x] intercept router(next.js) 적용 (url 접속 시 dialog 대신 페이지로 보이게
- [x] 상세 페이지 저장을 위해 supabase 적용
- [x] 상세 페이지 SEO 추가
- 공유하기
  - [ ] 카카오 공유
  - [x] web api 공유 (window.navigator.share)
