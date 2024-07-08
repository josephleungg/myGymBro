import { createContext, useContext, useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';

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
                const res = await fetch(IP_ADDRESS + 'verifyjwt', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

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
                    const res = await fetch(IP_ADDRESS + 'get_user_data?id='+userID.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const data = await res.json()

                    setUsername(data.username)
                    setEmail(data.email)

                    // setting properties
                    const dataToProperties = {"name": data.name, "age": data.age, "bio": data.bio, "sex": data.sex, "weight": data.weight, "height": data.height, "bodyFat": data.bodyFat, "daysAtGym": data.daysAtGym, "progressPics": data.progressPics, "currentWorkout": data.currentWorkout}
                    setProperties(dataToProperties)
                    
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
        fetchUserData()
    }, [isLoggedIn])

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
                setDateCreated,
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
};