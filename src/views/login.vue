<template>
    <!-- Navbar with Back Button -->
    <van-nav-bar left-arrow @click-left="router.go(-1)"> 
        <template #title>
            <div class="nav-title-alt">登录</div>
        </template>
    </van-nav-bar>
    <div class="spacer"></div>
    <div class="container">
        <!-- Phone Number -->
        <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号"
            :rules="{ required: true, message: '请输入手机号' }" />
        <div class="code-container">
            <!-- Verification Code -->
            <van-field v-model="code" type="tel" label="验证码" placeholder="请输入验证码"
                :rules="{ required: true, message: '请输入验证码' }" class="code-field-alt" />
            <!-- Verification Code Button -->
            <van-button plain type="primary" @click="getCode" class="get-code-button-alt">获取验证码</van-button>
        </div>
        <div class="spacer"></div>
        <!-- Login Button -->
        <van-button type="primary" @click="confirmLogin">确认登录</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
let phone = ref('');
let code = ref('');
const router = useRouter()
const getCode = () => {
    code.value = Math.floor(Math.random() * 9000) + 1000;
};

const confirmLogin = () => {
    if (!phone.value || !code.value) {
        console.error('手机号或验证码不能为空');
        return;
    } else {
        let base64 = btoa(phone.value + ':' + code.value);
        localStorage.setItem('token', base64);
        router.push('/');
        console.log('登录成功');
    }
};
</script>

<style scoped>
.container {
    display: block;
    text-align: right; /* 修改文本对齐方式为右对齐 */
    padding: 2em; /* 修改内边距为2em */
}

.nav-title-alt {
    font-size: 50px;
    margin-top: 1em; /* 修改上边距为1em */
    margin-bottom: 1em; /* 修改下边距为1em */
    color: #00060c;
}

.spacer {
    margin-top: 2em; /* 修改上边距为2em */
}

.code-container {
    display: flex;
    justify-content: flex-start; /* 修改主轴排列方式为起始边对齐 */
    align-items: center;
    text-align: right; /* 修改文本对齐方式为右对齐 */
}

.code-field-alt {
    flex-grow: 2; /* 修改项目占的比例 */
    max-width: 70%; /* 修改最大宽度为70% */
    background: #F8F9FA;
    border-radius: 4px;
}

.get-code-button-alt {
    max-width: 30%; /* 修改最大宽度为30% */
    margin-left: 2%;
    font-size: 18px;
    padding: 10px 0;
    background: #f01202;
    color: #FFFFFF;
    border-radius: 4px;
}
</style>