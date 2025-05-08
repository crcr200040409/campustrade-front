<template>
  <view>
    <button @click="showAddModal = true" class="add-button">添加分类</button>
    <!-- 模拟数据列表 -->
    <view v-for="category in currentPageCategories" :key="category.id" class="category-item">
      <input v-model="category.editName" v-if="category.editing" class="category-input" />
      <text v-else>{{ category.name }}</text>
      <view class="actions">
        <button @click="toggleEdit(category)" class="edit-button">
          {{ category.editing ? '保存' : '编辑' }}
        </button>
        <button @click="deleteCategory(category.id)" class="delete-button">删除</button>
      </view>
    </view>


    <!-- 分页 -->
    <view class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">上一页</button>
      <span>第 {{ currentPage }} 页 共 {{ totalPages }} 页</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">下一页</button>
    </view>

    <!-- 弹窗 -->
    <view v-if="showAddModal" class="modal">
      <view class="modal-content">
        <input v-model="newCategory" placeholder="新分类名称" class="modal-input" />
        <view class="modal-actions">
          <button @click="addCategory" class="add-category-btn">添加</button>
          <button @click="showAddModal = false" class="close-btn">关闭</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted ,computed} from 'vue'

const categories = ref([
  { id: 1, name: '电子产品', editing: false, editName: '电子产品' },
  { id: 2, name: '家居用品', editing: false, editName: '家居用品' },
  { id: 3, name: '书籍', editing: false, editName: '书籍' },
  { id: 4, name: '运动装备', editing: false, editName: '运动装备' },
  { id: 5, name: '玩具', editing: false, editName: '玩具' },
  { id: 6, name: '衣物', editing: false, editName: '衣物' },
  { id: 7, name: '厨房用品', editing: false, editName: '厨房用品' },
  { id: 8, name: '美妆', editing: false, editName: '美妆' },
  { id: 9, name: '食品', editing: false, editName: '食品' },
  { id: 10, name: '汽车配件', editing: false, editName: '汽车配件' },
  { id: 11, name: '园艺工具', editing: false, editName: '园艺工具' },
  { id: 12, name: '办公用品', editing: false, editName: '办公用品' },
  { id: 13, name: '宠物用品', editing: false, editName: '宠物用品' },
  { id: 14, name: '文具', editing: false, editName: '文具' },
  { id: 15, name: '健康产品', editing: false, editName: '健康产品' }
])

const newCategory = ref('')
const showAddModal = ref(false)
const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = ref(Math.ceil(categories.value.length / itemsPerPage))

// 计算当前页显示的分类数据
const currentPageCategories = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return categories.value.slice(startIndex, endIndex)
})

// 添加分类
const addCategory = () => {
  if (newCategory.value) {
    const newCategoryData = {
      id: categories.value.length + 1,
      name: newCategory.value,
      editing: false,
      editName: newCategory.value
    }
    categories.value.push(newCategoryData)
    newCategory.value = ''
    showAddModal.value = false
    totalPages.value = Math.ceil(categories.value.length / itemsPerPage)
  }
}

// 编辑分类
const toggleEdit = (category) => {
  if (category.editing) {
    category.name = category.editName
  }
  category.editing = !category.editing
}

// 删除分类
const deleteCategory = (id) => {
  categories.value = categories.value.filter(category => category.id !== id)
  totalPages.value = Math.ceil(categories.value.length / itemsPerPage)
}

// 页码变化
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  // 可以模拟获取数据的请求
  console.log('组件已加载')
})
</script>

<style scoped>
.add-button {
  background-color: #008bff;
  color: white;
  padding: 10px 15px;
  border: 15px;
  border-radius: 15px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.category-item text {
  flex-grow: 1;
}

.actions {
  display: flex;
  align-items: center;
}

.edit-button, .delete-button {
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.edit-button {
  background-color: #f0ad4e;
  color: white;
}

.delete-button {
  background-color: #d9534f;
  color: white;
}

.pagination {
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination button {
  padding: 5px 15px;
  margin: 0 10px;
  border-radius: 5px;
  border: none;
  background-color: #5bc0de;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.add-category-btn, .close-btn {
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.add-category-btn {
  background-color: #5bc0de;
  color: white;
}

.close-btn {
  background-color: #d9534f;
  color: white;
}
</style>
