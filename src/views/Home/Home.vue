<template>
    <div class="home-box">
        <!--  头部 -->

        <Head class="head" :today="today"></Head>
        <!--  轮播图 -->
        <van-swipe class="swiper-box" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="it in top_stories">
                <router-link :to="`/detail/${it.id}`">
                    <van-image :src="it.image" />
                    <div className="desc">
                        <h3 className="title">{{ it.title }}</h3>
                        <p className="author">{{ it.hint }}</p>
                    </div>
                </router-link>
            </van-swipe-item>
        </van-swipe>

        <!-- 新闻列表 -->
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(it, idx) in news_list">
                <van-divider dashed v-if="idx > 0">
                    {{ it.date }}
                </van-divider>
                <div v-for="news in it.stories">
                    <NewsItem :info="news"></NewsItem>
                </div>

            </van-cell>
        </van-list>

    </div>
</template>

<script setup>
import http from "@/request/index"
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import Head from './Head.vue'
import NewsItem from './NewsItem.vue'

const top_stories = ref([])
const news_list = reactive([])
const today = ref("20231214")

onBeforeMount(async () => {
    let res = await http.get("/api/news/latest")
    console.log(111, res);
    top_stories.value = res.top_stories
    today.value = res.date
    news_list.push({ date: res.date, stories: res.stories })
})

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    console.log("loading....")
    // 异步更新数据
    if (news_list.length > 0) {
        let date = news_list[news_list.length - 1].date
        let res = await http.get(`/api/news/before/${date}`)
        news_list.push(res)
        console.log(222, res)
    }

    // 加载状态结束
    loading.value = false;
    if (news_list.length >= 7) finished.value = true
}


</script>

<style lang="scss" scoped>
.home-box {

    /* 轮播图 */
    .swiper-box {
        box-sizing: border-box;
        width: 750px;
        height: 750px;
        background: #DDD;

        .desc {
            position: absolute;
            left: 0;
            bottom: 40px;
            box-sizing: border-box;
            padding: 0 30px;
            width: 100%;

            .title {
                font-size: 36px;
                color: #FFF;
            }

            .author {
                line-height: 60px;
                font-size: 24px;
                color: rgba(255, 255, 255, .7);
            }
        }
    }

    /* 新闻列表 */
    /* 新闻列表 */
    .news-box {
        padding: 10px 30px;

    }

}
</style>