import React, {useContext, useEffect, useRef, useState} from 'react';
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import HouseBox from "./global-components/HouseBox";
import {UserContext} from "../context/UserContext";
import {Clear} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import  _ from "lodash";


function Find(props) {
    const search = props.location.state || {};
    const {house,categories,getHouses} = useContext(UserContext)
    const [filteredHouse,setFilteredHouse] = useState([]);
    const optionInitialState  = {
        category:[],
        district:[],
        rates:[],
        prices:[],
        price:{
            min:"",
            max:""
        }
    }
    const [options,setOptions] = useState({...optionInitialState})


    const getCateName = (id)=>{
        let name = "";
        categories.map(h=>{
            if(h.id==id){
                name=h.name;
                return;
            }
        })
        return name;
    }



    const reset = ()=>{
        setOptions({...optionInitialState});
        setFilteredHouse(house);
    }
    let storeData =  [];
    const filterByCategory = () =>{
        if(options.category.length>0) {
            let datas = house.filter(fh=>{
                return options.category.includes(fh.houseCategory.id);
            });
            let data2 = _.values(_.merge(_.keyBy(datas, 'id'), _.keyBy(storeData, 'id')));
            storeData = data2;
            setFilteredHouse(data2);
        }
    }
    const filterByPrice = () =>{
        if(options.prices.length>0) {
            let datas = house.filter(fh=>{
                return options.prices.some(op=>{
                    let  min = Number(op.min);
                    let max = Number(op.max);
                    return isNaN(max)? fh.price > min:_.inRange(fh.price,min,max);
                });
            });
            let data2 = _.values(_.merge(_.keyBy(datas, 'id'), _.keyBy(storeData, 'id')));
            storeData = data2;
            setFilteredHouse(data2);
        }
    }
    const filterByRates = () =>{
        if(options.rates.length>0) {
            let datas = house.filter(fh=>{
                return options.rates.includes(Math.round(fh.landLord.averageRate));
            });

            let data2 = _.values(_.merge(_.keyBy(datas, 'id'), _.keyBy(storeData, 'id')));
            storeData = data2;
            setFilteredHouse(data2);
        }
    }
    const filterByLocation = () =>{
        if(options.district.length>0) {
            let datas = house.filter(fh=>{
                return options.district.includes(fh.district);
            });

            let data2 = _.values(_.merge(_.keyBy(datas, 'id'), _.keyBy(storeData, 'id')));
            storeData = data2;
            setFilteredHouse(data2);
        }
    }

    let minRef = useRef();
    let maxRef = useRef();
    const handleGo = ()=>{
        let min = Number(minRef.current.value);
        let max = Number(maxRef.current.value);
        options.prices.push({min,max});
        setOptions({...options,...options})
    }


    const clearSearchState = (name,data)=>{
        let index = options[name].indexOf(data);
        options[name].splice(index,1);
        setOptions({...options,...options});
    }

    useEffect(()=>{
        filterByCategory();
        filterByLocation();
        filterByRates();
        filterByPrice();
    },[options])

    useEffect(()=>{
        setFilteredHouse([...house]);
    },[house])

    useEffect(()=>{
        let size = Object.values(search).length;
        if(size>0){
            if(search.category!=="-1"){
                options.category.push(Number(search.category));
            }
            if(search.location!==""){
                options.district.push(search.location);
            }
            console.log(options)
            setOptions({...options,...options});
        }
    },[])

    const handleSelectFilter = (name,e)=>{
        let value;
        let index;
        try {
            value = JSON.parse(e.target.value);
            if(typeof value==="object"){
                index = _.findIndex(options[name],value,0);
            }else{
                value = Number(e.target.value);
                index = options[name].indexOf(value);
            }
        }catch (error) {
            value = e.target.value;
            console.log(value)
            index = options[name].indexOf(value);
        }
        if(index>=0){
            options[name].splice(index,1);
        }else{
            options[name].push(value);
        }
        setOptions({...options,...options})
    }


    return (
        <div>
            <Navbar />
            <PageHeader headertitle="Search"  />
            <div className={"p-4"}>
                <div className={"flex flex-wrap gap-4 justify-content-end"}>
                    {
                        options.district.map((d,index)=>(
                            <div key={index} className={"p-1 bg-gray-200"}>{d}<Clear onClick={e=>clearSearchState("district",d)} className={"cursor-pointer"} color={"error"}/></div>
                        ))
                    }
                    {
                        options.category.map((c,index)=>(
                            <div key={index} className={"p-1 bg-gray-200"}>{getCateName(c)}<Clear onClick={e=>clearSearchState("category",c)} className={"cursor-pointer"} color={"error"}/></div>
                        ))
                    }
                    {
                        options.rates.map((c,index)=>(
                            <div key={index} className={"p-1 bg-gray-200"}>{c} Stars<Clear onClick={e=>clearSearchState("rates",c)} className={"cursor-pointer"} color={"error"}/></div>
                        ))
                    }
                    {
                        options.prices.map((c,index)=>(
                            <div key={index} className={"p-1 bg-gray-200"}>{c.min} to {c.max} Rwf<Clear onClick={e=>clearSearchState("prices",c)} className={"cursor-pointer"} color={"error"}/></div>
                        ))
                    }
                    <div>
                        <button onClick={reset} className={"p-1 hover:bg-blue-700 hover:text-white rounded border-2 border-blue-500"}>Reset</button>
                    </div>
                </div>
                <div className={"grid grid-cols-5 gap-2"}>
                    <div className={"w-90 h-100vh overflow-y-scroll"}>
                        <div>
                            <h2>House Categories</h2>
                            <div>
                                {
                                    categories.map((cat,index)=>(
                                        <div key={index}>
                                            <input type={"checkbox"} checked={options.category.includes(cat.id)} value={cat.id} onChange={e=>handleSelectFilter("category",e)} id={`cat${cat.id}`} />
                                            <label className={"mx-2"} htmlFor={`cat${cat.id}`}>{cat.name}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <h2>Avg Landlord Review</h2>
                            <div className={"flex flex-col"}>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(5)} value={5} onChange={e=>handleSelectFilter("rates",e)} id={`rate5`} />
                                    <label className={"mx-2"} htmlFor={`rate5`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={5} readOnly /> <span>& Up</span></div>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(4)} value={4} onChange={e=>handleSelectFilter("rates",e)} id={`rate4`} />
                                    <label className={"mx-2"} htmlFor={`rate4`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={4} readOnly /> <span >& Up</span></div>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(3)} value={3} onChange={e=>handleSelectFilter("rates",e)} id={`rate3`} />
                                    <label className={"mx-2"} htmlFor={`rate3`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={3} readOnly/> <span >& Up</span></div>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(2)} value={2} onChange={e=>handleSelectFilter("rates",e)} id={`rate2`} />
                                    <label className={"mx-2"} htmlFor={`rate2`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={2} readOnly/> <span >& Up</span></div>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(1)} value={1} onChange={e=>handleSelectFilter("rates",e)} id={`rate1`} />
                                    <label className={"mx-2"} htmlFor={`rate1`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={1} readOnly/> <span >& Up</span></div>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={options.rates.includes(0)} value={0} onChange={e=>handleSelectFilter("rates",e)} id={`rate0`} />
                                    <label className={"mx-2"} htmlFor={`rate0`}>
                                        <div className={"hover:text-blue-400 cursor-pointer flex"} onClick={e=>handleSelectFilter("rates",e)}><Rating name="read-only" value={0} readOnly  /> <span >& Up</span></div>
                                    </label>
                                </div>
                            </div>
                            <h2>Price</h2>
                            <div className={"flex flex-col gap-2"}>
                                <div>
                                    <input type={"checkbox"} checked={_.some(options.prices,{min:"0",max:"25000"})} value={JSON.stringify({min:"0",max:"25000"})} onChange={e=>handleSelectFilter("prices",e)} id={`price1`} />
                                    <label className={"mx-2"} htmlFor={`price1`}>
                                        <span className={"cursor-pointer hover:text-blue-400"}>Under Rwf 25k</span>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={_.some(options.prices,{min:"25000",max:"50000"})} value={JSON.stringify({min:"25000",max:"50000"})} onChange={e=>handleSelectFilter("prices",e)} id={`price2`} />
                                    <label className={"mx-2"} htmlFor={`price2`}>
                                        <span className={"cursor-pointer hover:text-blue-400"}>Rwf 25k to Rwf 50k</span>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={_.some(options.prices,{min:"50000",max:"100000"})} value={JSON.stringify({min:"50000",max:"100000"})} onChange={e=>handleSelectFilter("prices",e)} id={`price3`} />
                                    <label className={"mx-2"} htmlFor={`price3`}>
                                        <span className={"cursor-pointer hover:text-blue-400"}>Rwf 50k to Rwf 100k</span>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={_.some(options.prices,{min:"100000",max:"200000"})} value={JSON.stringify({min:"100000",max:"200000"})} onChange={e=>handleSelectFilter("prices",e)} id={`price4`} />
                                    <label className={"mx-2"} htmlFor={`price4`}>
                                        <span className={"cursor-pointer hover:text-blue-400"}>Rwf 100k to Rwf 200k</span>
                                    </label>
                                </div>
                                <div>
                                    <input type={"checkbox"} checked={_.some(options.prices,{min:"200000",max:"above"})} value={JSON.stringify({min:"200000",max:"above"})} onChange={e=>handleSelectFilter("prices",e)} id={`price5`} />
                                    <label className={"mx-2"} htmlFor={`price5`}>
                                        <span className={"cursor-pointer hover:text-blue-400"}>Rwf 200k & Above</span>
                                    </label>
                                </div>
                                <div className={"flex gap-2"}><input ref={minRef}  placeholder={"Min"} name={"min"} className={"w-16 p-2 border-2 border-gray-200 rounded-xl"} type={'number'}/><input placeholder={"Max"} ref={maxRef} name={"max"} className={"w-16 p-2 border-2 border-gray-200 rounded-xl"} type={'number'}/><button onClick={handleGo} className={"p-2 border-2 border-gray-200 rounded-xl"}>Go</button></div>
                            </div>
                            <h2>Location</h2>
                            <div className={"my-1"}>
                                <fieldset>
                                    <legend className={"text-base"}>Kigali City</legend>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyarugenge")} value={"Nyarugenge"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyarugenge`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyarugenge`}>Nyarugenge</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Kicukiro")} value={"Kicukiro"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Kicukiro`} />
                                        <label className={"mx-2"} htmlFor={`dist-Kicukiro`}>Kicukiro</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Gasabo")} value={"Gasabo"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Gasabo`} />
                                        <label className={"mx-2"} htmlFor={`dist-Gasabo`}>Gasabo</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className={"text-base"}>Northern Province</legend>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Burera")} value={"Burera"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Burera`} />
                                        <label className={"mx-2"} htmlFor={`dist-Burera`}>Burera</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Gakenke")} value={"Gakenke"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Gakenke`} />
                                        <label className={"mx-2"} htmlFor={`dist-Gakenke`}>Gakenke</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Gicumbi")} value={"Gicumbi"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Gicumbi`} />
                                        <label className={"mx-2"} htmlFor={`dist-Gicumbi`}>Gicumbi</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Rulindo")} value={"Rulindo"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Rulindo`} />
                                        <label className={"mx-2"} htmlFor={`dist-Rulindo`}>Rulindo</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Musanze")} value={"Musanze"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Musanze`} />
                                        <label className={"mx-2"} htmlFor={`dist-Musanze`}>Musanze</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className={"text-base"}>Southern Province</legend>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Gisagara")} value={"Gisagara"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Gisagara`} />
                                        <label className={"mx-2"} htmlFor={`dist-Gisagara`}>Gisagara</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Huye")} value={"Huye"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Huye`} />
                                        <label className={"mx-2"} htmlFor={`dist-Huye`}>Huye</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Kamonyi")} value={"Kamonyi"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Kamonyi`} />
                                        <label className={"mx-2"} htmlFor={`dist-Kamonyi`}>Kamonyi</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Muhanga")} value={"Muhanga"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Muhanga`} />
                                        <label className={"mx-2"} htmlFor={`dist-Muhanga`}>Muhanga</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyamagabe")} value={"Nyamagabe"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyamagabe`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyamagabe`}>Nyamagabe</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyanza")} value={"Nyanza"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyanza`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyanza`}>Nyanza</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyaruguru")} value={"Nyaruguru"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyaruguru`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyaruguru`}>Nyaruguru</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Ruhango")} value={"Ruhango"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Ruhango`} />
                                        <label className={"mx-2"} htmlFor={`dist-Ruhango`}>Ruhango</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className={"text-base"}>Eastern Province</legend>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Bugesera")} value={"Bugesera"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Bugesera`} />
                                        <label className={"mx-2"} htmlFor={`dist-Bugesera`}>Bugesera</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Gatsibo")} value={"Gatsibo"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Gatsibo`} />
                                        <label className={"mx-2"} htmlFor={`dist-Gatsibo`}>Gatsibo</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Kayonza")} value={"Kayonza"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Kayonza`} />
                                        <label className={"mx-2"} htmlFor={`dist-Kayonza`}>Kayonza</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Kirehe")} value={"Kirehe"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Kirehe`} />
                                        <label className={"mx-2"} htmlFor={`dist-Kirehe`}>Kirehe</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Ngoma")} value={"Ngoma"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Ngoma`} />
                                        <label className={"mx-2"} htmlFor={`dist-Ngoma`}>Ngoma</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyagatare")} value={"Nyagatare"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyagatare`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyagatare`}>Nyagatare</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Rwamagana")} value={"Rwamagana"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Rwamagana`} />
                                        <label className={"mx-2"} htmlFor={`dist-Rwamagana`}>Rwamagana</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className={"text-base"}>Western Province</legend>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Karongi")} value={"Karongi"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Karongi`} />
                                        <label className={"mx-2"} htmlFor={`dist-Karongi`}>Karongi</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Ngororero")} value={"Ngororero"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Ngororero`} />
                                        <label className={"mx-2"} htmlFor={`dist-Ngororero`}>Ngororero</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyabihu")} value={"Nyabihu"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyabihu`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyabihu`}>Nyabihu</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Nyamasheke")} value={"Nyamasheke"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Nyamasheke`} />
                                        <label className={"mx-2"} htmlFor={`dist-Nyamasheke`}>Nyamasheke</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Rubavu")} value={"Rubavu"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Rubavu`} />
                                        <label className={"mx-2"} htmlFor={`dist-Rubavu`}>Rubavu</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Rusizi")} value={"Rusizi"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Rusizi`} />
                                        <label className={"mx-2"} htmlFor={`dist-Rusizi`}>Rusizi</label>
                                    </div>
                                    <div>
                                        <input type={"checkbox"} checked={options.district.includes("Rutsiro")} value={"Rutsiro"} onChange={e=>handleSelectFilter("district",e)} id={`dist-Rutsiro`} />
                                        <label className={"mx-2"} htmlFor={`dist-Rutsiro`}>Rutsiro</label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="row col-span-4 justify-content-start border-left px-4">
                        {
                            Object.values(filteredHouse).map((h,index)=>{
                                const landlord =h.landLord;
                                return  <HouseBox key={index} value={2} index={index} h={h} landlord={landlord}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Find;
