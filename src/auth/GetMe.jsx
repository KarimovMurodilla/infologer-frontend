import api from "./Api";

const getMe = () => {
    const storedFormData = localStorage.getItem('activeUser');
    const myData = JSON.parse(storedFormData);

    return myData;
    // try {
    //     const response = await api.get('/fastapi_users/me');
    //     localStorage.setItem('activeUser', JSON.stringify(response.data));
    //     return response.data;
    // } catch (error) {
    //     if (error.response && error.response.status === 401) {
    //         localStorage.removeItem("token");
    //     }
    // }
};

export default getMe;