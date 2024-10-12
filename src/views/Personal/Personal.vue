<template>
    <van-nav-bar left-arrow @click-left="router.go(-1)"> <!-- 返回键 -->
        <template #title>
            <div class="nav-title">个人中心</div>
        </template>
    </van-nav-bar>
    <div class="avatar">
        <img :src="image" alt="" />
        <span class="name">陈鑫</span>
    </div>
    <div class="myCollection" @click="router.push('/collection')">
        <van-divider />
        <span>我的收藏</span>
        <van-icon name="arrow" class="left" />
        <van-divider />
    </div>
    <div class="myCollection" @click="Logout">
        <van-divider />
        <span>退出登录</span>
        <van-icon name="arrow" class="left" />
        <van-divider />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import image from '../../assets/images/timg.jpg'
const router = useRouter()


const Logout = () =>{
  localStorage.removeItem('token')
  localStorage.removeItem('favorites')
  router.push('/')

}
</script>

<style lang="scss" scoped>
.avatar {
    width: 100vw;
    height: 45vw; 

    img {
        width: 22vw; 
        height: 22vw;
        border-radius: 50%;
        display: block;
        margin: 12vw auto; 
    }

    .name {
        font-size: 5vw; 
        color: #333; 
        font-weight: bold;
        display: block;
        width: 100vw;
        text-align: center;
        margin-top: -6vw;
    }
}

.nav-title {
    font-size: 35px; 
    margin-top: 45px; 
    margin-bottom: 45px; 
}

.myCollection {
    width: 100vw;
    height: 8vw; 

    span {
        font-size: 3vw; 
        margin-left: 2vw; 
    }

    .left {
        float: right;
        font-size: 4vw;
        color: #888; 
        margin-right: 2vw; 
    }
}
</style>