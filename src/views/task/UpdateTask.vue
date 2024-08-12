<template>
  <div class="taskUpdate">
    <h1>Edit Task</h1>
    <form @submit.prevent="updateTask">
      <div class="form-input">
        <label>
          Title:
          <input v-model="title" />
        </label>
        <label>
          Description:
          <textarea v-model="description"></textarea>
        </label>
      </div>
      <div class="form-input">
        <label>
          Status:
          <input v-model="status" />
        </label>
        <label>
          Completed:
          <input type="checkbox" v-model="completed" />
        </label>
      </div>
      <div class="b">
        <button type="submit" :disabled="mutationLoading">Update Task</button>
        <p v-if="mutationError">Error: {{ mutationError.message }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { UpdateTask } from '@/graphql/mutation';
import { GetTaskById } from '@/graphql/query';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const taskId = ref(parseInt(route.params.id, 10));

    // Task state
    const title = ref('');
    const description = ref('');
    const status = ref('');
    const completed = ref(false);

    // Query to fetch task details
    const { result, loading, error } = useQuery(GetTaskById, {
      variables: { id: taskId.value }
    });

    // Mutation for updating task
    const { mutate: updateTask, loading: mutationLoading, error: mutationError } = useMutation(UpdateTask);

    // Watch for result changes to populate form fields
    watch(
      () => result.value,
      (newData) => {
        if (newData) {
          const task = newData.getTaskById;
          title.value = task.title;
          description.value = task.description;
          status.value = task.status;
          completed.value = task.completed;
        }
      },
      { immediate: true }
    );

    // Method to update task
    const updateTaskHandler = async () => {
      if (confirm('Are you sure you want to edit this task?')) {
        try {
          const { data } = await updateTask({
            variables: {
              id: taskId.value,
              title: title.value,
              description: description.value,
              status: status.value,
              completed: completed.value
            }
          });

          if (data.updateTask) {
            alert('Task updated successfully!');
            router.push({ name: 'Dashboard' });
          } else {
            alert('Failed to update task.');
          }
        } catch (err) {
          console.error('Error updating task:', err);
          alert('An error occurred while updating the task.');
        }
      }
    };

    return {
      title,
      description,
      status,
      completed,
      loading,
      error,
      updateTask: updateTaskHandler,
      mutationLoading,
      mutationError
    };
  }
};
</script>
<style>
  .taskUpdate {
    border: solid, gray, 1px;
    padding: 40px 60px;
    margin: 60px 0;
    display: inline-block;
  }
  .form-input {
    display: flex;
    gap: 40px;
    padding: 10px 0;
  }
  .b {
    margin: 40px 0;
  }
  input{
    margin-left: 10px;
  }
</style>






<!-- <template>
  <div>
    <h1>Edit Task</h1>
    <form @submit.prevent="updateTask">
      <label>
        Title:
        <input v-model="title" required />
      </label>
      <label>
        Description:
        <textarea v-model="description" required></textarea>
      </label>
      <label>
        Status:
        <input v-model="status" required />
      </label>
      <label>
        Completed:
        <input type="checkbox" v-model="completed" />
      </label>
      <button type="submit">Update Task</button>
    </form>
  </div>
</template>

<script>
import { UpdateTask } from '@/graphql/mutation';
import { GetTaskById } from '@/graphql/query';
import { useMutation, useQuery } from '@apollo/client'

export default {
  data() {
    return {
      title: '',
      description: '',
      status: '',
      completed: false
    }
  },
  setup() {
    const { id } = this.$route.params
    const { data, loading, error } = useQuery(GetTaskById, {
      variables: { id: parseInt(id) }
    })
    const [editTask, { loading: mutationLoading, error: mutationError }] = useMutation(UpdateTask)

    return {
      id,
      task: data?.getTaskById,
      loading,
      error,
      editTask,
      mutationLoading,
      mutationError
    }
  },
  mounted() {
    if (this.task) {
      this.title = this.task.title
      this.description = this.task.description
      this.status = this.task.status
      this.completed = this.task.completed
    }
  },
  methods: {
    async updateTask() {
      try {
        await this.editTask({
          variables: {
            id: parseInt(this.id),
            title: this.title,
            description: this.description,
            status: this.status,
            completed: this.completed
          }
        })
        this.$router.push({ name: 'Dashboard' })
      } catch (err) {
        console.error('Error updating task:', err)
      }
    }
  }
}
</script> -->



<!-- <template>
    <div>
      <h1>Edit Task</h1>
      <form @submit.prevent="onSubmit">
        <label>
          Title:
          <input v-model="title" type="text" />
        </label>
        <label>
          Description:
          <textarea v-model="description"></textarea>
        </label>
        <label>
          Status:
          <select v-model="status">
            <option v-for="status in taskStatuses" :key="status" :value="status">{{ status }}</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useEditTask } from '@graphql/mutation';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const { editTask } = useEditTask();
  
      const title = ref('');
      const description = ref('');
      const status = ref('');
      const taskStatuses = ['Todo', 'In Progress', 'Done'];
  
      const onSubmit = async () => {
        try {
          await editTask({ id: route.params.id, title: title.value, description: description.value, status: status.value });
          router.push({ name: 'TaskDetail', params: { id: route.params.id } });
        } catch (error) {
          console.error('Error editing task:', error);
        }
      };
  
      return { title, description, status, taskStatuses, onSubmit };
    },
  });
  </script> -->