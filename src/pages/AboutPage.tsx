import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";



const AboutPage : React.FC = () => {

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }else{
                    entry.target.classList.remove('show');
                }
            })
        })

        const elements = document.querySelectorAll('.hidden');
        elements.forEach((el)=>observer.observe(el));

    }, []);

    return (
        <div className="aboutpage-wrapper">
            <Container>
                <Row className="align-item-center">
                    {/* 소개 섹션 */}
                    <Col md={6} className="header_left hidden">
                        <header className="header_left_intro">날마다 반복되는 일상</header>
                        <header className="header_left_introduce">안녕하세요.</header>
                        <header className="header_left_introduce">장일상입니다.</header>                        
                        <div className="header_left_introduce_body_container">
                            <span className="header_left_introduce_body">다양한 관점으로 개발에 접근하여,</span><br />
                            <span className="header_left_introduce_body">플레이 해본 게임을 다양한 언어를</span><br />
                            <span className="header_left_introduce_body">통해 제작하며 경험을 쌓고 있습니다.</span>
                        </div>
                        
                        <div>
                            <a href="https://github.com/DailyOfDaily"><button className="btn_header">GitHub</button></a>
                                <p></p>
                            <a href="https://blog.naver.com/jangtyu"><button className="btn_header">블로그</button></a>
                        </div>
                    </Col>
                    {/* 이미지 섹션 */}
                    <Col>
                        <div>
                        <p><br /></p><img src="/images/panda.png" width={"70%"} /><br /><br />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutPage;