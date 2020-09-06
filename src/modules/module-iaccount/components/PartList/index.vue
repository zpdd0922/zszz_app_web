<template>
  <part-card :title="title">
    <ul class="part-list">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="['list-item', isLink && 'link']"
        @click="_clickItem(item)">
          <!-- 默认插槽 -->
          <slot :item="item">
            <div class="item-media">
              <!-- 概览图 -->
              <slot name="img" :item="item">
                <img v-if="item[getAlias.img]" class="media-img" :src="item[getAlias.img]">
              </slot>
              <!-- 文本信息 -->
              <div class="media-txt">
                <!-- txt -->
                <slot name="txt" :item="item" :index="index">
                  <h5 class="title">
                    <span>{{ item[getAlias.title] }}</span>
                    <jf-icon v-if="item.tips" name="tips_gray" @click.native.stop="_clickItem(item, 'tips')"></jf-icon>
                    <jf-icon v-if="item.symbol" name="symbol">{{ item.symbol }}</jf-icon>
                  </h5>
                  <slot name="desc" :item="item" :index="index">
                    <p v-if="item.desc" class="txt">
                      <span>{{ item.desc }}</span>
                    </p>
                  </slot>
                </slot>
              </div>
            </div>
          </slot>
        </li>
    </ul>
  </part-card>
</template>

<script>
import PartCard from '../PartCard'

const DEFAULT_ALIAS = {
  title: 'title',
  img: 'img'
}

export default {
  components: {
    PartCard
  },
  props: {
    title: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    alias: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    getAlias() {
      return Object.assign({}, DEFAULT_ALIAS, this.alias)
    }
  },
  methods: {
    _clickItem(item, type) {
      this.$emit('clickItem', item, type)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.part-list {
  .list-item {
    &.link {
      @include arrow($dir: right, $border: 2px, $width: .08rem, $poa: .19rem);
      &:active {
        background: $color-theme-bg;
      }
    }
    &+.list-item {
      @include border-x(top, $left: .15rem);
    }
  }
  .item-media {
    @include flex-box($col: center);
    font-weight: 500;
    padding: .15rem .15rem;
  }
  .media-img {
    margin-left: .1rem;
    width: .2rem;
  }
  .media-txt {
    margin-left: .15rem;
    .title {
      @include flex-box($col: center);
      font-size: .16rem;
    }
    .txt {
      margin-top: .11rem;
      font-size: .13rem;
      color: $color-999;
      span+span {
        margin-left: .18rem;
      }
    }
      
  }
}
</style>
