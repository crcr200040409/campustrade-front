<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <text class="header-title">发布闲置</text>
    </view>

    <!-- 商品表单区域 -->
    <scroll-view class="form-container" scroll-y>
      <!-- 商品图片上传 -->
      <view class="upload-section">
        <text class="section-title">上传商品图片(最多1张)</text>
        <view class="image-grid">
          <view class="image-item" v-for="(img, index) in images" :key="index">
            <image :src="img" mode="aspectFill" class="preview-image"></image>
            <view class="delete-btn" @click="removeImage(index)">×</view>
          </view>
          <view class="image-item add-btn" @click="chooseImage" v-if="images.length < 1">
            <view class="add-icon">+</view>
          </view>
        </view>
      </view>

      <!-- 商品信息 -->
      <view class="form-section">
        <text class="section-title">商品信息</text>
        <view class="form-item">
          <text class="item-label">商品名称</text>
          <input class="item-input" placeholder="请输入商品名称" v-model="form.title" />
        </view>
        <view class="form-item">
          <text class="item-label">商品描述</text>
          <textarea class="item-textarea" placeholder="请详细描述商品情况" v-model="form.description"></textarea>
        </view>


        <view class="form-item">
          <text class="item-label">商品分类</text>
          <view class="radio-group">
            <label v-for="(category, index) in categories" :key="index" class="radio-item">
              <radio
                  :value="category.id"
                  :checked="form.categoryId === category.id"
                  @click="handleCategoryChange(category.id)"
              />
              {{ category.name }}
            </label>
          </view>
        </view>

        <view class="form-item">
          <text class="item-label">商品价格</text>
          <input class="item-input" type="number" placeholder="请输入价格，保留两位小数" v-model="form.Price" />
        </view>
      </view>
    </scroll-view>

    <!-- 底部发布按钮 -->
    <view class="footer">
      <button class="publish-btn" @click="submitForm">
        <text class="btn-text">发布闲置</text>
      </button>
    </view>
  </view>
</template>


<script setup>
import { ref } from 'vue'
import request from '@/api/request.js';
// 表单数据
const form = ref({
  title: '',
  description: '',
  categoryId: 1,
  Price: ''
})
const handleCategoryChange = (categoryId) => {
  console.log("选中了分类ID:", categoryId);
  form.value.categoryId = categoryId;
  console.log("当前form.categoryId:", form.value.categoryId);
};
const images = ref([]) // 商品图片
const categories = ref([
  { id: 1, name: '数码电子', description: '电子产品' },
  { id: 2, name: '图书教材', description: '书籍' },
  { id: 3, name: '家居生活', description: '家居用品' },
  { id: 4, name: '运动户外', description: '运动器材' }
])
// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 1,  // 只选择一张图片
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 获取选择的图片
      images.value = [res.tempFilePaths[0]]; // 只保留最新选择的图片
    }
  });
}

// 删除图片
const removeImage = (index) => {
  images.value.splice(index, 1)
}


const submitForm = async () => {
  // console.log("updatedUserInfo----------->", JSON.stringify(form, 2));
  if (!form.value.title) {
    uni.showToast({ title: '请填写商品名称', icon: 'none' });
    return;
  }
  if (images.value.length === 0) {
    uni.showToast({ title: '请上传商品图片', icon: 'none' });
    return;
  }
  if (!form.value.Price) {
    uni.showToast({ title: '请输入商品价格', icon: 'none' });
    return;
  }
  if (!form.value.categoryId) {
    uni.showToast({ title: '请选择商品分类', icon: 'none' });
    return;
  }

  // 从缓存中获取 openId
  const openId = uni.getStorageSync('userInfo')?.openId;
  if (!openId) {
    uni.showToast({ title: '未找到用户信息，请先登录', icon: 'none' });
    return;
  }

  // 准备提交的数据
  const commodityData = {
    commodityName: form.value.title,
    commodityPhoto: images.value[0],  // 使用上传的第一张图片
    commodityDescription: form.value.description,
    labelId: form.value.categoryId,  // 使用单一的分类ID
    commodityPrice: parseFloat(form.value.Price),
    openId: openId
  };

  // 调用接口提交数据
  try {
    const res = await request({
      url: '/commodity/addCommodity',
      method: 'POST',
      data: commodityData
    });
    if (res.code === 200) {
      uni.showToast({
        title: '发布成功',
        icon: 'success'
      });

    } else {
      uni.showToast({
        title: '发布失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('发布商品失败', error);
    uni.showToast({
      title: '发布失败',
      icon: 'none'
    });
  }
};

</script>

<style>
/* 基础样式 */
page {
  background-color: #f5f5f5;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 头部样式优化 */
.header {
  padding: 15px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* 表单容器优化 */
.form-container {
  flex: 1;
  padding: 15px;
  background-color: #fff;
  box-sizing: border-box;
}

/* 各部分标题样式优化 */
.section-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 10px;
  color: #333;
  padding-left: 5px;
  border-left: 3px solid #f9b826;
}

/* 图片上传区域优化 */
.upload-section {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.image-item {
  width: calc((100% - 24px) / 3);
  height: 0;
  padding-bottom: calc((100% - 24px) / 3);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  border: 1px dashed #ddd;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  height: 100%;
}


.add-icon {
  font-size: 32px;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

/* 表单项目样式优化 */
.form-section {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 20px;
}

.item-label {
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.item-input, .item-textarea, .picker-view {
  width: 100%;
  padding: 12px 15px;
  height: auto;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 15px;
  box-sizing: border-box;
}

.item-input:focus, .item-textarea:focus {
  border-color: #f9b826;
}

.item-textarea {
  height: 120px;
}

.picker-view {
  color: #999;
}

/* 底部按钮优化 */
.footer {
  padding: 15px;
  background-color: #fff;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.publish-btn {
  background-color: #f9b826;
  color: white;
  border-radius: 25px;
  padding: 14px;
  font-size: 16px;
  border: none;
  width: 100%;
  box-shadow: 0 4px 12px rgba(249, 184, 38, 0.3);
}

.publish-btn::after {
  border: none;
}

.btn-text {
  font-weight: bold;
}
</style>