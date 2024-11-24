import { Container } from "react-bootstrap";

const Footer : React.FC = () => {
    return (
        <div>
            <footer className="text-white py-1 mt-3" style={{backgroundColor : '#5aa55a'}}>
                <Container className="text-center">
                    장일상<br/>
                    이메일 : <a href = "mailto:jangtyu@naver.com" className="text-white">jangtyu@naver.com</a><br></br>
                    Copyright ⓒ 데일리OF데일리 Corp, All Rights Reserced<br></br>
                </Container>
            </footer>
        </div>
    )
}

export default Footer;