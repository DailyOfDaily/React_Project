import { Button, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import MyCarousel from "../components/Carousel";
import '../App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ListPage from "../pages/ListPage";
import ResultPage from "../pages/ResultPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import GameDetailPage from "../pages/GameDetailPage";
import Footer from "./Footer";


const Content : React.FC = () => {

    return (
        <div className="content-wrapper">
            <Navbar style={{ backgroundColor: '#5aa55a', height: '100px' }} data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/"><h1>일상적인 일상</h1></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">홈</Nav.Link>
                    <Nav.Link href="/about">'일상'은<br></br>누구인가?</Nav.Link>
                    <Nav.Link href="/result">진행한<br></br>프로젝트</Nav.Link>
                    <Nav.Link href="/list">가볍게<br></br>게임한판</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

            <div>
                {/* <img src = {img5} className="d-block w-100" alt="모던자바스크립트"></img> */}
                {/* <img src = {process.env.PUBLIC_URL + '/images/5.jpg'} className="d-block w-50" alt="모던자바스크립트"></img> */}
                {/* process.env.PUBLIC_URL → 현재위치와 환경과 상관없이 public폴더를 가리키는 경로를 나타냄 */}
            </div>

            <Routes>
                <Route path = '/' element = {<HomePage />}></Route>
                <Route path = '/about' element = {<AboutPage />}></Route>
                <Route path = '/list' element = {<ListPage />}></Route>
                <Route path = '/result' element = {<ResultPage />}></Route>
                <Route path = '/detail/:id' element = {<DetailPage />}></Route>
                <Route path = '/detail2/:id' element = {<GameDetailPage />}></Route>
                <Route path = '*' element = {'페이지가 존재하지 않습니다. 확인해주세요.'}></Route> {/* Route path = '*'는, 지정한 페이지 이외의 모든 페이지 */}
            </Routes>
        </div>
    )
}

export default Content;