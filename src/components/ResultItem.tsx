import { Button, Card, Col } from 'react-bootstrap';
import {Result} from '../data/Resultdata';
import {Link} from 'react-router-dom';

interface ResultItemProps{
    result : Result;
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

const ResultItem : React.FC<ResultItemProps> = ({result}) => {
    return (
        <Col key = {result.id} className="box p-4" style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
            <Card className="border rounded shadow p-3" style={{height:'500px', width: '330px'}}>
                <Card.Body>
                    <Card.Img 
                        variant = "top"
                        src = {`${process.env.PUBLIC_URL}/images/${result.id + 1}.jpg`}
                        style = {{height : '190px', width : '190px', objectFit : 'cover'}}
                        alt = {result.title}
                    >
                    </Card.Img>
                    <p><br /></p>
                    <div className="atitle" style={{ textAlign: 'center' }}>
                        {replaceNewlineWithBreaks(result.title)}
                    </div>
                    <div>
                        <p></p>
                        <span>제작자 {result.maker}</span>
                        <p></p>
                        <span>추가확장 가능성<br></br>{result.star}</span>
                        <p></p>
                    </div>
                </Card.Body>
                <div>
                    {/* 데이터 전달 방식 : props, useLocation */}
                    <Link to = {`/detail/${result.id}`} state = {{result}}>
                        <Button variant = "success" >자세히 보기</Button>
                    </Link>
                </div>
            </Card>
        </Col>
    )
}

export default ResultItem;