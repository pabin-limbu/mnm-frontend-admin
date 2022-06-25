console.log("env ", process.env);
export const api = `${process.env.REACT_APP_SERVERAPI}`;
// export const api = `${env.API}`;
// export const generatePublicUrl = (fileName) => {
//   return `http://localhost:4000/public/${fileName}`;
// };
export const generatePublicUrl = (fileName) => {
  return `${process.env.REACT_APP_SERVERPUBLICAPI}${fileName}`;
};


// export const api ="http://localhost:4000/api";
// export const generatePublicUrl = (fileName) => {
//     return `http://localhost:4000/public/${fileName}`;
//   };
