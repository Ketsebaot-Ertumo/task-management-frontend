import { gql } from "@apollo/client";

export const CreateTask = gql`
  mutation CreateTask($title: String!, $description: String!, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
        id
        title
        description
        status
        completed
    }
  }
`
export const UpdateTask = gql`
    mutation UpdateTask($id: Int!, $title: String!, $description: String!, $status: String!, $completed: Boolean!) {
        updateTask(id: $id, title: $title, description: $description, status: $status, completed: $completed) {
            id
            title
            description
            status
            completed
        }
    }
`

export const DeleteTask = gql`
    mutation DeleteTask($id: Int!) {
        deleteTask(id: $id)
    }
`