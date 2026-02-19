export const getToken=((e:any)=>{
    return localStorage.getItem('token')
})
export const setToken=((e:any)=>{
    console.log(e,'token')
    return localStorage.setItem('token',e)
});

export const removeToken=()=>{
    return localStorage.removeItem('token')
};

export const isAuthenticated=()=>{
    return !!localStorage.getItem('token')
};

