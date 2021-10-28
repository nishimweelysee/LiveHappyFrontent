import axios from 'axios';
import cogoToast from 'cogo-toast'


const httpRequest = async (method, url, data = null,headers=null) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
        });
        return { response };

    } catch (error) {
        let errorMessage = (error.response) ? error.response.data.message : error.message;
        if(error.response.status===401){
            errorMessage="Please First Login to perform this action ,Thank you !!!";
        }
        cogoToast.error(errorMessage, {position: "top-right",hideAfter:3});
        return { error };
    }
};

export { httpRequest };
