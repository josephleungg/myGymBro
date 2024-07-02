import { createContext, useContext, useState, useEffect } from 'react';
import Config from 'react-native-config';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // user data states
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ properties, setProperties ] = useState({});
    const [ dateCreated, setDateCreated ] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // grabbing jwt from cookies through api call
                const res = await fetch(Config.IP_ADDRESS + 'verifyjwt');

                // checking if jwt is in cookies, if status not 200 then jwt is not verified
                if(res.status !== 200){
                    const errorMessage = await res.json();
                    setIsLoggedIn(false);
                    setUser(null);
                    throw new Error(errorMessage.message)
                }

                // if user JWT is recognized then grab the user id and set it in globalprovider
                const userID = await res.json();
                
                // if jwt is verified then grab user data
                try{
                    const res = await fetch(Config.IP_ADDRESS + 'get_user_data?id='+userID.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const data = await res.json()
            
                    setUsername(data.username)
                    setEmail(data.email)
                    setProperties(data.properties)
                    
                    // getting year and month created
                    const dateObject = new Date(data.dateCreated)
                    const year = dateObject.getFullYear()
                    const month = dateObject.getMonth() + 1
                    setDateCreated({"year": year.toString(), "month": month.toString(), "fullDateTime": data.dateCreated})
    
                    console.log('User data fetched successfully')
                }catch(e){
                    console.log('Error:', e)
                }

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
                isLoading,
                username,
                setUsername,
                email,
                setEmail,
                properties,
                setProperties,
                dateCreated,
                setDateCreated
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
};