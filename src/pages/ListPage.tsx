import { useEffect, useState } from "react";
import gamedata from "../data/GameData";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import GameItem from "../components/GameItem";

const ListPage : React.FC = () => {

    let [games, setGames] = useState(gamedata);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        if(!loaded){
            axios.get('')
            .then(res => {
                console.log("res data : ", res.data);
                console.log("book data : ", games);
    
                let result = [...res.data, ...games];
                setGames(result);
                console.log(result);
                setLoaded(true);
            })
            .catch(error => {
                console.log("Error : ", error);
            })
        }
    }, []); // [] : 빈 배열로 하면 마운트 될때 1번만 실행, 변수를 넣을 경우 변수가 변할 때마다 실행



    return (
        <div className="App">
            <Container>
                <div className="project_header_container">
                    <h1 className="project_header">가볍게 즐기는 게임</h1>
                </div>
                <Row className="text-center">
                    {
                        games.map((game)=>(
                            <GameItem key = {game.id} game = {game}></GameItem>
                        ))
                    }
                </Row>
            </Container>
        </div>
    )
}

export default ListPage;