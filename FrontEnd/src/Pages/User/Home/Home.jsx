import React, { useEffect, useState } from 'react'
import './Home.css'
import { useSelector } from 'react-redux';
// import { userLogout } from '../../../store/userSlice';
// import { userInfo } from '../../../store/userSlice';
import Navbar from '../../../Components/Navbar/Navbar';
import Card from '../../../Components/Card/Card';
import { GET_DATA_BY_USER } from '../../../Axios/axios';




export default function Home() {
  const [businessData, setBusinessData] = useState();
  const userData = useSelector(state => state.user.userData);
  const userID = userData[0].UserID;
  console.log('homepage', userID)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userID) {
          const data = await GET_DATA_BY_USER(`https://ilivesolutions.azurewebsites.net/api/IMBusiness/GetById?CreateBy=${userID}`);
          setBusinessData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log('home page business data', businessData);
  //const businessData = useSelector(state => state.user.businessData);

  return (
    <>
      <Navbar />
      <div className='main-home'>
        <div>
          <h1>Home page</h1>
          {/* <button onClick={handleSignout} className='login-btn'>Signout</button> */}
          <div className='card-div'>
            {businessData?.map((business, index) => {
              return (
                <div className='card-div-2'>
                  <Card
                    key={index + business.BusinessName}
                    image={business.BusinessLogo}
                    name={business.BusinessName}
                    ownerName={business.BusinessOwnerName}
                    website={business.WebSite}
                    email={business.Email}
                    phone={business.BusinessNumber}
                    index={business.Id}
                  />

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
