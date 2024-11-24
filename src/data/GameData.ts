//export를 붙이면 외부에서 해당 인터페이스를 가져다 사용할 수 있다.
export interface Game {
    id : number;
    title : string;
    maker : string;
}


const gamedata : Game[] = [
    {
        id : 1,
        title : '같은 그림 찾기',
        maker : '장일상',
    }, 
    {
        id : 2,
        title : '추억의 탁구 게임(퐁)',
        maker : '장일상',
    }, 
    {
        id : 3,
        title : '틱! 택! 토!',
        maker : '장일상',
    }, 
    {
        id : 4,
        title : '반응속도 테스트',
        maker : '장일상',
    }    
];


export default gamedata;