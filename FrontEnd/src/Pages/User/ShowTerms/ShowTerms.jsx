import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_STAFF_BY_ID, GET_STAFF_METHOD } from '../../../Axios/axios';
import SideNav from '../../../Components/SideNav/SideNav';
import Button from '../../../Components/Button/Button';
import Loader from '../../../Components/Loader/Loader';
import "./ShowTerms.css"


export default function ShowTerms() {
    const [terms, setTerms] = useState([]);

    const userData = useSelector(state => state?.user?.userData);
    const userID = userData[0].UserID;

    const navigate = useNavigate();

    const[loading , setLoading] = useState(true); 


    const getAllTerms = async () => {
        try {
            const res = await GET_STAFF_METHOD(`IMGeneralSetup/GetAllTermsCondition`);
            setTerms(res);
            setLoading(false)

        } catch (error) {
            console.log("Error getting all terms", error.message);
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await DELETE_STAFF_BY_ID(`IMGeneralSetup/SoftDeleteTermsCondition?Id=${id}&ModifyBy=${userID}`)
                .then(() => {
                    window.alert("Term Deleted sucessfully");
                    getAllTerms();
                    setLoading(false)
                })
        }
        catch (error) {
            console.log("Error deleting by id", id, error.message);
        }
    }

    useEffect(() => {
        getAllTerms();
    }, []);

    console.log(terms);

    return (
        <>
        <SideNav />
        {loading ? <Loader/ > : (
            <div className='div-terms'>
            <div>
                <h1>Show Terms</h1>
                <Button text="Add Terms" onClick={() => navigate('/addTerms')} />
                <br />
                <div>
                    <table className="table-terms">
                        <thead>
                            <tr>
                                <th>Terms Condtions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {terms?.map((value) => (
                                <tr key={value?.Id}>
                                    <td>{value?.TermsCondition}</td>
                                    <td>
                                        <Button text='Update' onClick={() => navigate(`/editTerms/${value?.Id}`)} />
                                        <Button text="Remove" onClick={() => handleDelete(value?.Id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )}
            
            
        </>
    )
}
