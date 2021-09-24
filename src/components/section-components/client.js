import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Client extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div>
          <div className="client-area client-area-pd bg-overlay pd-top-118" style={{background: 'url('+publicUrl+'assets/img/other/1.png)'}}>
            <div className="container">
              <div className="row justify-content-center text-lg-left text-center">
                <div className="col-lg-9">
                  <div className="section-title style-white mb-0">
                    <h6>Rent</h6>
                    <h2>Find Best Place For Leaving</h2>
                    <p>Lorem ipsum dolor  amet, consecteLorem ipsum dolor sit amet, consectetur adipisicing sed do eiusmod tempor incididunt dolore magna consecteLorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
                  </div>
                </div>
                <div className="col-lg-3 align-self-end text-lg-right mt-4 mt-lg-0 go-top">
                  <Link className="btn btn-base" to="/add-property">SUBMIT</Link>
                </div>
              </div>
            </div>
          </div>
    </div>

        }
}

export default Client