# PICKSA

## Introduction
멋쟁이사자처럼 중앙대학교 리크루팅 페이지로 당해 운영진만 이용가능합니다. <br>
`ver 1.0.0` : 중하하 2기 제작(2023.09 ~ 2024.01) <br>

## Service
### 페이지 별 기능 소개
1. **아기사자** : 지원자 리스트 전체 표출 및 지원서 상세 보기를 지원합니다.
2. **서류 질문** : 서류 질문 제작 페이지로 질문 입력 및 드래그를 통한 질문 소트가 가능합니다.
3. **지원 평가** : 좌측에는 지원서를, 우측에는 평가 페이지를 두어 지원서를 보며 서류 평가를 작성하고 타 운영진들의 평가 열람을 지원합니다.
4. **면접 시간** : 지원자들의 면접 시간을 표로 나타냅니다. <br>

## Development
### Naming Rule
기획, 디자인, 프론트 간 소통 시, 아래의 페이지 명에 따라 소통합니다. <br>
- `LionList` : 아기사자 페이지 
- `DocQuest` : 서류 질문 페이지 
- `Evaluate` : 지원 평가 페이지 
- `Timetable` : 면접 시간 페이지 

### Components
1. 공통 컴포넌트
- `src/styles/` : 스타일 공통 규칙
- `src/components/common/` : 지원서(`Application`) 및 비지원기간 표출(`NotApplicant`), NavBar
- `src/components/modals/` <br>

2. LionList 관련 컴포넌트
- `src/pages/LionListHome`
- `src/pages/LionList`
- `src/pages/LionDetail`
- `src/components/lionlist/` <br>

3. DocQuest 관련 컴포넌트
- `src/pages/DocQuest`
- `src/components/docquest/` <br>

4. Evaluate 관련 컴포넌트
- `src/pages/Evaluate`
- `src/pages/EvaluateDefault`
- `src/pages/EvaluateHome`
- `src/components/evaluate/` <br>

5. Timetable 관련 컴포넌트
- `src/pages/Timetable`
- `src/components/timetable/` <br>

### libraries
- `axios`
- `react-icons`
- `react-router-dom`
- `react-select`
- `react-switch-selector`
- `recoil`
- `recoil-persist`
- `styled-components`

### branch
`main` : 배포 브랜치 <br>
`develop` : 배포 전 병합 테스트 브랜치 <br>
`feature/[기능별]` : 기능별 개발 브랜치 <br>

## 팀원
- `ver 1.0.0` <br>

|이름|학과|github|
|-|-|-|
|박경빈|중앙대학교 소프트웨어학부|[@Gyeongbin](https://github.com/Gyeongbin)|
|윤예원|중앙대학교 경영학부|[@kiiiiv](https://github.com/kiiiiv)|
