import { NavLink } from "react-router-dom"
import "./Sidebar.css"
function Sidebar({ isOpen, onNavigate }){
    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <h2 className="logo">Finance App</h2>
            <ul>
               <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? "link active" : "link"} onClick={onNavigate}>Dashboard</NavLink>
                </li>
                <li>    
                    <NavLink to='/transactions' className={({ isActive }) => isActive ? "link active" : "link"} onClick={onNavigate}>Transactions</NavLink>
                </li>
                <li>
                    <NavLink to='/reports' className={({ isActive }) => isActive ? "link active" : "link"} onClick={onNavigate}>Insights</NavLink>    
                </li> 
            </ul>
        </div>
    )

}

export default Sidebar