import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import SideNav from '../../../Components/SideNav/SideNav';
import BusinessHome from '../BusinessHome/BusinessHome';
import StaffHome from '../StaffHome/StaffHome';

export default function Home() {
  const userData = useSelector(state => state?.user?.userData);
  console.log("homepage  userData userId", userData[0].UserType);
  const userType = userData[0].UserType;


  return (
    <>
      <SideNav />
      {userType === 0 ? (
        <BusinessHome />
      ) : <StaffHome />}

    </>
  );
}

