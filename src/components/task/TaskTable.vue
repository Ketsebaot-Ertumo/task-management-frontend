<template>
  <div>
    <table v-if="!loading && !error && tasks.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
      <p v-if="!tasks.length && !loading">No tasks available</p>
    </div>
  </div>
</template>

<script>
import { GetAllTasks } from '@/graphql/query';
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { loading, error, result } = useQuery(GetAllTasks);
    const router = useRouter();
    const tasks = ref([]);
    console.log(router)

    watch(
      () => result.value,
      (newData) => {
        if (newData) {
          tasks.value = newData.getAllTasks || [];
          console.log('Updated tasks:', tasks.value);
        }
      },
      { immediate: true } // Ensure it runs immediately
    );

    const goToTaskDetail = (taskId) => {
      router.push({ name: 'TaskDetail', params: { id: taskId } });
    };

    return {
      loading,
      error,
      tasks,
      goToTaskDetail,
    };
  }
};
</script>



<!-- <template>
  <div>
    <table v-if="!loading && !error && tasks.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
      <p v-if="!tasks.length && !loading">No tasks available</p>
    </div>
  </div>
</template>

<script>
import { GetAllTasks } from '@/graphql/query';
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  setup() {
    const { loading, error, result } = useQuery(GetAllTasks);
    const router = useRouter(); // Initialize Vue Router

    // Initialize tasks as an empty array
    const tasks = ref([]);

    // Watch for changes in result and update tasks
    watch(
      () => result.value,
      (newData) => {
        if (newData) {
          tasks.value = newData.getAllTasks || [];
          console.log('Updated tasks:', tasks.value);
        }
      },
      { immediate: true } // Ensure it runs immediately
    );

    // Log loading, error, and result
    // watch(
    //   () => loading.value,
    //   (newLoading) => {
    //     console.log('Loading:', newLoading);
    //   }
    // );

    watch(
      () => error.value,
      (newError) => {
        console.error('Error:', newError);
      }
    );

    const goToTaskDetail = (taskId) => {
      router.push({ name: 'taskDetail', params: { id: taskId } });
    };

    return {
      loading,
      error,
      tasks, // Return tasks to be used in the template
      goToTaskDetail,
    };
  }
};

</script> -->




<!-- <template>
  <div>
    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import { GetAllTasks } from '@/graphql/query'
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';

export default {
  setup() {
    const { loading, error, data } = useQuery(GetAllTasks);
    const tasks = ref([]);

    // Watch the data for changes
    watch(data, (newData) => {
      tasks.value = newData?.getAllTasks || [];
    });

    const goToTaskDetail = (taskId) => {
      this.$router.push({ name: 'taskDetail', params: { id: taskId } });
    };

    return {
      loading,
      error,
      tasks,
      goToTaskDetail
    };
  }
}
</script> -->





<!-- <template>
  <div>
    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import { GetAllTasks } from '@/graphql/query'
import { useQuery } from '@vue/apollo-composable';

export default {
  setup() {
    const { loading, error, data } = useQuery(GetAllTasks)

    const goToTaskDetail = (taskId) => {
      this.$router.push({ name: 'taskDetail', params: { id: taskId } })
    }

    return {
      loading,
      error,
      tasks: data?.getAllTasks || [],
      goToTaskDetail
    }
  }
}
</script> -->



<!-- <template>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
    import { useQuery } from '@apollo/client'
    import { GetAllTasks } from '@/graphql/query'

    export default {
        setup() {
            const { loading, error, data } = useQuery(GetAllTasks)

            const goToTaskDetail = (taskId) => {
                this.$router.push({ name: 'taskDetail', params: { id: taskId }})
            }

            return {
                loading,
                error,
                tasks: data?.getAllTasks,
                goToTaskDetail
            }
        }
    }
</script> -->




<!-- <template>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" @click="$emit('row-click', task.id)">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.status }}</td>
            <td>
              <button @click.stop="$emit('edit', task)">Edit</button>
              <button @click.stop="$emit('delete', task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    emits: ['row-click', 'edit', 'delete'],
  });
  </script> -->