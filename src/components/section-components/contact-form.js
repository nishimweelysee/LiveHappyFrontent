import React, { Component } from 'react';

class ContactForm extends Component {

  componentDidMount() {

    const $ = window.$;

     $( '.footer-area.style-two' ).removeClass( 'mg-top-100' );

   }

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="contact-page-area pd-top-120">
              <div className="container">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 mb-5 mb-lg-0">
                    <div className="contact-details-inner mng-box-shadow">
                      <h4><b>Live Happy</b> Contact Information</h4>
                      <p>Please contact us on the above contact numbers through email , phone numbers or send a message directly we are here for and ready to help you , livehappy with fresh living place.</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="contact-single-list">
                            <h5>Email Address</h5>
                            <ul>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> nishimwelys@gmail.com</li>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> ganzanelly@gmail.com</li>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> nishimwe.elysee@auca.ac.rw</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="contact-single-list">
                            <h5>Phone Number</h5>
                            <ul>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> +(250) 780 781 546 </li>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> +(250) 727 261 200</li>
                              <li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" /> +(250) 736 172 639</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="contact-single-date">
                            <p><strong>Monday-Friday:</strong> 9am - 8pm</p>
                            <p><strong>Saturday:</strong> Closed </p>
                            <p><strong>Sunday: </strong> Closed</p>
                          </div>
                        </div>
                        <div className="col-md-6 align-self-center text-md-right">
                          <ul className="social-area style-3">
                            <li><a href="https://wwww.facebook.com"><i className="fab fa-facebook-f" aria-hidden="true" /> </a></li>
                            <li><a href="https://wwww.twitter.com"><i className="fab fa-twitter" aria-hidden="true" /> </a></li>
                            <li><a href="https://wwww.instagram.com"><i className="fab fa-instagram" aria-hidden="true" /> </a></li>
                            <li><a href="https://wwww.skype.com"><i className="fab fa-skype" aria-hidden="true" /> </a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-5">
                    <form>
                      <div className="row">
                        <div className="col-xl-6 col-md-6">
                          <div className="single-select-inner style-bg-border">
                            <select>
                              <option value={1}>General Information</option>
                              <option value={2}>General Information</option>
                              <option value={3}>General Information</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <label className="single-input-inner style-bg-border">
                            <input type="text" placeholder="Subject" />
                          </label>
                        </div>
                        <div className="col-xl-12 col-lg-6">
                          <label className="single-input-inner style-bg-border">
                            <input type="text" placeholder="Name" />
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="single-input-inner style-bg-border">
                            <input type="text" placeholder="Email" />
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="single-input-inner style-bg-border">
                            <input type="text" placeholder="Phone" />
                          </label>
                        </div>
                        <div className="col-12">
                          <label className="single-input-inner style-bg-border">
                            <textarea placeholder="Message" defaultValue={""} />
                          </label>
                        </div>
                        <div className="col-12 mb-4">
                          <button className="btn btn-base">Submit Now</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="contact-page-map mg-top-100">
                <iframe title={"googleMap"}
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.470385270579!2d30.097450950585056!3d-1.9657369985598505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnNTYuNyJTIDMwwrAwNSc1OC43IkU!5e0!3m2!1sen!2srw!4v1635422671067!5m2!1sen!2srw"
    width="600" height="450" style={{border:0}} allowFullScreen="true" loading="lazy"/>
              </div>
            </div>

        }
}

export default ContactForm
