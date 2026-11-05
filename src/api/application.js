import client from './client.js'
export const getApplications = async (params) => {
    const response = await client.get("/applications", { params })
    return response.data
}
export const createApplication = async (data) => {
    const response = await client.post("/applications", data)
    return response.data
}
export const updateApplication = async (id, data) => {
    const response = await client.patch("/applications/" + id, data)
    return response.data
}
export const deleteApplication = async (id) => {
    const respone = await client.delete("/applications/" + id)

}
export const addNote = async (id, text) => {
    const response = await client.post("/applications/" + id + "/notes", { text })
    return response.data
}
export const getStats = async () => {
    const response = await client.get("/applications/stats")
    return response.data
}
