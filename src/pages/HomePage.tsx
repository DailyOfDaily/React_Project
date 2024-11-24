import { Container, Row } from "react-bootstrap";
import MyCarousel from "../components/Carousel";
import ResultItem from "../components/ResultItem";
import { useState } from "react";
import resultdata, { Result } from "../data/Resultdata";


const HomePage : React.FC = () => {

    let [results, setResults] = useState<Result[]>(resultdata);
    console.log(results);
    
    return (
        <div>
            <MyCarousel></MyCarousel>
            
            <Container>
                <div className="project_header_container">
                    <h1 className="project_header">⬇ 일상의 프로젝트 ⬇</h1>
                </div>
                <Row className="text-center">
                    {
                        results.map((result)=>(
                            <ResultItem key = {result.id} result = {result}></ResultItem>
                        ))
                    }
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;