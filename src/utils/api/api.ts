import { jwtDecode } from "jwt-decode";
import type { APIResponseMap, MyJwtPayload } from "./types";

export class API {
    static BASEURL = import.meta.env.VITE_BASE_URL;

    // user related
    static async getCurrentUser(): Promise<APIResponseMap["getUserById"]> {
        const token = localStorage.getItem("token")!;
        const payload = jwtDecode(token) as MyJwtPayload;
        const { user_id } = payload;

        const response = await fetch(`${API.BASEURL}/api/users/${user_id}`);
        const resData = await response.json();
        if (!response.ok) throw new Error(resData.message);
        return resData
    }

    static async changeAvatarPic(formData: FormData) {
        const token = localStorage.getItem("token")!;

        const response = await fetch(`${API.BASEURL}/api/users/avatar`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }

    // Lists related
    static async getAllUserLists(): Promise<APIResponseMap["getAllUserLists"]> {
        const token = localStorage.getItem("token")!;

        const url = `${API.BASEURL}/api/lists`;
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const response = await fetch(url, options);
        const data = await response.json()
        if (!response.ok) throw new Error(data.message);
        return data
    }

    static async createNewList(listName: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/lists`;
        const reqBody = {
            list_name: listName
        }
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    }

    static async updateListName(list_id: string, newName: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/lists/${list_id}`;
        const reqBody = {
            newName,
        };
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    }

    static async deleteList(list_id: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/lists/${list_id}`;
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    }


    // Tasks related

    static async createNewTask(list_id: string, content: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/tasks`;
        const reqBody = {
            list_id,
            content
        };
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }

    static async getAllTasks(list_id: string): Promise<APIResponseMap["getAllTasks"]> {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/tasks/${list_id}`;
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }

    static async updateTaskContent(list_id: string, task_id: string, content: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/tasks/${task_id}`;
        const reqBody = {
            list_id,
            content
        };
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        };


        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }

    static async deleteTask(list_id: string, task_id: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/tasks/${task_id}`;
        const reqBody = {
            list_id
        };
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }

    static async toggleTaskCompletion(task_id: string) {
        const token = localStorage.getItem("token");

        const url = `${API.BASEURL}/api/tasks/completed/${task_id}`;
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data
    }
}