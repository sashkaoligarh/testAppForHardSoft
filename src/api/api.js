import axios from 'axios'



export const getTest = async () => {
    console.log('api');
    try { 
        let response = await axios.get('https://opentdb.com/api.php?amount=10')
        console.log(response.data)
        return response.data

    } catch(e) {
        console.log(e)
    }
    
}