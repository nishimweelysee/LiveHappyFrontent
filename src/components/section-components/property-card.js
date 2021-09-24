import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const PropertyCard = (props) => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-product-wrap">
        <div className="thumb">
          <img src={publicUrl + "assets/img/house3.jpeg"} alt="img" className=""/>
          <Link className="cat" to="/property-details">
            For Rent
          </Link>
        </div>
        <div className="product-wrap-details">
          <div className="media">
            <div className="author">
              <img src={publicUrl + "assets/img/author/1.png"} alt="img" />
            </div>
            <div className="media-body">
              <h6>
                <Link to="/property">Owner Name</Link>
              </h6>
              <p>
                <img
                  src={publicUrl + "assets/img/icon/location-alt.png"}
                  alt="img"
                />
                New York real estate{" "}
              </p>
            </div>
            <a className="float-right fav-btn" href="#">
              <i className="far fa-heart" />
            </a>
          </div>
          <div className="product-meta">
            <span className="price">80,650.00 RWF/month</span>
            <div className="float-right d-inline-block">
              <ul>
                <li>
                  <img
                    src={publicUrl + "assets/img/icon/triangle.png"}
                    alt="img"
                  />
                  2
                </li>
                <li>
                  <img src={publicUrl + "assets/img/icon/bed.png"} alt="img" />3
                </li>
                <li>
                  <img src={publicUrl + "assets/img/icon/wall.png"} alt="img" />
                  1026 sq ft
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard;