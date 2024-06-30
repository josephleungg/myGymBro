import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // grabbing jwt from cookies through api call
                const res = await fetch('http://192.168.2.32:5000/verifyjwt');

                // checking if jwt is in cookies, if status not 200 then jwt is not verified
                if(res.status !== 200){
                    const errorMessage = await res.json();
                    setIsLoggedIn(false);
                    setUser(null);
                    throw new Error(errorMessage.message)
                }

                // if user JWT is recognized then grab the user id and set it in globalprovider
                const userID = await res.json();
                setIsLoggedIn(true);
                setUser(userID.id);
            }catch(e){
                console.log('Error:', e)
                setIsLoggedIn(false);
                setUser(null);
            }finally{
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [])

    return(
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
};