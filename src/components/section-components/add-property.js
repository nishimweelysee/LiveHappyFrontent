import React, {useEffect, useRef, useState} from 'react';
import {Multiselect} from "multiselect-react-dropdown";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import cogoToast from "cogo-toast";

const  AddProperty= (props)=> {
      const [house,setHouse] = useState({
        name:"",
        price:"",
        houseCategory:"",
        bedrooms:0,
        kitchens:0,
        livingRoom:0,
        bathrooms:0,
        area:"",
        yearBuilt:"",
        sqft:"",
        images:null,
        amenities:[],
        googleMapLocation:"",
        description:"",
        district:"",
        sector:"",
        cell:"",
        street:""
      });


      let nameRef= useRef();let priceRef= useRef();let categoryRef= useRef();let bedroomsRef= useRef();let kitchensRef= useRef();let livingRoomRef= useRef();let bathroomsRef= useRef();let areaRef= useRef();let yearBuiltRef= useRef();let sqftRef= useRef();let imageRef= useRef();let descriptionRef= useRef();let districtRef= useRef();let sectorRef= useRef();let cellRef = useRef();let streetRef = useRef()
      let publicUrl = process.env.PUBLIC_URL+'/'
      const handleInput = (e) =>{
        setHouse({...house,[e.target.name]:e.target.value});
      }
      const handleSelect = (e)=>{
        setHouse({...house,amenities: e})
      }

      const handleUpload = async (e)=>{
        let fileInput = e.target;
        const formdata = new FormData();
        Object.values(fileInput.files).map(fi)
        function fi(f) {
          formdata.append("files", f, f.name);
        }
        const {response,error} = await httpRequest("POST",'/api/image', formdata, {"Authorization":`Bearer ${props.user.token}`})
        if(!error){
          const images = response.data.data;
          setHouse({...house,images: images})
          cogoToast.success(response.data.message);
        }
      }
      const validateData = ()=>{
        house.name=nameRef.current.value;
        house.price=priceRef.current.value;
        house.houseCategory=categoryRef.current.value;
        house.bedrooms=bedroomsRef.current.value;
        house.kitchens=kitchensRef.current.value;
        house.livingRoom=livingRoomRef.current.value;
        house.bathrooms=bathroomsRef.current.value;
        house.area=areaRef.current.value;
        house.yearBuilt=yearBuiltRef.current.value;
        house.sqft=sqftRef.current.value;
        house.description=descriptionRef.current.value;
        house.district=districtRef.current.value;
        house.sector=sectorRef.current.value;
        house.cell=cellRef.current.value;
        house.street=streetRef.current.value;
        setHouse({...house,...house})
      }
      const handleSubmit =  async (e)=>{
        validateData();
        const {response,error} = await httpRequest("POST","/api/house",house,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
          let data = response.data;
          cogoToast.success(data.message);
          console.log(data);
        }
      }



    const [categories,setCategories] = useState([])
    useEffect(()=>{
      async function fetchData() {
        const {response,error} = await httpRequest("GET","/api/category");
        if(!error){
          let data = response.data;
          cogoToast.success(data.message);
          setCategories(data.data);
        }
      }
      fetchData();
    },[])
  const printMessage = (evt)=>{
        console.log(evt)
    console.log("Triggered")
  }
    useEffect(()=>{
      document.getElementById('category').addEventListener('change', printMessage)
    },[])
    return <div className="add-property-area pd-top-120">
              <div className="container">
                <form id={"houseFrom"}>
                  <div className="btn btn-base hover-none">Basic Information</div>
                  <div className="property-form-grid">
                    <div className="row">
                      <div className="col-12">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">House Title</span>
                          <input type="text" ref={nameRef} value={house.name} onChange={handleInput} name={"name"} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Price/Month</span>
                          <input type="text" ref={priceRef} value={house.price} onChange={handleInput} name={"price"}/>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="single-select-inner style-bg-border">
                          <span className="label">Category</span>
                          <select id={"category"} ref={categoryRef}   value={house.houseCategory} onChange={handleInput} name={"houseCategory"}>
                            {
                              categories.map((cat,index)=>{
                                return <option key={index} value={cat.id}>{cat.name}</option>
                              })
                            }
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="single-select-inner style-bg-border">
                          <span className="label">Beds</span>
                          <select  value={house.bedrooms} ref={bedroomsRef} onChange={handleInput}name={"bedrooms"}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="single-select-inner style-bg-border">
                          <span className="label">Amenities</span>
                          <Multiselect
                              value={house.amenities}
                              isObject={false}
                              onRemove={function noRefCheck(){}}
                              onSearch={function noRefCheck(){}}
                              onSelect={handleSelect}
                              options={[
                                'Car Parking',
                                'Air Condition',
                                'Internet',
                                'Power backup',
                                'Sports and Recreation',
                                  'Security system',
                                  'Gym and spa',
                                  'Water supply',
                                  'Near Schools'
                              ]}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-select-inner style-bg-border">
                          <span className="label">Kitchens</span>
                          <select value={house.kitchens} ref={kitchensRef} onChange={handleInput} name={"kitchens"}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="single-select-inner style-bg-border">
                          <span className="label">LivingRooms</span>
                          <select value={house.livingRoom} ref={livingRoomRef} onChange={handleInput} name={"livingRoom"}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Baths</span>
                          <input type="number" value={house.bathrooms} ref={bathroomsRef} onChange={handleInput} name={"bathrooms"} />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Area</span>
                          <input type="number" value={house.area} ref={areaRef} onChange={handleInput} name={"area"} />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">YearBuilt</span>
                          <input type="number" value={house.yearBuilt} ref={yearBuiltRef} onChange={handleInput} name={"yearBuilt"} />
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Sqft</span>
                          <input type="number" value={house.sqft} ref={sqftRef} onChange={handleInput} name={"sqft"} />
                        </label>
                      </div>
                      <div className="col-12">
                        <div className="avatar-upload-input text-center">
                          <img src={publicUrl+"assets/img/icon/upload.png"} alt="img" />
                          <h2>Upload your photo</h2>
                          <p>Its must be a clean photo</p>
                          <div className="avatar-edit-input">
                            <input className="btn btn-base"  name={"images"} ref={imageRef} onChange={handleUpload} type="file" multiple id="imageUpload" size={"1048576"} accept=".png, .jpg, .jpeg" />
                            <label className="btn btn-base" htmlFor="imageUpload">Click here to Upload</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">District</span>
                          <input type="text" value={house.district} ref={districtRef} onChange={handleInput} name={"district"} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Sector</span>
                          <input type="text" value={house.sector} ref={sectorRef} onChange={handleInput} name={"sector"} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Cell</span>
                          <input type="text" value={house.cell} ref={cellRef} onChange={handleInput} name={"cell"} />
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Street Code</span>
                          <input type="text" value={house.street} ref={streetRef} onChange={handleInput} name={"street"} />
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Google Map Location(Copy and Past the Iframe here  <a href={"https://www.google.rw/maps?hl=en&authuser=0"} rel="noopener noreferrer" target={'_blank'}>Google Map</a>)</span>
                          <input type="text" value={house.googleMapLocation} onChange={handleInput} name={"googleMapLocation"} />
                        </label>
                      </div>
                      <div className="col-md-12">
                        <label className="single-input-inner style-bg-border">
                          <span className="label">Description</span>
                          <textarea type="text" value={house.description} ref={descriptionRef} onChange={handleInput} name={"description"} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="property-form-grid">
                    <div className="row">
                      <div className="col-12 text-center mb-4">
                        <button className="btn btn-base" type={"button"} onClick={handleSubmit}>Submit Now</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(AddProperty)
