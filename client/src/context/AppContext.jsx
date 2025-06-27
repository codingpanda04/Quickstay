import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'https://quickstay-server-rosy.vercel.app';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.CURRENCY || '$';
    const {user} = useUser();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);

    const fetchUser = async ()=>{
        try {
            const data = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}});

            if(data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities);
            } else{
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(user) {
            fetchUser();
        }
    }, [user])

    const value = {
        currency,
        user,
        getToken,
        navigate,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        axios,
        searchedCities,
        setSearchedCities,
        fetchUser
    }

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);