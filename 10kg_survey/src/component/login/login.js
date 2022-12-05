import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [id,setID] = useState(null);
    const [pw,setPW] = useState(null);

    async function onSubmit(){
        const res = await axios.post(process.env.REACT_APP_API+'/api/data/login');
        if(res == null){
            alert('계정이 없습니다.');
        }else{
            sessionStorage.setItem("id",res.adm_id);
            sessionStorage.setItem("pw",res.adm_pw);
            sessionStorage.setItem("grade",res.adm_grade);
            sessionStorage.setItem("dep",res.adm_depart);
            window.location.reload();
        }
    }

    function inputID(e){
        setID(e.target.value);
    }

    function inputPW(e){
        setPW(e.target.value);
    }

    return(
        <div className="login-form">
            <div className="login-width">
                <div className="login-inner">
                    <div className="login-input">
                        <p>아이디</p>
                        <input type="text" name="adminID" onChange={e=>inputID(e)}/>
                    </div>
                    <div className="login-input">
                        <p>비밀번호</p>
                        <input type="password" name="adminPW" onChange={e=>inputPW(e)}/>
                    </div>
                    <div className="login-btn">
                        <button onClick={onSubmit}>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;