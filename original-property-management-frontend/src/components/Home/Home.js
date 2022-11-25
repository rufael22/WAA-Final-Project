import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.scss";
import SearchWidget from "../SearchWidget/SearchWidget";

const Home = () => {
  let settings = {
    dots: true,
    speed: 300,
    draggable: false,
    lazyLoad: "ondemand",
  };
  return (
    <div className="container-fluid home">
      <Slider {...settings}>
        <div>
          <img
            className="pic"
            src="https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
            alt="slider-1"
          />
        </div>
         <div>
          <img
            className="pic"
            src="/slider-2.jpg"
            alt="slider-2"
          />
        </div> 
      </Slider>
      <div className="widget">
        <SearchWidget />
      </div>
    </div>
  );
};

export default Home;
