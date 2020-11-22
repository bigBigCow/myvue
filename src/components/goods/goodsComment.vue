<template>
    <div>
        <p>商品评论</p>
        <comment :commentid="$route.params.id"></comment>
    </div>
</template>
<script>
import comment from "../comment/comment.vue"
export default {
    components:{
        comment
    }
}
</script>