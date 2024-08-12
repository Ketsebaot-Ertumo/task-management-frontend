<template>
  <div class="task">
    <h1>Task Detail</h1>
    <p>Task ID: {{ taskId }}</p>
    <p v-if="task">Title: {{ task.title }}</p>
    <p v-if="task">Description: {{ task.description }}</p>
    <p v-if="task">Status: {{ task.status }}</p>
    <p v-if="task">Completed: {{ task.completed ? 'Yes' : 'No' }}</p>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error.message }}</p>
    <button class="d" @click="deleteTask" v-if="task">Delete Task</button>
    <button class="e" @click="updateTask" v-if="task">Edit Task</button>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GetTaskById } from '@/graphql/query';
import { DeleteTask } from '@/graphql/mutation';

export default {
  setup() {
    const route = useRoute();
    const taskId = ref(parseInt(route.params.id, 10));
    const task = ref(null);
    const router = useRouter();

    // Define the query
    const { loading, error, result, refetch } = useQuery(GetTaskById, {
      variables: { id: taskId.value }
    });

    // Define the mutation
    const { mutate: deleteTask, loading: deleting, error: deleteError } = useMutation(DeleteTask);

    // Watch for changes in route params to refetch data
    watch(() => route.params.id, (newId) => {
      taskId.value = parseInt(newId, 10);
      refetch({ id: taskId.value });
    });

    // Watch for changes in the result and update task
    watch(
      () => result.value,
      (newData) => {
        if (newData) {
          task.value = newData.getTaskById;
        }
      },
      { immediate: true }
    );

    // Initial fetch on component mount
    onMounted(() => {
      if (taskId.value) {
        refetch({ id: taskId.value });
      }
    });

    const deleteTaskHandler = async () => {
      try {
        const ok = confirm('Are you sure to delete task?');
        if (ok){
          const response = await deleteTask({ id: taskId.value });
          if (response.data.deleteTask) {
            alert('Task deleted!');
            router.push({ name: 'Dashboard' }); // Redirect after deletion
          } else {
            alert('Failed to delete task.');
          }
        }
      } catch (err) {
        console.error('Error deleting task:', err);
        alert('An error occurred while deleting the task.');
      }
    };

    const updateTask = () => {
      router.push({ name: 'UpdateTask', params: { id: taskId.value } });
    };

    return {
      taskId,
      task,
      loading,
      error,
      deleteTask: deleteTaskHandler,
      deleting,
      deleteError,
      updateTask
    };
  }
};
</script>
<style>
  button {
    margin-right: 5px;
  }
  .task {
    justify-items: center;
    border: solid, gray, 1px;
    padding: 40px 60px;
    display: inline-block;
    margin: 60px 0;
  }
  div {
    text-align: center;
    padding-top: 40;
  }
</style>





<!-- <template>
    <div>
      <h1>Task Detail</h1>
      <p>Task ID: {{ taskId }}</p>
      <p>Title: {{ task?.title }}</p>
      <p>Description: {{ task?.description }}</p>
      <p>Status: {{ task?.status }}</p>
      <p>Completed: {{ task?.completed ? 'Yes' : 'No' }}</p>
    </div>
  </template>
  
  <script>
  import { GetTaskById } from '@/graphql/query'
  import { useQuery } from '@vue/apollo-composable';
  
  export default {
    data() {
      return {
        taskId: this.$route.params.id,
        task: null
      }
    },
    created() {
      this.fetchTaskDetails()
    },
    methods: {
      fetchTaskDetails() {
        const { loading, error, data } = useQuery(GetTaskById, {
          variables: { id: this.taskId }
        })
  
        if (!loading && !error) {
          this.task = data.getTaskById
        }
      }
    }
  }
  </script> -->




<!-- <template>
    <div>
      <h1>Task Details</h1>
      <div v-if="task">
        <p>ID: {{ task.id }}</p>
        <p>Title: {{ task.title }}</p>
        <p>Description: {{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
      </div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useGetTaskById } from '@/graphql/query';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const { data, loading, error } = useGetTaskById(route.params.id);
      const task = ref(null);
  
      if (!loading.value && !error.value) {
        task.value = data.value.task;
      }
  
      return { task };
    },
  });
  </script> -->