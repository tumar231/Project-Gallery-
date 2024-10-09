export const API_BASE_URL = 'https://projects.quths.com.ng';
// export const API_BASE_URL = 'http://127.0.0.1:8000';

export const handleAxiosError = (error) => {
   if (error.response) {
     // The request was made and the server responded with a status code
     // that falls out of the range of 2xx
     const { data } = error.response;
     
     if (data.errors) {
       // If there's an errors object, we assume it's a validation error
       return Object.values(data.errors).flat().join(' ');
     }
 
     return data.message || 'Server error';
   } else if (error.request) {
     // The request was made but no response was received
     return 'No response received from the server';
   } else {
     // Something happened in setting up the request that triggered an Error
     return error.message;
   }
 };
 
 export const formatDate = (laravelDate) => {
  const date = new Date(laravelDate);
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
}
 
export const shortenText = (text) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > 10 ? words.slice(0, 13).join(' ') + '...' : text;
};
