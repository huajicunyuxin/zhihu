<template>
    <div class="news-item-box">
        <router-link :to="`/detail/${id}`">
            <div class="content">
                <p class="title">{{ title }}</p>
                <p class="author" v-if="hint != null">{{ hint }}</p>
            </div>
            <van-image :src="images[0]" fit="fill" />
        </router-link>
    </div>
</template>

<script setup>
const props = defineProps({ info: Object })
const { id, title, hint, images, image } = props.info;

</script>

<style lang="scss" scoped>
.news-item-box {
    box-sizing: border-box;
    padding: 15px 0;
    height: 160px;

    a {
        display: flex;
        justify-content: space-between;
        height: 100%;

        &:visited {
            .content {
                .title {
                    color: #999;
                }

                .author {
                    color: #AAA;
                }
            }
        }

        .content {
            width: 78%;
            text-align:left;

            .title {
                font-size: 32px;
                color: #000;
                max-height: 90px;
                line-height: 45px;
                overflow: hidden;
            }

            .author {
                font-size: 24px;
                color: #999;
                line-height: 40px;
            }
        }

        .van-image {
            // flex:1
            width: 130px;
            height: 130px;
        }

    }

}
</style>