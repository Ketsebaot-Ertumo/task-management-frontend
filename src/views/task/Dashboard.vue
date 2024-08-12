<template>
    <div>
      <TaskTable />
    </div>
  </template>
  
  <script>
    import TaskTable from '@/components/task/TaskTable.vue';
  
    export default {
      components: {
        TaskTable
      }
    }
  </script>



<!-- <template>
    <div>
      <h1>Task Dashboard</h1>
      <Table :tasks="tasks" @row-click="onRowClick" @edit="onEdit" @delete="onDelete" />
      <router-link to="/tasks/create">Create Task</router-link>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { GetAllTasks } from '@/graphql/query';
  import Table from '@/components/Table.vue';
  import { useRouter } from 'vue-router';
  import { useQuery } from '@apollo/client';
  
  export default defineComponent({
    components: {
      Table,
    },
    setup() {
      const { data, loading, error } = useQuery(GetAllTasks);
      const tasks = ref([]);
      const router = useRouter();
  
      if (!loading.value && !error.value) {
        tasks.value = data.value.tasks;
      }
  
      const onRowClick = (id) => {
        router.push({ name: 'TaskDetail', params: { id } });
      };
  
      const onEdit = (task) => {
        router.push({ name: 'EditTask', params: { id: task.id } });
      };
  
      const onDelete = (id) => {
        // Implement delete logic here
      };
  
      return { tasks, onRowClick, onEdit, onDelete };
    },
  });
  </script> -->