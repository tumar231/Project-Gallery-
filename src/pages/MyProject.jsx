/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useState, useEffect, useContext } from "react"
import { API_BASE_URL } from "../assets/Proxy"
import axios from "axios"
import { UserContext } from '../context/UsersContext';
import FakeSpinner from '../components/FakeSpinner'
import HeadText from "../components/HeadText"
import ShowRoomCard from "../layouts/ShowRoomCard"


const MyProject = () => {


   const navigate = useNavigate()
   const { user, getUser } = useContext(UserContext)
   const token = localStorage.getItem('collab_token')
   const [loading, setLoading] = useState(true)
 
   useEffect(() => {
     if(!token){
       navigate('/login')
     }
     if(token){
       getUser()
     }
 
   },[])
 
   useEffect(() => {
      if(user){
         getMyProject()
      }
   }, [user])

   const [projectList, setProjectList] = useState([])

   const getMyProject = () => {
      
      axios.get(`${API_BASE_URL}/api/myprojects/${user.user_id}}`)
      .then(response => {
         console.log(response.data);
         setProjectList(response.data.projects)
      })
      .then(error => {
         console.error('There was an error!', error);
      })
      .finally(() => {
         setLoading(false)
      })
   }

   function formatDate(laravelDate) {
      const date = new Date(laravelDate);
      
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${month}/${day}/${year}`;
  }


  return (
    <>
      <NavBar />
      
      <div className="w-full mx-1 mt-2">
               
         <div className="body w-11/12 md:w-8/12 m-auto"> 
            <div className="border p-2">
               <div className="flex justify-between items-center">
                   <HeadText text={'My Project'}/>
                   <NavLink to='/new-project'>
                     <li className="bg-gray-900 text-white p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-950 hover:text-gray-50">
                        <span className="hidden md:flex font-semibold ml-1">Add Project</span>
                        <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </span> 
                     </li>
                  </NavLink>
               </div>
            </div>
            {loading && <FakeSpinner />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
               { projectList.length > 0 && projectList.map((project, index) => (
               <NavLink key={index} to={`/my-project/${project.project_id}`}>
                  <ShowRoomCard project={project} />
               </NavLink>
               ))}
            </div>
          
         
         </div>
      </div> 

    </>
  )
}

export default MyProject