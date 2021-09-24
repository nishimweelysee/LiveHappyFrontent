import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class PropertyPage extends Component {

	componentDidMount() {

     const $ = window.$;

     $( 'body' ).addClass( 'body-bg' );

 	}

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
		let imagealt = 'image'

    return <div className="blog-page-area pd-top-120 go-top">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-8">
			        <div className="product-search-inner bg-main">
			          <div className="row custom-gutters-20">
			            <div className="col-md-3 align-self-center">
			              <h5>21 Properties</h5>
			            </div>
			            <div className="col-md-6 mt-2 mt-md-0">
			              <div className="widget-search">
			                <div className="single-search-inner">
			                  <input type="text" placeholder="Search your keyword" />
			                  <button><i className="la la-search" /></button>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 mt-2 mt-md-0 align-self-center">
			              <div className="single-select-inner">
			                <select>
			                  <option value={1}>Sorty by</option>
			                  <option value={2}>Title</option>
			                  <option value={3}>Best</option>
			                </select>
			              </div>
			            </div>
			          </div>
			        </div>                  
			        <div className="row">
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/15.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Daily Apartment</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  constetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/16.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Family House</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  conseetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/9.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Beach House</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  consectur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/17.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Hotel Apartment</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  conctetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/3.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Daily Apartment</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png" }alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  conctetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/4.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Villa House</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  constetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/6.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Sunshine Place</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  consetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			          <div className="col-md-6">
			            <div className="single-product-wrap style-2">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/project/5.png"} alt="img" />
			                <div className="product-wrap-details">
			                  <div className="media">
			                    <div className="author">
			                      <img src={publicUrl+"assets/img/author/1.png"} alt="img" />           
			                    </div>
			                    <div className="media-body">
			                      <h6><Link to="/property-details">Owner Name</Link></h6>
			                      <p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />New York real estate </p>
			                    </div>
			                    <a className="fav-btn float-right" href="#"><i className="far fa-heart" /></a>
			                  </div>
			                </div> 
			              </div> 
			              <div className="product-details-inner">
			                <h4><Link to="/property-details">Sunny Place</Link></h4>
			                <ul className="meta-inner">
			                  <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />New York</li>
			                  <li><Link to="/property-details">For Sell</Link></li>
			                </ul>
			                <p>Lorem ipsum dolor  consetur </p>
			                <span className="price">$ 80,650.00</span>
			              </div>
			              <div className="product-meta-bottom style-2">
			                <span>3 <span>Bedroom</span></span>
			                <span className="border-none">2 <span>Bathroom</span></span>
			                <span>1026 <span>sqft</span></span>
			              </div>         
			            </div>
			          </div>
			        </div>
			        <div className="pagination-area text-center mt-4">
			          <ul className="pagination">
			            <li className="page-item"><a className="page-link" href="#"><i className="la la-angle-double-left" /></a></li>
			            <li className="page-item active"><a className="page-link" href="#">1</a></li>
			            <li className="page-item"><a className="page-link" href="#">2</a></li>
			            <li className="page-item"><a className="page-link" href="#">3</a></li>
			            <li className="page-item"><a className="page-link" href="#">...</a></li>
			            <li className="page-item"><a className="page-link" href="#"><i className="la la-angle-double-right" /></a></li>
			          </ul>
			        </div>
			      </div>
				  <div className="col-xl-3 col-lg-4">
              <div className="widget widget-owner-info mt-lg-0 mt-5">
                <div className="owner-info text-center">
                  <div className="thumb">
                    <img src={ publicUrl+"/assets/img/news/21.png"} alt={ imagealt } />
                  </div>
                  <div className="details">
                    <h6>Jesse Edwards</h6>
                    <span className="designation">Building Owner</span>
                    <p className="reviews"><i className="fa fa-star" /><span>4.8</span> 70 Review</p>
                  </div>
                </div>
                <div className="contact">
                  <h6>Contact Us</h6>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Email" />
                  </div>
                  <div className="rld-single-input">
                    <input type="text" placeholder="Messages" />
                  </div>
                  <a className="btn btn-yellow" href="#">Send Messages</a>
                </div>
                <div className="contact-info">
                  <h6 className="mb-3">Contact Info</h6>
                  <div className="media">
                    <div className="media-left">
                      <img src={ publicUrl+"/assets/img/icons/1.png"} alt={ imagealt } />
                    </div>
                    <div className="media-body">
                      <p>Address</p>
                      <span>Long Island, NY 11355, USA</span>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-left">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="media-body">
                      <p>Phone</p>
                      <span>+00 111 222 333</span>
                    </div>
                  </div>
                  <div className="media mb-0">
                    <div className="media-left">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="media-body">
                      <p>Email</p>
                      <span>info@example.com</span>
                    </div>
                  </div>
                </div>
				</div>
				</div>
			      <div className="col-lg-4">
			        <aside className="sidebar-area">
			          <div className="widget widget-author text-center">
			            <h4 className="widget-title">House Owner</h4>
			            <div className="thumb">
			              <img src={publicUrl+"assets/img/agent/1.png"} alt="img" />
			            </div> 
			            <div className="details">
			              <h5>Nishimwe Elysee</h5>
			              <p>Lorem ipsum dolor amet, Lore ipsum dolor sit amet, consectetur et  eiLorem ipsum dolor sit amet</p>
			              <ul>
			                <li><a href="#"><i className="fab fa-facebook-f" aria-hidden="true" /></a></li>
			                <li><a href="#"><i className="fab fa-linkedin-in" aria-hidden="true" /></a></li>
			                <li><a href="#"><i className="fab fa-instagram" aria-hidden="true" /></a></li>
			                <li><a href="#"><i className="fab fa-twitter" aria-hidden="true" /></a></li>
			              </ul>
			            </div>        
			          </div>
			          <div className="widget widget-category">
			            <h5 className="widget-title">Category</h5>
			            <ul>
			              <li><a href="#">Design <span>26</span></a></li>
			              <li><a href="#">Villa House <span>20</span></a></li>
			              <li><a href="#">Business <span>21</span></a></li>
			              <li><a href="#">Global World <span>31</span></a></li>
			              <li><a href="#">Technology <span>12</span></a></li>
			              <li><a href="#">Ui Design <span>12</span></a></li>
			            </ul>
			          </div>
			          <div className="widget widget-place">
			            <h5 className="widget-title">Place</h5>
			            <ul>
			              <li>New York <span>26</span></li>
			              <li>Love Road <span>20</span></li>
			              <li>Beach Side <span>21</span></li>
			              <li>Golden city <span>31</span></li>
			            </ul>
			          </div>
			          <div className="widget widget-news">
			            <h5 className="widget-title">Popular Feeds</h5>
			            <div className="single-news-wrap media">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/blog/5.png"} alt="img" />
			              </div>
			              <div className="media-body align-self-center">
			                <h6><Link to="/blog-details">Dolor eorem ipsum sit amet Lorem ipsum</Link></h6>
			                <p className="date"><i className="far fa-calendar-alt" />25 Aug 2020</p>
			              </div>
			            </div>
			            <div className="single-news-wrap media">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/blog/6.png"} alt="img" />
			              </div>
			              <div className="media-body align-self-center">
			                <h6><Link to="/blog-details">Responsive Web And Desktop Develope</Link></h6>
			                <p className="date"><i className="far fa-calendar-alt" />25 Aug 2020</p>
			              </div>
			            </div>
			            <div className="single-news-wrap media">
			              <div className="thumb">
			                <img src={publicUrl+"assets/img/blog/7.png"} alt="img" />
			              </div>
			              <div className="media-body align-self-center">
			                <h6><Link to="/blog-details">Admin Web is Django Highlig Models</Link></h6>
			                <p className="date"><i className="far fa-calendar-alt" />25 Aug 2020</p>
			              </div>
			            </div>
			          </div>
			          <div className="widget widget-tags">
			            <h5 className="widget-title">Popular Tags</h5>
			            <div className="tagcloud">
			              <Link to="/blog">Popular</Link>
			              <Link to="/blog">Art</Link>
			              <Link to="/blog">Business</Link>
			              <Link to="/blog">Design</Link>
			              <Link to="/blog">Creator</Link>
			              <Link to="/blog">CSS</Link>
			              <Link to="/blog">Planing</Link>
			              <Link to="/blog">Creative</Link>
			            </div>   
			          </div>
			        </aside>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default PropertyPage