import React from "react"
import school10 from "../assets/school_logo_10.png"
import backbutton from "../assets/back_button.png"
import { NavLink, Outlet } from "react-router-dom"
import menubarStyles from "../css/menubar.module.css"
import { useCart } from "../context/CartContext"
import { Button } from "react-bootstrap"

function AppBar(){

    const { openCart, cartQuantity } = useCart()

    function getNavClass(navLinkProps:any){
        let navClass  = menubarStyles.app_header_item;
        if (navLinkProps.isActive) navClass += ` ${menubarStyles.app_header_item_active}`;
        return navClass;
    }

    return (
        <div>
            <header className={menubarStyles.header}>
                <div>
                    <div className={menubarStyles.header_1}>
                        <div className={menubarStyles.position}>
                            <div>
                                <img 
                                    src={school10}
                                    className={menubarStyles.school_image}
                                />
                            </div>
                            <div className={menubarStyles.big_box_username}>
                                <div className={menubarStyles.box_username}>
                                    <div className={menubarStyles.username}>
                                        login
                                    </div>                                
                                </div>
                                <div className={menubarStyles.big_box_back_button}>
                                    <button className={menubarStyles.small_box_back_button}>
                                        <img
                                            src={backbutton}
                                            className={menubarStyles.back_button}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={menubarStyles.header_2}>
                            <NavLink className={getNavClass} to="/home">หน้าแรก</NavLink>
                            <NavLink className={getNavClass} to="/list">รายการหนังสือ</NavLink>
                            <NavLink className={getNavClass} to="/history">ประวัติการยืม-คืนหนังสือ</NavLink>
                            <Button onClick={openCart}>{cartQuantity}</Button>
                    </div>    
                </div>
            </header>
            <Outlet/>
        </div>
    )
}

export default AppBar;