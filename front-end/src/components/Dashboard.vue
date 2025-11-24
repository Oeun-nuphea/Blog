<script setup lang="ts">
import { ref, onMounted } from "vue";

interface User {
  _id: string;
  name: string;
  email: string;
}

const users = ref<User[]>([]);
const error = ref("");

onMounted(async () => {
  try {
    const res = await fetch("http://api-gateway:3000/users");
    const data: User[] = await res.json();
    users.value = data;
  } catch (err) {
    error.value = "Failed to fetch users";
  }
});
</script>

<template>
  <h1 class="text-2xl mb-4">User Names</h1>

  <ul>
    <li v-for="user in users" :key="user._id" class="text-2xl">
      {{ user.name }}
    </li>
  </ul>

  <p v-if="error" class="text-red-500">{{ error }}</p>
</template>
