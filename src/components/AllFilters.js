import React from "react";
import FilterGender from "./FilterGender";
import FilterType from "./FilterType";
import SearchPanel from "./SearchPanel";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AllFilters() {
  const dispatch = useDispatch();
  const currReferenceList = useSelector((state) => state.reducer.referenceList);

  const [searchParam, setSearchParam] = useState('')
  const [setType, setSetType] = useState([])
  const [setGender, setSetGender] = useState([])

  const dynamicFilter = (search = searchParam, selected = setType, selectedGen = setGender) =>{
    if(search && search !== ""){
        setSearchParam(search)
    } else{
        setSearchParam('')
    }
    if(selected.length){
        setSetType(selected)
    } else{
        setSetType([])
    }
    if(selectedGen.length){
        setSetGender(selectedGen)
    } else{
        setSetGender([])
    }
}
   const triggerFilter =() => {

    if (searchParam) {
        var filteredData = currReferenceList.filter((item) => {
          let eachItem = item.data;
          if (isNaN(+searchParam) || !searchParam) {
            isNaN(+"abc");
            return (
              eachItem.name.toLowerCase().indexOf(searchParam.toLowerCase()) !==
              -1
            );
          } else {
            return eachItem.id.toString().includes(searchParam);
          }
        });
        dispatch(actions.replaceList(filteredData));
      } else{
        filteredData = currReferenceList
      }

      if (setType && setType.length && filteredData) {
        var arr = filteredData.filter((eachItem) => {
          return setType.some((f) => {
            return (
              f.label === eachItem.data.types[0]?.type?.name ||
              f.label === eachItem.data.types[1]?.type?.name
            );
          });
        });
        dispatch(actions.replaceList(arr));
      } else {
        arr = filteredData
      }

      if (setGender.length && arr) {
        var arrGen = arr.filter((eachItem) => {
          return setGender.some((f) => {
            return (
              f.label === eachItem.data.gender[0] ||
              f.label === eachItem.data.gender[1]
            );
          });
        });
  
        dispatch(actions.replaceList(arrGen));
      } else{
        arrGen = arr
        dispatch(actions.replaceList(arrGen));
      }

    if(!searchParam && !setType.length && !setGender.length){
        dispatch(actions.replaceList(currReferenceList));
    }
  }

  useEffect(()=>{
    triggerFilter();
  },[searchParam, setType, setGender,currReferenceList])

  return (
    <>
      <Row>
        <Col md={6} xs={12}>
          <p>Seach by</p>
          <SearchPanel dynamicFilter={dynamicFilter}></SearchPanel>
        </Col>
        <Col md={2} xs={6}>
          <p>Type</p>
          <FilterType dynamicFilter={dynamicFilter}></FilterType>
        </Col>

        <Col md={2} xs={6}>
          <p>Gender</p>
          <FilterGender dynamicFilter={dynamicFilter}></FilterGender>
        </Col>
      </Row>
    </>
  );
}

export default AllFilters;
