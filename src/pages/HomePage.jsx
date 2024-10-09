/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom"
// import BgImg from "../assets/images/toys-airs-bg.jpg"
import SingleShowRoomCard from "../components/SingleShowRoomCard"
import HomeHeadCard from "../components/HomeHeadCard"
import DarkCardContainer from "../components/DarkCardContainer"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL, formatDate } from "../assets/Proxy"
import HeadText from "../components/HeadText"
import FakeSpinner from "../components/FakeSpinner"
import ShowRoomCard from "../layouts/ShowRoomCard"

const HomePage = () => {

  const token = localStorage.getItem('collab_token')
  const [projects, setProjcts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const randomProject = () => { 
      axios.get(`${API_BASE_URL}/api/random-projects`)
      .then((response) => {
        console.log(response.data.project)
        setProjcts(response.data.projects)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      }) 
    }

    randomProject()

  }, [])
  
  return (
    <>
     
      <section className="section">
         <HomeHeadCard /> 
         <DarkCardContainer conatinerTitle={'Driving Vision'} />
         {/*  */}
         
         <div className="body w-11/12 md:w-8/12 m-auto mb-10"> 
            <div className="">
               <div className="flex justify-between mt-3 items-center">
                   <HeadText text={'Some Projects'}/>
                  
               </div>
            </div>
            {loading && <FakeSpinner />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
              { projects.length > 0 && projects.map((project, index) => (
                <NavLink key={index} to={`/login`}>
                  <ShowRoomCard project={project} /> 
                </NavLink>
              ))}
            </div>
           
         
         </div>
         {/*  */}
         <Footer />
      </section>

    </>
  )
}

export default HomePage