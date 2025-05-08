<template>
  <view>
    <text>用户管理</text>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜索用户" 
        @input="filterUsers"
      />
    </view>

    <!-- 用户列表 -->
    <scroll-view scroll-y class="user-list">
      <view v-for="user in filteredUserList" :key="user.id" class="user-item">
        <view class="user-info">
          <text class="open-id">   openId: {{ user.open_id }}</text>
          <text class="user-name"> 用户名: {{ user.user_name }}</text>
        </view>
        <button @click="toggleBlock(user)">
          {{ user.isBlocked ? '解除拉黑' : '拉黑用户' }}
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 用户列表数据
const userList = ref([])
// 搜索框输入值
const searchQuery = ref('')
// 过滤后的用户列表
const filteredUserList = ref([])
const mockUserData = [
  { id: 1, open_id: 'openid_123', user_name: 'Alice', isBlocked: false },
  { id: 2, open_id: 'openid_456', user_name: 'Bob', isBlocked: true },
  { id: 3, open_id: 'openid_789', user_name: 'Charlie', isBlocked: false },
  { id: 4, open_id: 'openid_101', user_name: 'David', isBlocked: true },
  { id: 5, open_id: 'openid_102', user_name: 'Eve', isBlocked: false },
  { id: 6, open_id: 'openid_103', user_name: 'Frank', isBlocked: false }
]

// 获取用户数据
const fetchUsers = async () => {
	 userList.value = mockUserData
	  filteredUserList.value = mockUserData  // 初始时显示所有用户
  // const { data } = await uni.request({ url: '/api/admin/users' })
  // userList.value = data
  // filteredUserList.value = data  // 初始时显示所有用户
}

// 处理用户拉黑或解除拉黑
const toggleBlock = async (user) => {
  await uni.request({
    url: `/api/admin/users/${user.id}/block`,
    method: 'POST',
    data: { block: !user.isBlocked }
  })
  fetchUsers()
}

// 过滤用户列表
const filterUsers = () => {
  filteredUserList.value = userList.value.filter(user => {
    return user.open_id.includes(searchQuery.value) || user.user_name.includes(searchQuery.value)
  })
}

onMounted(fetchUsers)
</script>

<style scoped>
.search-box {
  margin-bottom: 15px;
}
.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.user-list {
  margin-top: 10px;
}
.user-item {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
}
</style>
