import React from 'react';
import {Link} from "react-router-dom";

class AdminMain extends React.Component {
    render() {
        return (
            <div>
                <div><Link to={"/"}>홈으로</Link></div>
                설문지 관리
            </div>
        )
    }
}

export default AdminMain;