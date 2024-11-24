//export를 붙이면 외부에서 해당 인터페이스를 가져다 사용할 수 있다.
export interface Result {
    id : number;
    title : string;
    content : string;
    explanation : string;
    maker : string;
    star : string;
}


const resultdata : Result[] = [
    {
        id : 1,
        title : '타워디펜스',
        content : 'C# 사용',
        explanation : 'C# Windows Forms 기반\n\n인터페이스를 통해 적과 타워를 구현하고\n타워를 생성하여 적을 제거하는 방식으로 진행\n\n시간이 흐를수록 적이 점점 강해지기 때문에\n플레이어는 타워 업그레이드를 통해 게임을 진행',
        maker : '장일상',
        star : '⭐⭐⭐⭐⭐'
    }, 
    {
        id : 2,
        title : '리듬게임',
        content : 'javascript의 HTML5 사용',
        explanation : 'javascript의 HTML5 기반\n\ncanvas와 audio 등의 HTML5 기능을 사용하여\n기본적인 리듬게임을 제작하였음.\n\n프로젝트 수행 중 다른 점도 문제였지만,\n음악파일에서 음표데이터를 추출하기 위해\n기타 음악프로그램과 파이썬을 통해 데이터 추출\n및 정제 후 json파일로 변환 과정이 필요했음.',
        maker : '장일상',
        star : '⭐⭐⭐'
    }, 
    {
        id : 3,
        title : '교통사고 데이터 분석',
        content : '파이썬 사용',
        explanation : '파이썬을 통한 데이터 분석\n\n빠르게 변해가는 사회 속에서 빅데이터 분석에\n대한 관심이 급증함에 따라 살짝 배워보았음.\n\n다양한 주제 중 교통사고와 관련된 csv파일에서\n데이터를 추출하여 원하는 데이터만 뽑아내어\n그래프로 시각화하였음.',
        maker : '장일상',
        star : '⭐⭐'
    }, 
    {
        id : 4,
        title : '메이플스토리, 던전앤파이터\n캐릭터 정보찾기',
        content : '제이쿼리, API 사용',
        explanation : '제이쿼리와 오픈API를 활용한 웹애플리케이션 제작\n\n오픈 API를 통해 제공되는 데이터를 json형식으로\n받아와서 제이쿼리를 통해 원하는 결과를 출력하기.\n\n과거 즐겨했던 게임에서 제공되는 API를\n활용하여 캐릭터를 검색하여 해당 캐릭터의\n다양한 정보를 확인할 수 있음.',
        maker : '장일상',
        star : '⭐'
    }, 
    {
        id : 5,
        title : '순발력 테스트\n& 메모,그림판',
        content : '앱인벤터 블록코딩 사용',
        explanation : '앱인벤터를 통한 블록코딩\n\n개발을 처음 접하는 사람이 흥미를 가지고\n진행할 수 있을 것으로 생각되는 코딩의 기초적인\n입문과정이라고 해도 과언이 아니라고 생각됨.\n\n앱인벤터에서 제공하는 타이머와 이미지\n스프라이트 기능을 통해 랜덤하게 이동하는\n이미지를 터치하는 순발력 테스트 앱과\n간단한 메모 기능과 그림그리기를 할 수\n있는 메모장 앱을 제작.',
        maker : '장일상',
        star : '⭐'
    }
    
];


export default resultdata;