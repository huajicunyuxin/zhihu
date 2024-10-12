<template>
    <div class="detail-box">
        <!-- 新闻内容 -->
        <div class="news-body" v-html="news.body"></div>
        <!-- 底部图标 -->
        <van-tabbar active="0">
            <van-tabbar-item icon="home-o" @click="$router.go(-1)">返回</van-tabbar-item>
            <van-tabbar-item icon="good-job-o" :badge="extra.popularity">点赞</van-tabbar-item>
            <van-tabbar-item icon="like-o" :bage="extra.short_comments">评论</van-tabbar-item>
            <van-tabbar-item :icon="favorite ? 'star' : 'star-o'" @click="toggle(route.params.id)">收藏</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import { useRoute ,useRouter} from 'vue-router';
import { ref, onMounted, onUnmounted, nextTick } from "vue"
import http from "@/request/index"

const route = useRoute()
const news = ref({})
const extra =ref({})
const favorite = ref(false)
const router = useRouter()

const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
         router.push('/login');
    }
}


const toggle = async (id) => {
    checkToken()
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    if (favorite.value) {
        const index = favorites.indexOf(id)
        if (index !== -1) favorites.splice(index, 1)
    } else {
        if (!favorites.includes(id)) favorites.push(id)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    favorite.value = !favorite.value;
}

let link = null
const getNews = async (id) => {
    try {
        let result = await http.get('/api/news/' + id)
        console.log("res=", result)
        news.value = result
        nextTick(() => {
            console.log("******")
            handleStyle(result)
            handleImage(result)
        });
    } catch (_) { }
}

const handleStyle = (result) => {
    if (result == null || !Array.isArray(result.css)) return;
    let css = result.css[0];
    if (!css) return;
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
};

const handleImage = (result) => {
    if (result == null) return;
    let imgPlaceHolder = document.querySelector('.img-place-holder');
    if (!imgPlaceHolder) return;
    let tempImg = new Image;
    tempImg.src = result.image;
    tempImg.onload = () => {
        imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
        let parent = imgPlaceHolder.parentNode;
        parent.parentNode.removeChild(parent);
    };
};

onMounted(async () => {
    console.log("*****mounted id=", route.params.id)
    const id = route.params.id;
    favorite.value = (JSON.parse(localStorage.getItem('favorites')) || []).includes(id);
    await getNews(id);
    getExtra()
});

async function getExtra() {
    let result = await http.get('/api/story-extra/' + route.params.id);
    console.log("extra=", result)
    extra.value=result;
}

onUnmounted(() => {
    console.log("*****unmounted*****")
    if (link) document.head.removeChild(link);
});
</script>

<style lang="scss" scoped>
.detail-box {
    .van-nav-bar{
        height: 50px;
    }

    .news-body{
        flex:1;
        overflow-y: scroll;
    }

    .van-tabbar{
        height: 120px;
    }

    overflow-x: hidden;
    margin: 0;
    padding-bottom: 90px;
}
</style>