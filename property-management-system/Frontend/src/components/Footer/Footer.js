import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top-area section_50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-xs-3 col-sm-6">
              <div className="single-footer-widget footer-logo-widget">
                <div className="footer-widget-text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt labore et dolore magna
                    aliqua.
                  </p>
                  <ul className="footer-social">
                    <li>
                      <Link to="#">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa fa-skype"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xs-3 col-sm-6">
              <div className="single-footer-widget">
                <h3>latest post</h3>
                <div className="latest-post-footer clearfix">
                  <div className="latest-post-footer-left">
                    <i className="fa fa-image"></i>
                  </div>
                  <div className="latest-post-footer-right">
                    <h4>
                      <Link to="#" style={{ color: "black" }}>
                        Revealed: How to set goals for you and your team
                      </Link>
                    </h4>
                    <p>Jan 14, 2018</p>
                  </div>
                </div>
                <div className="latest-post-footer clearfix">
                  <div className="latest-post-footer-left">
                    <i className="fa fa-briefcase"></i>
                  </div>
                  <div className="latest-post-footer-right">
                    <h4>
                      <Link to="#" style={{ color: "black" }}>
                        Five ways to improve as a business professional!
                      </Link>
                    </h4>
                    <p>Jan 14, 2018</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xs-3 col-sm-6">
              <div className="single-footer-widget">
                <h3>main links</h3>
                <ul className="quicklinks">
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> About maaxen
                      forum
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> Delivery
                      Information
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> Terms &amp;
                      Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> Team
                      Discussion on maaxen
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> Contact with
                      an expert
                    </Link>
                  </li>
                  <li>
                    <Link to="/" style={{ color: "black" }}>
                      <i className="fa fa-angle-double-right "></i> investment
                      pricing table
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-xs-3 col-sm-6">
              <div className="single-footer-widget">
                <h3>Contact Info</h3>
                <p>
                  <i className="fa fa-map-marker"></i> 4257 Street, SunnyVale,
                  USA{" "}
                </p>
                <p>
                  <i className="fa fa-phone"></i> 012-3456-789
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i> info@maaxen.com
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i> info@maaxen.com
                </p>
                <p>
                  <i className="fa fa-fax"></i> 112-3456-7898
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
