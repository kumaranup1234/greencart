import React, {useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const fileInputRef = useRef();
    const {user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios} = useAppContext();

    const logout = async ()=>{
      try {
        const { data } = await axios.post('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
        
    }

    const handleAllProductsClick = () => {
        setSearchQuery('')
    }
    const handleCameraClick = (event) => {
        try {
            event.preventDefault();
            fileInputRef.current.click();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleFileChange = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);
            toast.loading("Finding products...")

            const { data } = await axios.post("/api/product/imageSearch", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(data);
            if (data.success) {
                toast.dismiss();
                setSearchQuery(data.description);
                toast.success("Search results updated.");
                event.target.value = null;
            } else {
                event.target.value = null;
                toast.error("No result from image search.");
            }

        } catch (error) {
            console.error(error);
            toast.error("Image search failed.");
        }
    };

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/products")
      }
    },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      <NavLink to='/' onClick={()=> setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

        <div className="hidden sm:flex items-center gap-8">
            <NavLink to='/seller' className="border border-gray-300 px-3 py-1 rounded-full text-xs cursor-pointer opacity-80">Seller
                Dashboard
            </NavLink>
            <NavLink to='/'>Home </NavLink>
            <NavLink to='/products' onClick={handleAllProductsClick}>All Product</NavLink>
            <NavLink to='/contact-us'>Contact</NavLink>


            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input onChange={(e) => setSearchQuery(e.target.value)}
                       className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text"
                       placeholder="Search products"/>
                <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <img src={assets.camera} alt='search' className='w-4 h-4 cursor-pointer' onClick={handleCameraClick}/>
            </div>

            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                <button
                    className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
            </div>

            {!user ? (<button onClick={() => setShowUserLogin(true)}
                              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>)
                :
                (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10' alt=""/>
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={() => navigate("my-orders")}
                                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders
                            </li>
                            <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}
        </div>

        <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>
    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
        <img  src={assets.menu_icon} alt='menu'/>
      </button>
</div>
      

      { open && (
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}>
            <NavLink to="/seller" onClick={()=> setOpen(false)}>Seller Dashboard</NavLink>
        <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={()=> setOpen(false)}>All Product</NavLink>
        {user && 
        <NavLink to="/my-orders" onClick={()=> setOpen(false)}>My Orders</NavLink>
        }
        <NavLink to="/contact-us" onClick={()=> setOpen(false)}>Contact</NavLink>

        {!user ? (
          <button onClick={()=>{
            setOpen(false);
            setShowUserLogin(true);
          }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
          Login
        </button>
        ) : (
          <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
          Logout
        </button>
        )}
        
      </div>
      )}

    </nav>
  )
}

export default Navbar
