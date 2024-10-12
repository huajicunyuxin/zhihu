<template>
    <header class="home-head-box">
        <div class="info">
            <div class="time">
                <span>{{ time.day }}</span>
                <span>{{ time.month }}</span>
            </div>
            <h2 class="title">仿知乎日报</h2>
        </div>

        <div class="picture">
            <router-link to="" @click.prevent="is_log"><img :src=timg alt="" /></router-link>
        </div>
    </header>
</template>

<script setup>
import {computed} from "vue"
import timg from '@/assets/images/timg.jpg';
import { useRouter } from 'vue-router';
const props = defineProps({ today: String })
const router = useRouter();

const isAuthenticated = () => {
    return !!localStorage.getItem('token');   //检查是否存在 token
}
const is_log = async () => {   //检查是否登录
    if (!isAuthenticated()) {
        router.push( '/login' );     
    } else {
        router.push('/personal');  
    }
}


const time = computed(() => {
    let [, year, month, day] = props.today.match(/^(\d{4})(\d{2})(\d{2})$/),
        area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    month = parseInt(month, 10);
    day = parseInt(day, 10);
    return {
        month: area[month] + '月',
        day: day
    };
});
</script>

<style lang="scss" scoped>
.home-head-box {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;

    .picture {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .info {
        display: flex;
        align-items: center;

        .title {
            padding-left: 24px;
            height: 64px;
            line-height: 64px;
            font-size: 40px;
            border-left: 2px solid #EEE;
        }

        .time {
            padding-right: 30px;
            height: 70px;

            span {
                display: block;
                text-align: center;
                line-height: 35px;
                font-size: 24px;

                &:nth-child(1) {
                    font-size: 32px;
                }
            }
        }
    }
}
</style>