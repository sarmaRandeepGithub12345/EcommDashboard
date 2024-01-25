import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  backendBase,
  backendUrl,
  checkTokenValidity,
} from "../utils/commonItems";
import { FaSearch } from "react-icons/fa";
import useCommonItems from "../utils/useCommonItems";
import CustomToast from "../components/CustomToast";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const ProductList = () => {
  const [data, setData] = useState([]);
  const {
    visible,
    setvisible,
    handleClose,
    messageToast,
    toastChangeFunct,
    obj,
  } = useCommonItems();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}get_all_products`);
        //console.log(res.data.data)
        setData(res.data.data);
      } catch (error) {
        toastChangeFunct(
          error.response.data.result,
          error.response.data.message
        );
        setvisible(true);
      }
      setTimeout(() => {
        setvisible(false);
        toastChangeFunct("", "");
      }, 2000);
    };
    fetchData();
  }, []);
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios(`${backendUrl}delete/${id}`, {
        method: "DELETE",
      });
      //deleting the item from window
      let newArr = data?.filter(item=>item.id!==id);
      setData(newArr);
      toastChangeFunct(res.data.result, res.data.message);

      setvisible(true);
    } catch (error) {
      toastChangeFunct(error.response.data.result, error.response.data.message);
      setvisible(true);
    }
    setTimeout(() => {
      setvisible(false);
      toastChangeFunct("", "");
    }, 2000);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `${backendUrl}search/${e.target.value === "" ? "none" : e.target.value}`
      );
      setData(res.data.data);
    } catch (error) {}
  };

  return (
    <div className="w-[100%] min-h-[100vh] bg-[#202020]">
      <Header />
      <div className="w-[100%] flex flex-row justify-between mt-[20px] px-[20px] 400:px-[30px] ">
        <div className="flex flex-row items-center bg-[white]   rounded-[5px] w-[130px] 400:w-[200px] ">
          <input
            type="text"
            onChange={handleSearch}
            className="pl-2 w-[90%] h-[30px] resize-none outline-none"
          />
          <FaSearch className="mx-2  cursor-pointer " onClick={handleSearch} />
        </div>

        <Link
          to="/add_product"
          className="rounded-[5px] bg-[#3f56ff] px-2 h-[40px] w-fit text-[white] text-[15px] hover:opacity-50 flex flex-row items-center "
        >
          <IoMdAddCircle className="text-[18px] mr-2" />
          Add
        </Link>
      </div>

      <div className="mx-auto  grid 1200:grid-cols-4 900:grid-cols-3 700:grid-cols-2 400:grid-cols-2 grid-cols-1  grid-flow-row mt-[20px] justify-items-center gap-[20px] px-[20px]  400:gap-[30px] 400:px-[30px]">
        {data?.map((item, id) => (
          <div
            key={id}
            className="text-[#c6c6c6] shadow-[1px_1px_3px_2px_rgba(0,0,0,0.2)] bg-[#343434]  w-[100%]   px-2 py-3 Product"
          >
            <img
              src={`${backendBase}${item.file_path}`}
              className="aspect-square object-center object-cover w-full "
            />
            <p className="text-[25px] text-[white] font-[500] ProductName">
                {item.name}
              </p>
            <div className="w-[100%] flex flex-row justify-between mt-[20px]">
            <p>₹ {item.price}</p>
              <div className="flex flex-row">
                <Link
                  onClick={(e) => handleDelete(e, item.id)}
                  to={`/delete_product/${item.id}`}
                  className=" rounded-[5px] bg-[white]  h-fit p-1 w-fit text-[red] text-[15px] hover:opacity-50 flex flex-row items-center"
                >
                  <MdDelete className="text-[20px] " />
                </Link>
                <Link
                  to={`/update_product/${item.id}`}
                  className=" rounded-[5px] bg-[white]  h-fit p-1 w-fit text-[#208c40] text-[15px] hover:opacity-50 flex flex-row items-center ml-2"
                >
                  <MdModeEditOutline className="text-[20px] " />
                </Link>
              </div>
            </div>

           
            <p className="text-[16px] mt-[20px] text-[white]">Description</p>
            <p className="text-[14px] break-words">{item.description}</p>
          </div>
        ))}
      </div>
      <CustomToast
        visible={visible}
        onClose={handleClose}
        messageToast={messageToast}
        values="flex flex-row items-end justify-center pb-[20px]"
      />
    </div>
  );
};

export default ProductList;
