import "./footer.css";
import Subs from "./subs";
import GooglePay from "./icons8-google-pay-50.png";
import AmazonPay from "./icons8-amazon-pay-50.png";
import MasterCard from "./icons8-mastercard-50.png";
import Visa from "./icons8-visa-50.png";
import PayPal from "./icons8-paypal-50.png";


export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Subs />
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Customer Service</h4>
              <ul>
                <li>
                  <a href="#">Contact Us </a>
                </li>
                <li>
                  <a href="#">Help and Advice </a>
                </li>
                <li>
                  <a href="#">Shipping and Returns </a>
                </li>
                <li>
                  <a href="#">Terms And Conditions</a>
                </li>{" "}
                <li>
                  <a href="#">Refund Policy</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Information</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">My Account </a>
                </li>
                <li>
                  <a href="#"> Payments & Returns</a>
                </li>{" "}
                <li>
                  <a href="#">view Catalogues Online</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>about us</h4>
              <ul>
                <li>
                  <a href="#">Who are we ? </a>
                </li>
                <li>
                  <a href="#"> Corporate Responsibility</a>
                </li>
                <li>
                  <a href="#">California Laws </a>
                </li>
                <li>
                  <a href="#"> Carrers</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>contact us</h4>
              <div className="social-links">
                <p href="#">
                  {" "}
                  <i className="fas fa-phone"> </i> +216 56616921{" "}
                </p>
                <p href="#">
                  {" "}
                  <i className="fas fa-envelope"></i> ahmed.massoudi@horizon-tech.tn{" "}
                </p>
                <p href="#">
                  {" "}
                  <i className="fas fa-map-marker"> </i>1010 avenue , chandigarh
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </footer>
      <div className="footline">
      <img src={GooglePay} />
      <img src={AmazonPay} />
      <img src={MasterCard} />
      <img src={Visa} />
      <img src={PayPal} />
        <p>Copyright &copy; 2024. All Rights Reserved for HORIZON SCHOOL OF DIGIAI TECH</p>
      </div>
    </>
  );
}
