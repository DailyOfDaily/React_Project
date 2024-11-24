import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { Result } from "../data/Resultdata";
import { useEffect } from "react";

interface LocationState{
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

const DetailPage : React.FC = () => {

    const {id} = useParams<{id : string}>();
    console.log(id);

    const location = useLocation();
    const {state} = location as {state : LocationState};

    const result = state?.result;
    console.log(result);

    return (
        <div className="detailpage-wrapper">
            <Container className='mt-5'>
                <Row>
                    <Col md={6}>
                        <Card className='border-0'>
                            {/* 동영상 삽입 */}
                            {result.id === 5 ? (
                                // book.id가 5일 때 두 개의 동영상을 표시
                                <div style={{ display: 'flex', gap: '16px' }}>
                                <video
                                    controls
                                    style={{
                                        borderRadius: '8px',
                                        width: 'calc(50% - 8px)', // 두 동영상이 균등하게 배치되도록 설정
                                        height: '100%',
                                        objectFit: 'cover', // 동영상 크기를 비율 유지하며 맞춤
                                    }}
                                >
                                    <source
                                        src={process.env.PUBLIC_URL + '/videos/' + (result.id + 1) + '_1.mp4'}
                                        type="video/mp4"
                                    />
                                    동영상을 재생할 수 없습니다.
                                </video>
                                <video
                                    controls
                                    style={{
                                        borderRadius: '8px',
                                        width: 'calc(50% - 8px)',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                >
                                    <source
                                        src={process.env.PUBLIC_URL + '/videos/' + (result.id + 1) + '_2.mp4'}
                                        type="video/mp4"
                                    />
                                    동영상을 재생할 수 없습니다.
                                </video>
                            </div>
                        ) : (
                                // book.id가 1~4일 때 하나의 동영상만 표시
                                <video
                                    controls
                                    style={{ borderRadius: '8px', width: '100%' }}
                                >
                                    <source
                                        src={process.env.PUBLIC_URL + '/videos/' + (result.id + 1) + '.mp4'}
                                        type="video/mp4"
                                    />
                                    동영상을 재생할 수 없습니다.
                                </video>
                            )}
                        </Card>
                    </Col>
                    
                    <Col>
                        <Card className = 'border-1'>
                            <Card.Body>
                                <Card.Title as = "h3" className = "mb-4" style={{ textAlign: 'center' }}>
                                    {replaceNewlineWithBreaks(result.title)}</Card.Title>
                                <Card.Text as = "h5" className = "text-muted mb-4" style={{ textAlign: 'center' }}>
                                    {replaceNewlineWithBreaks(result.explanation)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DetailPage;