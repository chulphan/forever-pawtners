## 유기동물 검색 서비스 Forever-Pawtners

이 서비스에서 평생 함께 할 반려동물을 찾아보세요

더 이상 반려동물을 사지 마세요

⚡️ 이 서비스는
공공데이터의 [농림축산식품부 농림축산검역본부\_동물보호관리시스템 유기동물 정보 조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15098931)
를 이용합니다.

[서비스 바로가기](https://forever-pawtners.vercel.app)

---

#### 구현 해야 할 것들

##### 전반적인 것들

- [x] api route 적용 (이제 SERVICE_KEY 를 외부에 노출하지 않을 수 있게 됨!)~~
- [ ] 시도군구 (공공 데이터 포털로 가져오는 경우 간헐적으로 timeout error 가 남.)
  - [x] 별도 api router 로 분리
  - [ ] 시도군구 데이터 supabase database 에 저장
    - [ ] 분리 한 api router 에서 DB 에 저장 된 정보 가져오기
  - [ ] tanstack query 로 가져올 때 cache 전략 사용해보기

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
