import { gql } from '@apollo/client'

export const GetAllTasks = gql`
    query GetAllTasks {
        getAllTasks {
            id
            title
            description
            status
            completed
        }
    }
`
export const GetTaskById = gql`
    query GetTaskById($id: Int!) {
        getTaskById(id: $id) {
            id
            title
            description
            status
            completed
        }
    }
`