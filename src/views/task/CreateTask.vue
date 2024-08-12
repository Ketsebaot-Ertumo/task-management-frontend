<template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="createTask">
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
      <button type="submit" :disabled="loading">Create Task</button>
      <p v-if="error">Error: {{ error.message }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import { CreateTask } from '@/graphql/mutation';

export default {
  setup() {
    const router = useRouter();

    // Task state
    const title = ref('');
    const description = ref('');
    const status = ref('');
    const completed = ref(false);

    // Mutation for creating task
    const { mutate: createTask, loading, error } = useMutation(CreateTask);

    // Method to create task
    const createTaskHandler = async () => {
      try {
        const { data } = await createTask({
          variables: {
            title: title.value,
            description: description.value,
            status: status.value,
            completed: completed.value
          }
        });

        if (data.createTask) {
          alert('Task created successfully!');
          router.push({ name: 'Dashboard' });
        } else {
          alert('Failed to create task.');
        }
      } catch (err) {
        console.error('Error creating task:', err);
        alert('An error occurred while creating the task.');
      }
    };

    return {
      title,
      description,
      status,
      completed,
      createTask: createTaskHandler,
      loading,
      error
    };
  }
};
</script>





<!-- <template>
  <div>
    <h1>Create Task</h1>
    <form @submit.prevent="createTask">
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
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import { CreateTask } from '@/graphql/mutation';
import { useMutation } from '@apollo/client'

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
    const [NewTask, { loading, error }] = useMutation(CreateTask)
    return { NewTask, loading, error }
  },
  methods: {
    async createTask() {
      try {
        await this.NewTask({
          variables: {
            title: this.title,
            description: this.description,
            status: this.status,
            completed: this.completed
          }
        })
        this.$router.push({ name: 'Dashboard' })
      } catch (err) {
        console.error('Error creating task:', err)
      }
    }
  }
}
</script> -->



<!-- <template>
    <div>
      <h1>Create Task</h1>
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
  import { useRouter } from 'vue-router';
  import { createTask } from '@/graphql/mutation';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
      const { createTask } = useCreateTask();
  
      const title = ref('');
      const description = ref('');
      const status = ref('Todo');
      const taskStatuses = ['Todo', 'In Progress', 'Done'];
  
      const onSubmit = async () => {
        try {
          const { id } = await createTask({ title: title.value, description: description.value, status: status.value });
          router.push({ name: 'TaskDetail', params: { id } });
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
  
      return { title, description, status, taskStatuses, onSubmit };
    },
  });
  </script> -->