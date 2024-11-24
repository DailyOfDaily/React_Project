import { Carousel } from "react-bootstrap";
import '../App.css';


const MyCarousel : React.FC = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <div className="carousel-item-custom">
                    <img 
                        src = {process.env.PUBLIC_URL + '/images/2.png'}
                        className="fixed-size-img"
                        alt="같은그림찾기"
                    ></img>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-item-custom">
                    <img 
                        src = {process.env.PUBLIC_URL + '/images/3.png'}
                        className="fixed-size-img"
                        alt="핑퐁게임"
                    ></img>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-item-custom">
                    <img 
                        src = {process.env.PUBLIC_URL + '/images/4.png'}
                        className="fixed-size-img"
                        alt="틱!택!톡!"
                    ></img>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-item-custom">
                    <img 
                        src = {process.env.PUBLIC_URL + '/images/5.png'}
                        className="fixed-size-img"
                        alt="반응속도 테스트"
                    ></img>
                </div>
            </Carousel.Item>
        </Carousel>

    )
}

export default MyCarousel;