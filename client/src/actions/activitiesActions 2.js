import { SET_ACTIVITIES, SELECTED } from "./types";

 
// const yelp = `Bearer 1PLVyi4fmTRLknS5zUS29KZGV5BDDh3e6WCWv5ds7SnaHvk1rFDKHmW90CFeTMogcDGUhK_qEXWtsuSGZ9k6HaXk7aeWEPIfx-yCCg2Z_ftSvShgumpl9MIf3UarX3Yx`

// get activities from YELP API, the city name comes from user input
export const addActivitiesToMongo  = (activity) => dispatch => {
    fetch(`/api/users/activities`,
    {
    method: "PUT",
    body: JSON.stringify(activity),
    headers: {
        'Content-Type': 'application/json'
      },
    })
    .then( res => res.json())
    .then( (key) => {
        console.log("this come from line 18 of activitiesAction, this is a success response from the backend after it added the activities to the user database",key);
        dispatch({
            type: SELECTED,
            payload: key.key
        })
    })
    .catch (err => console.log(err))
}

// get activities from YELP API, the fulladdress comes from user input
export const getActivitiesByAddress  = (fullAddress)  => dispatch => {
    const searchTerm = {
        address: fullAddress
    }
    fetch(`/api/users/getActivities`,{
        method:"POST",
        body: JSON.stringify(searchTerm),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    })
    .then( res => res.json())
    .then( (activities) => {
        console.log("this comes from activities Action.js, console.log the activities from YELP API called by our backend",activities);
        dispatch({
            type: SET_ACTIVITIES,
            payload: activities
        })
    })
    .catch((error) => {
        console.error('Error:', error);
      });
}