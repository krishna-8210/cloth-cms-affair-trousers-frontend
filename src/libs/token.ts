export const getToken=(e=>{
    return localStorage.getItem('token')
})
export const setToken=(e=>{
    console.log(e,'token')
    return localStorage.setItem('token',e)
});

export const removeToken=()=>{
    return localStorage.removeItem('token')
};

export const isAuthenticated=()=>{
    return !!localStorage.getItem('token')
};

