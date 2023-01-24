import { RiAdminLine } from "react-icons/Ri"
import "../../css/admin/adminLogin.css"
import school_3 from "../../assets/client/img/school_logo_3.png"
import axios from "../../config/baseAxios";
import roles from "../../config/roles.json"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

function AdLogin(){

    const navigate = useNavigate();

    useEffect(() => {
        const getAuth = async() => {
            const response = await axios.get("/auth")
            if(response.data.isLogin && (response.data.role == roles.libralian)) return navigate('/system')
        }
        getAuth();
    }, [])

    function onSubmit(event:any){
        event?.preventDefault();

        let username:string = event.target.user.value;
        let pwd:string = event.target.pwd.value;

        const data = { user:username, pwd:pwd }

        const resLogin = async() => {
            let response = await axios.post("/login", data, { headers : { "Content-Type" : "application/json"}});
            if (response.data.role == roles.libralian) return navigate('/system', )
        }
        resLogin();
    }
    return (
        <div className="login">
        <p>
            <img className="school_logo" src={school_3}/>
        </p>
        <form onSubmit={onSubmit}>
            <p className="login_header">login admin <RiAdminLine size="25px"></RiAdminLine></p>
            <p className="color">
                <Form.Control type="user" name="user" placeholder="Username" className="text_search"/>
            </p>
            <p className="color">
                <Form.Control type="password" name="pwd" placeholder="Password" className="text_search_2"/>
            </p>
            <button className="button_login" type="submit">Login</button>
        </form>
    </div>
    )
}

export default AdLogin;