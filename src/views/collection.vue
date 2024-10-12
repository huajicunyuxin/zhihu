<template>
    <van-nav-bar left-arrow @click-left="navigateBack" class="custom-navbar"> 
        <template #title>
            <h2 class="navbar-title">我的收藏</h2>
        </template>
    </van-nav-bar>

    <section class="favorite-section">
        <router-link v-for="(favoriteItem) in favoriteItems" :key="favoriteItem.id" 
            :to="`/detail/${favoriteItem.id}`" class="favorite-link">
            <h3 class="favorite-title">{{ favoriteItem.title }}</h3>
            <van-image v-for="(imageURI, index) in favoriteItem.images" :src="imageURI" 
                        fit="cover" :key="index" class="favorite-image"/>
        </router-link>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue"
import http from "@/request/index"
import { useRouter } from 'vue-router'
const favoriteItems = reactive([]);
const router = useRouter();
const navigateBack = () => router.go(-1);  

onMounted(async () => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || [];

    if (Array.isArray(favoriteIDs)) {
        for (let id of favoriteIDs) {
            let res = await http.get('/api/news/' + id)
            favoriteItems.push({
                id: res.id,
                title: res.title,
                images: res.images,
                image: res.image
            })
        }
    } else {
        console.debug("Check favoriteIDs, format might be incorrect or list is empty.")
    }
})
</script>

<style scoped>
.custom-navbar {
    height: 60px; 
    justify-content: center;
    align-items: center;
}

.navbar-title {
    font-size: 2.1em;
    margin-top: 1.5em;
    margin-bottom: 1.5em; 
}

.favorite-section {
    display: flex;
    flex-direction: column;
    gap: 2em; 
    align-items: flex-start; 
}

.favorite-link {
    display: flex;
    justify-content: space-around; 
    align-items: center;
    color: black;
    text-decoration: none;
}

.favorite-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.6em; 
}

.favorite-image {
    max-width: 100px; 
    height: auto;
    flex: 0 0 auto;
    margin-left: 30px; 
}
</style>