import { Container, Row } from "react-bootstrap";
import ResultItem from "../components/ResultItem";
import { useState } from "react";
import resultdata, { Result } from "../data/Resultdata";


const ResultPage : React.FC = () => {

    let [results, setResults] = useState<Result[]>(resultdata);
    
    return (
        <div>            
            <Container>
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

export default ResultPage;