import axiosInstance  from "./axios.config";    

//GET ALL TODOS
export const getTodos= async ()=>{
    const response= await axiosInstance.get("/todos");
    return response.data;
};

//CREATE TODO
export const createTodo= async ()=>{
    const response= await axiosInstance.post("/todos", data);
    return response.data;
}

//UPDATE TODO
export const updateTodo= async ()=>{
    const response= await axiossInstance.put(`/todos/${id}`, data);
    return response.data;
}

//DELETET TODO
export const deleteTodo= async ()=>{
    const response= await axiosInstance.delete(`/todos/${id}`);
    return response.data;
}