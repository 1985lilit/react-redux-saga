import React, { useState, useEffect } from "react";
import './Table.css'
import {useDispatch, useSelector} from 'react-redux';
import { sagaActions } from './redux/sagaAction';


const initialValues = {
    name: '',
    surname: '',
    salary: ''
}

      
function Lilit() {
    const [userData, setUserData] = useState(initialValues);
    const [users, setUsers] = useState([]);
    const [editableUserData, setEditableUserData] = useState({
        isEdit: false,
        userIndex: null
    });
   
    const dispatch = useDispatch()
    const { data } = useSelector((store) => store.userData);
        console.log(data)
    
        useEffect(() => {
            dispatch({
              type: sagaActions.GET_USERS,
            });
          }, [dispatch]);

    const hendleRemove = (id, index) => {
        console.log(id)
        setUsers(users.filter((user, userIndex) => userIndex !== index));
      


    }

    const isFilledFields = userData.name && userData.surname && userData.salary;

    const handleSubmitUser = (e) => {
        e.preventDefault();

        if (isFilledFields) {
            if (editableUserData.isEdit) {
                const editedData = users;
                editedData.splice(editableUserData.userIndex, 1, userData);
                setUsers(editedData);

                setEditableUserData({
                    isEdit: false,
                    userIndex: null
                })

               
            } else {
                
                setUsers((prevState) => [...prevState, userData]);
            }



            setUserData(initialValues)

        }


    }
    const hendleCleanClick = () => setUserData(initialValues);

    const handleEditClick = (data, index) => {
        setUserData(data);
        setEditableUserData({
            isEdit: true,
            userIndex: index
        })
    }

    return (

        <div className="lil-wrapper">
            <div className="lil-wrapper-content">
                <div className="lil-table-data">
                    <table className="lil-table">
                        <th className="lil-th">#</th>
                        <th className="lil-th">User Name</th>
                        <th className="lil-th">User Surname</th>
                        <th className="lil-th">User Salary</th>
                        <th className="lil-th">Actions</th>

                        <tbody>
                            {data .map((data, index) => (
                                <tr key={index}>
                                    <td className="lil-td">{index + 1}</td>
                                    <td className="lil-td">{data.name}</td>
                                    <td className="lil-td">{data.surname}</td>
                                    <td className="lil-td">{data.salary}</td>
                                    <td className="lil-td">
                                        <div>
                                            <button className="lil-edit-ection" onClick={() => handleEditClick(data, index)}>edit</button>
                                            <button className="lil-remove-ection" onClick={() => hendleRemove(data.id, index)}>remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <form className="lil-form" onSubmit={handleSubmitUser} onReset={hendleCleanClick}>
                        <input className="lil-input" placeholder="white your name" onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            name: e.target.value
                        }))}
                            value={userData.name}
                        />
                        <input className="lil-input" placeholder="white your surname" onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            surname: e.target.value
                        }))}
                            value={userData.surname}
                        />
                        <input className="lil-input" placeholder="white your salary" onChange={(e) => setUserData((prevState) => ({
                            ...prevState,
                            salary: e.target.value
                        }))}
                            value={userData.salary}
                        />


                        <div className="lil-botton-wrapper">
                            <button className="button-clean" type="reset">Clean</button>
                            <button className="button-add" disabled={!isFilledFields} type="submit">{editableUserData.isEdit ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}



export default Lilit;