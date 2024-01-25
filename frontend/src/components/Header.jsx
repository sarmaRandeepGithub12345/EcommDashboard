import React, { useEffect } from "react";
import icon from "../pictures/icon.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { backendUrl, checkTokenValidity } from "../utils/commonItems";
import { setLocalItem } from "../utils/local_storage_helpers";
import axios from "axios";
import { useDispatch } from "react-redux";
import useCommonItems from "../utils/useCommonItems";
import { changeToken, changeUserData } from "../utils/CounterSlice";
const Header = () => {
  const linkArr = [
    {
      text: "Add",
      link: "/add_product",
    },
    {
      text: "Update",
      link: "/update_product",
    },
  ];
  
  const navigate = useNavigate();
  const {dispatch,obj } = useCommonItems()

  //logout incase token expires
  useEffect(() => {
    async function temp() {
      if(!checkTokenValidity(obj.token)){
          await handleLogout()
      }
    }
    temp();
  }, []);
  const handleClick = (e, link) => {
    e.preventDefault();
    navigate(`${link}`);
  };
  const handleLogout = async () => {
    
    try {
      const res = await axios.get(`${backendUrl}logout`,{
        headers:{
          "Authorization":`Bearer ${obj.token}`
        }
      });
      setLocalItem("user", null);
      setLocalItem("token", null);
      dispatch(changeUserData(null));
      dispatch(changeToken());
      navigate("/")
    } catch (error) {}
  };
  return (
    <div className="Header w-[100%] bg-gray-800 flex flex-row text-white h-[60px] items-center justify-between">
      <img src={icon} alt="" srcSet="" className="w-10 h-10 ml-3" />
      <div className="flex flex-row">
        
          <Link
            
            to={`/all_products`}
            className="text-[#bbbbbb] cursor-pointer ml-6 hover:text-[white] font-[500] text-[18px]"
          >
            Dashboard
          </Link>
       
      </div> 
      <p
        onClick={handleLogout}
        className="text-[#bbbbbb] mr-3 cursor-pointer ml-6 hover:text-[white] font-[500] text-[13px]"
      >
        Logout
      </p>
    </div>
  );
};

export default Header;
