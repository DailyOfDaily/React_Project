import { Button, Card, Col } from 'react-bootstrap';
import {Game} from "../data/GameData";
import {Link} from 'react-router-dom';

interface GameItemProps{
    game : Game;
}

// \n을 <br />로 변환하는 함수
const replaceNewlineWithBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

const GameItem : React.FC<GameItemProps> = ({game}) => {
    return (
        <Col key = {game.id} className="box p-4" style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <Card className="border rounded shadow p-3" style={{height:'400px', width: '330px'}}>
                <Card.Body>
                    <Card.Img 
                        variant = "top"
                        src = {`${process.env.PUBLIC_URL}/images/${game.id + 1}.png`}
                        alt={game.title}
                        style={{
                            height: '240px',
                            width: '240px',
                            objectFit: 'contain', // 이미지를 비율 유지하며 맞춤
                            maxWidth: '100%', // 부모 요소의 크기를 넘지 않도록 제한
                            maxHeight: '100%', // 높이도 제한
                            margin: '0 auto', // 가운데 정렬
                        }}
                    >
                    </Card.Img>

                    <div className="atitle" style={{ textAlign: 'center' }}>
                        {replaceNewlineWithBreaks(game.title)}
                    </div>

                </Card.Body>
                <div>
                    {/* 게임별 고유 링크를 동적으로 생성 */}
                    <Link to={`/detail2/${game.id}`} state={{ game }}>
                        <Button variant="success">자세히 보기</Button>
                    </Link>
                </div>
            </Card>
        </Col>
    )
}

export default GameItem;