
// jwt payload
export type MyJwtPayload = {
    email: string
    user_id: string
    iat: number
}

// Jsend.success Type
export type SuccessJsendResponse<T> = {
    status: "success",
    data: T
}

// user model
export type User = {
    user_id: string
    username: string
    email: string
    avatar: string
    avatarUrl: string
}

// list model
export type List = {
    list_id: string
    user_id: string
    list_name: string
    created_at: string
}


// task model
export type Task = {
    list_id: string
    todo_id: string
    content: string
    completed: 0 | 1
    created_at: string
    deadline: string
}

// api response map
export interface APIResponseMap {
    "getUserById": SuccessJsendResponse<User>
    "getAllUserLists": SuccessJsendResponse<{
        lists: List[],
        user: Omit<User, "avatarUrl">
    }>
    "getAllTasks": SuccessJsendResponse<{
        tasks: Task[],
        list: List
    }>
}