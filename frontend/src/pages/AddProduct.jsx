import React, { useState } from "react";
import Header from "../components/Header";
import { backendUrl } from "../utils/commonItems";
import CustomToast from '../components/CustomToast';
import useCommonItems from "../utils/useCommonItems";
import axios from "axios";

const AddProduct = () => {
  const {visible,setvisible,handleClose,messageToast,toastChangeFunct,obj}=useCommonItems()

  const commonClass = "mt-[20px] w-[100%] rounded-[5px] px-2";
  const [requestObj, setRequestObj] = useState({
    name:"",
    price:"",
    description:""
  })
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    if (files.length === 1) {
      setSelectedFiles(files);
    }
  };
  const handleChange=(e)=>{
    e.preventDefault()
    const {value,name} = e.target;
    // if(name==="price" && regex.test(value))return;
    setRequestObj((prev)=>({...prev,[name]:value}))
  }
  const handleFormSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name',requestObj.name)
    formData.append('price',requestObj.price)
    formData.append('description',requestObj.description)
    formData.append('file',selectedFiles[0])
    // const item = {
    //   ...requestObj,
    //   "file": selectedFiles[0]
    // }
    
    try {
      const res = await axios(`${backendUrl}add_product`,{
        method: 'POST',
        data: formData,
      })
      setRequestObj({
        name:"",
        price:"",
        description:""
      })
      setSelectedFiles([])
      
      toastChangeFunct(res.data.result,res.data.message)
      setvisible(true)
    } catch (error) {
      toastChangeFunct(error.response.data.result,error.response.data.message)
      setvisible(true)
    }
    setTimeout(() => {
      setvisible(false)
      toastChangeFunct("","")
    }, 2000);
  }
  return (
    <div className="w-[100%] bg-[#202020] h-[100vh]">
      <Header />
      <form
        onSubmit={handleFormSubmit}
        className="AddProduct flex flex-col w-[80%] mx-auto text-[#4c4c4c]"
      >
        <p className="text-[white] mt-[30px] text-[23px] font-[500]">
          New Product
        </p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          value={requestObj.name}
          className={`${commonClass} h-[40px]`}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          id="price"
          onChange={handleChange}
          value={requestObj.price}
          className={`${commonClass} h-[40px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
        <textarea
          name="description"
          id="description"
          value={requestObj.description}
          onChange={handleChange}
          placeholder="Describe your product.."
          className={`${commonClass} resize-none  h-[100px]`}
        ></textarea>
        <div className="w-fit mt-[20px] flex flex-row items-center justify-between">
          <div className="mt-2  w-[90px] h-[90px] border-2 border-dashed border-white ">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-preview-image h-[100%] w-[100%] "
              />
            ))}
          </div>
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 flex w-fit h-[40px] px-2 rounded-[5px] justify-center items-center text-[white] ml-[30px]"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden "
            onChange={handleFileChange}
            name="fileInput"
          />
        </div>
        <button
          type="submit"
          className="mt-[20px] rounded-[5px] bg-[#3f56ff] px-2 h-[50px] w-fit text-[white] hover:opacity-50"
        >
          Add Product
        </button>
      </form>
      <CustomToast visible={visible} onClose={handleClose} messageToast={messageToast} values="flex flex-row items-end justify-center pb-[20px]" />

    </div>
  );
};

export default AddProduct;
