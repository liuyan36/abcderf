<template>
  <div class="index-vue">
    <!-- 侧边栏 -->
    <aside :class="asideClassName">
      <!-- logo -->
      <div class="logo-c" @click="logoBtn">
        <div class="logo-c-div" v-show="isShowAsideTitle">
          <img
            class="logo-c-div-img"
            src="../assets/login/login-logo.png"
            alt
          />
          <div class="logo-c-div-title">乡米网后台管理系统</div>
        </div>
      </div>
      <!-- 菜单栏 -->
      <Menu
        class="menu"
        ref="asideMenu"
        theme="dark"
        width="100%"
        @on-select="selectMenuCallback"
        accordion
        :open-names="openMenus"
        :active-name="currentPage"
        @on-open-change="menuChange"
      >
        <!-- 动态菜单 -->
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          style="border-radius: 10px 0px 0px 10px"
        >
          <Submenu
            :class="isShowAsideTitle ? '' : 'shrink'"
            v-if="item.children"
            :name="index"
          >
            <template slot="title">
              <!-- <Icon :size="item.size" :type="item.type" /> -->
              <i
                style="
                  width: 12.44px;
                  height: 12.44px;
                  margin-right: 0.04125rem;
                "
                :size="item.size"
                :class="item.type"
              ></i>
              <span v-show="isShowAsideTitle">{{ item.text }}</span>
            </template>
            <div v-for="(subItem, i) in item.children" :key="index + i">
              <Submenu
                :class="isShowAsideTitle ? '' : 'shrink'"
                v-if="subItem.children"
                :name="index + '-' + i"
              >
                <template slot="title">
                  <i :size="subItem.size" :class="subItem.type"></i>
                  <span v-show="isShowAsideTitle">{{ subItem.text }}</span>
                </template>
                <template v-for="(threeItem, k) in subItem.children">
                  <MenuItem
                    :class="isShowAsideTitle ? '' : 'shrink'"
                    class="menu-level-3"
                    :name="threeItem.name"
                    :key="index + i + k"
                  >
                    <template v-if="!threeItem.hidden">
                      <i :size="threeItem.size" :class="threeItem.type"></i>
                      <span v-show="isShowAsideTitle">
                        {{ threeItem.text }}
                      </span>
                    </template>
                  </MenuItem>
                </template>
              </Submenu>
              <template v-else-if="!subItem.hidden">
                <a
                  :href="subItem.url"
                  v-if="subItem.isExternal"
                  target="_blank"
                  class="external"
                >
                  <MenuItem
                    :class="isShowAsideTitle ? '' : 'shrink'"
                    :name="'external-link-' + index + '-' + i"
                  >
                    <i :size="subItem.size" :class="subItem.type"></i>
                    <span v-show="isShowAsideTitle">{{ subItem.text }}</span>
                  </MenuItem>
                </a>
                <MenuItem
                  v-else
                  :class="isShowAsideTitle ? '' : 'shrink'"
                  :name="subItem.name"
                >
                  <i
                    style="
                      width: 12.44px;
                      height: 12.44px;
                      margin-right: 0.04125rem;
                    "
                  ></i>
                  <!-- <i :size="subItem.size" :class="subItem.type" style=""></i> -->
                  <span v-show="isShowAsideTitle">{{ subItem.text }}</span>
                </MenuItem>
              </template>
            </div>
          </Submenu>
          <template v-else-if="!item.hidden">
            <div
              :href="item.url"
              v-if="item.isExternal"
              target="_blank"
              class="external"
            >
              <MenuItem
                :class="isShowAsideTitle ? '' : 'shrink'"
                :name="'external-link-' + index"
              >
                <i :size="item.size" :class="item.type"></i>
                <span v-show="isShowAsideTitle">{{ item.text }}</span>
              </MenuItem>
            </div>
            <div
              v-else
              :style="{
                background:
                  stairShow == false
                    ? 'linear-gradient(135deg, #36C53D 0%, #3FD747 100%)'
                    : 'none',
                borderRadius: stairShow == false ? '10px 0px 0px 10px' : '',
              }"
            >
              <MenuItem
                :class="isShowAsideTitle ? '' : 'shrink'"
                :name="item.name"
                :style="{ color: stairShow == false ? '#fff' : '' }"
              >
                <i
                  style="width: 12.44px; height: 12.44px"
                  :size="item.size"
                  :class="item.type"
                ></i>
                <span v-show="isShowAsideTitle">{{ item.text }}</span>
              </MenuItem>
            </div>
          </template>
        </div>
      </Menu>
    </aside>

    <!-- 右侧部分 -->
    <section class="sec-right">
      <!-- 头部 -->
      <div class="top-c">
        <header>
          <div class="h-left">
            <div class="pointer" @click="isShrinkAside">
              <Icon
                type="ios-apps"
                style="color: #d8d8d8; font-size: 20px; margin-left: 20px"
              />
            </div>
            <div class="crumbs" @click="crumbsHome">
              <img
                class="crumbs-img"
                src="../assets/common/common-home.png"
                alt
                srcset
              />
            </div>

            <div class="sec-list">
              <div
                class="list"
                v-for="(item, index) in tagsArry.slice(0, 7)"
                :key="index"
                :class="{ listActive: isActive(item.name) }"
                @click="activeTag(index)"
              >
                <div class="list-title">{{ item.text }}</div>
                <Icon
                  size="16"
                  @click.stop="closeTag(index, false)"
                  type="md-close"
                  style="margin-left: 10px"
                />
              </div>
            </div>
          </div>
          <div class="h-right">
            <div
              class="sec-finally"
              v-if="dropdownArray.length == 0"
              style="background: #e9edf4"
            >
              <img
                class="sec-finally-img"
                src="../assets/common/common-grayMore.png"
              />
            </div>
            <div class="sec-finally" v-else @click="tabsClose">
              <Dropdown
                placement="bottom-end"
                trigger="click"
                @on-click="tabsClose"
              >
                <img
                  class="sec-finally-img"
                  src="../assets/common/common-white.png"
                />
                <DropdownMenu slot="list">
                  <DropdownItem
                    v-for="(item, index) in dropdownArray"
                    :key="index"
                    :name="index"
                  >
                    <div
                      class="more-list-block"
                      :class="{ listActive: isActive(item.name) }"
                    >
                      <div class="more-list-block-title">{{ item.text }}</div>
                      <Icon
                        size="14"
                        @click="closeTag(index, true)"
                        type="md-close"
                        class="more-list-block-close"
                      />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div class="h-right-title">你好，{{ infoOb.nickname }}</div>
            <div class="h-right-div" @click="quitBtn">
              <img
                class="h-right-div-img"
                src="../assets/common/common-quit.png"
              />
              <div class="h-right-div-text">退出</div>
            </div>
          </div>
        </header>
      </div>
      <!-- 页面主体 -->
      <div class="main-content">
        <div class="view-c">
          <div v-if="indexPermissions == true">
            <keep-alive :include="keepAliveData">
              <!-- 子页面 -->
              <router-view v-if="isShowRouter" />
            </keep-alive>
          </div>

          <div class="classify-layer" v-else>
            <div class="classify-layer-block">
              <img
                class="classify-layer-block-img"
                src="../assets/common/common-jurisdiction.png"
              />

              <div class="classify-layer-block-text">暂无权限</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 退出Dialog 对话框 -->
    <el-dialog
      :visible.sync="quitDialogVisible"
      width="394px"
      style="margin-top: 15vh"
      :show-close="false"
    >
      <span slot="footer" class="dialog-footer">
        <div class="dialog-div">
          <img
            class="dialog-div-img"
            src="../assets/common/common-warning.png"
          />
          <div class="dialog-div-title">您确定要退出登录吗？</div>
          <div class="dialog-div-button">
            <div class="dialog-div-button-left" @click="quitRegister">确定</div>
            <div
              class="dialog-div-button-right"
              @click="quitDialogVisible = false"
            >
              取消
            </div>
          </div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { resetTokenAndClearUser } from '../utils'

import Bus from '../utils/bus'
// 查询对应名称
import menuTemporary from '../utils/merge'
// 获取个人信息接口
import { getinfo, loginout } from '../api/login'

export default {
  name: 'index',
  data() {
    return {
      // 用于储存页面路径
      paths: {},
      // 当前显示页面
      currentPage: '',
      openMenus: [], // 要打开的菜单名字 name属性
      menuCache: [], // 缓存已经打开的菜单
      hasNewMsg: true, // 是否有新消息
      isShowRouter: true,
      msgNum: '10', // 新消息条数
      // 标签栏         标签标题     路由名称
      // 数据格式 {text: '首页', name: 'home'}
      // 用于缓存打开的路由 在标签栏上展示
      tagsArry: [],
      arrowUp: false, // 用户详情向上箭头
      arrowDown: true, // 用户详情向下箭头
      isShowAsideTitle: true, // 是否展示侧边栏内容
      main: null, // 页面主要内容区域
      asideClassName: 'aside-big', // 控制侧边栏宽度变化
      asideArrowIcons: [], // 缓存侧边栏箭头图标 收缩时用
      // 面包屑
      crumbs: '主页',
      // 用户登录后获取对应的对象
      indexObj: {},
      // 主页路由名称
      home: 'home',
      // 用于缓存打开的路由 在下拉菜单上展示
      dropdownArray: [],
      // 判断当前是标签栏里面删除还是tab删除
      tagShow: false,
      // 判断用户是否是一级  点击一级触发  一级为true 否则 false
      stairShow: false,
      // 点击退出页面控制蒙层
      quitDialogVisible: false,
      // 存放子页面数据缓存
      subpagecacheArray: [],
      // 存储当前个人信息对象
      infoOb: {},
      // 当前页面是否有无权限
      indexPermissions: true,
    }
  },
  mounted() {
    // 其他组件传递事件
    Bus.$on('log', (name, item) => {
      // 创建一个对象  将获取的缓存拿出
      if (item != undefined) {
        let Obj = item
        Obj.routerName = name

        this.subpagecacheArray.push(Obj)

        this.subpagecacheArray.forEach((item, index) => {
          if (item.routerName != name) {
            this.subpagecacheArray.splice(index, 1)
          }
        })
      }
      this.gotoPage(name, item)
    })

    // 关闭子路径页面删除当前页面
    Bus.$on('detele', (name, item) => {
      console.log('关闭删除', name)
      console.log('获取第一个数组长度', this.tagsArry.length)
      if (this.tagsArry.length >= 7) {
        this.dropdownArray.forEach((item, index) => {
          if (name == item.name) {
            this.dropdownArray.splice(index, 1)

            if (this.dropdownArray.length) {
              if (this.isActive(name)) {
                if (index != 0) {
                  this.gotoPage(this.dropdownArray[index - 1].name)
                } else {
                  this.gotoPage(this.dropdownArray[index].name)
                }
              }
            } else if (name != this.home) {
              // 如果没有标签则跳往首页
              this.gotoPage(this.home)
            } else {
              this.reloadPage()
            }
          }
        })
      } else {
        this.tagsArry.forEach((item, index) => {
          if (name == item.name) {
            console.log('查询下标', index)
            this.tagsArry.splice(index, 1)

            if (this.tagsArry.length) {
              if (this.isActive(name)) {
                if (index != 0) {
                  this.gotoPage(this.tagsArry[index - 1].name)
                } else {
                  this.gotoPage(this.tagsArry[index].name)
                }
              }
            } else if (name != this.home) {
              // 如果没有标签则跳往首页
              this.gotoPage(this.home)
            } else {
              this.reloadPage()
            }
          }
        })
      }
    })

    // 第一个标签
    const name = this.$route.name
    this.currentPage = name

    console.log('监听', name)
    this.commonPermissions(name)

    if (name != 'home') {
      this.stairShow = true
    }

    console.log('数组查询', this.nameToTitle)

    this.tagsArry.push({
      text: this.nameToTitle[name],
      name,
    })

    // 根据路由打开对应的菜单栏
    this.openMenus = this.getMenus(name)
    this.$nextTick(() => {
      this.$refs.asideMenu.updateOpened()
    })

    // 设置用户信息
    this.main = document.querySelector('.sec-right')
    this.indexObj = JSON.parse(localStorage.getItem('userInfo'))
    this.asideArrowIcons = document.querySelectorAll(
      'aside .ivu-icon-ios-arrow-down'
    )

    // 监听窗口大小 自动收缩侧边栏
    this.monitorWindowSize()
  },
  watch: {
    $route(to) {
      const name = to.name
      console.log('点击tou', name)

      this.currentPage = name
      if (name == 'error') {
        this.crumbs = '404'
        return
      }

      if (!this.keepAliveData.includes(name)) {
        // // 如果标签超过8个 则将第一个标签删除
        // if (this.tagsArry.length == 7) {
        //   //   this.tagsArry.shift()
        //   return
        // }
        this.tagsArry.push({ name, text: this.nameToTitle[name] })
      }

      console.log('查询数组对象', this.tagsArry)

      setTimeout(() => {
        this.crumbs = this.paths[name]
      }, 0)
    },
  },
  computed: {
    // 菜单栏
    menuItems() {
      return this.$store.state.menuItems
    },
    // 手动添加动态数组合并栏
    mergeItem() {
      return menuTemporary
    },
    // 需要缓存的路由
    keepAliveData() {
      return this.tagsArry.map((item) => item.name)
    },
    // 需要缓存更多路由
    keepAliveMoreData() {
      return this.dropdownArray.map((item) => item.name)
    }, // 由于iView的导航菜单比较坑 只能设定一个name参数
    // 所以需要在这定义组件名称和标签栏标题的映射表 有多少个页面就有多少个映射条数
    nameToTitle() {
      const obj = {}
      this.mergeItem.forEach((e) => {
        this.processNameToTitle(obj, e)
      })

      return obj
    },
  },
  methods: {
    getMenus(name) {
      let menus
      const tagTitle = this.nameToTitle[name]
      for (let i = 0, l = this.menuItems.length; i < l; i++) {
        const item = this.menuItems[i]
        menus = []
        menus[0] = i
        if (item.text == tagTitle) {
          return menus
        }

        if (item.children) {
          for (let j = 0, ll = item.children.length; j < ll; j++) {
            const child = item.children[j]
            menus[1] = i + '-' + j
            menus.length = 2
            if (child.text == tagTitle) {
              return menus
            }

            if (child.children) {
              for (let k = 0, lll = child.children.length; k < lll; k++) {
                const grandson = child.children[k]
                menus[2] = i + '-' + j + '-' + k
                if (grandson.text == tagTitle) {
                  return menus
                }
              }
            }
          }
        }
      }
    },

    monitorWindowSize() {
      let w = document.documentElement.clientWidth || document.body.clientWidth
      if (w < 1300) {
        this.shrinkAside()
      }

      window.onresize = () => {
        // 可视窗口宽度太小 自动收缩侧边栏
        if (
          w < 1300 &&
          this.isShowAsideTitle &&
          w >
            (document.documentElement.clientWidth || document.body.clientWidth)
        ) {
          this.shrinkAside()
        }
        w = document.documentElement.clientWidth || document.body.clientWidth
      }
    },

    // 判断当前标签页是否激活状态
    isActive(name) {
      return this.$route.name === name
    },
    // 跳转页面 路由名称和参数
    gotoPage(name, params) {
      console.log('获取路径参数', params)
      this.commonPermissions(name, params)

      this.currentPage = name
      console.log('第一步 获取跳转页面名称', name)
      this.crumbs = this.paths[name]
      // this.$router.push({ name, params })

      if (!this.keepAliveData.includes(name)) {
        // // 如果标签超过8个 则将第一个标签删除
        if (this.tagsArry.length >= 7) {
          this.dropdownArray.push({ name, text: this.nameToTitle[name] })
          // return
        }
        this.tagsArry.push({ name, text: this.nameToTitle[name] })
      }
    },
    // 选择菜单回调函数
    selectMenuCallback(name) {
      if (name == 'home') {
        this.stairShow = false
        this.openMenus = []
        this.$nextTick(() => {
          if (this.$refs.asideMenu) {
            this.$refs.asideMenu.updateOpened()
          }
        })
      }

      if (name.includes('external-link')) return

      this.gotoPage(name)

      this.expandAside()
      setTimeout(() => {
        this.isShowAsideTitle = true
      }, 200)
    },
    // 控制用户三角箭头显示状态
    showArrow(flag) {
      this.arrowUp = flag
      this.arrowDown = !flag
    },
    // 判断
    isShrinkAside() {
      if (this.isShowAsideTitle) {
        this.shrinkAside()
      } else {
        this.expandAside()
      }
    },
    // 收缩
    shrinkAside() {
      for (let i = 0, len = this.asideArrowIcons.length; i < len; i++) {
        this.asideArrowIcons[i].style.display = 'none'
      }

      this.isShowAsideTitle = false
      this.openMenus = []
      this.$nextTick(() => {
        if (this.$refs.asideMenu) {
          this.$refs.asideMenu.updateOpened()
        }
      })

      setTimeout(() => {
        this.asideClassName = ''
        this.main.style.marginLeft = '0.56rem'
      }, 0)
    },
    // 展开
    expandAside() {
      setTimeout(() => {
        this.isShowAsideTitle = true
        for (let i = 0, len = this.asideArrowIcons.length; i < len; i++) {
          this.asideArrowIcons[i].style.display = 'block'
        }

        this.openMenus = this.menuCache
        if (this.$refs.asideMenu) {
          this.$refs.asideMenu.updateOpened()
        }
      }, 200)
      this.asideClassName = 'aside-big'
      this.main.style.marginLeft = '1.145833rem'
    },
    // 刷新当前标签页
    reloadPage() {
      console.log('点击刷新')
      let name = this.$route.name
      let index = this.keepAliveData.indexOf(name)
      this.$nextTick(() => {
        if (this.tagsArry.length) {
          this.isShowRouter = false
          this.tagsArry.splice(index, 1)
          this.$nextTick(() => {
            this.tagsArry.splice(index, 0, {
              name,
              text: this.nameToTitle[name],
            })
            this.gotoPage(name)
            this.isShowRouter = true
          })
        } else {
          this.isShowRouter = false
          this.$nextTick(() => {
            this.tagsArry.push({ name, text: this.nameToTitle[name] })
            this.gotoPage(name)
            this.isShowRouter = true
          })
        }
      })
    },
    // 关闭单个标签
    closeTag(i, ishow) {
      this.tagShow = ishow
      if (ishow == false) {
        let name = this.tagsArry[i].name
        this.tagsArry.splice(i, 1)
        console.log('删除tagArry数组中默认一个')

        if (this.tagsArry.length >= 7) {
          // 当数组大于7个的时候进入删除
          let name = this.dropdownArray[0].name
          this.dropdownArray.splice(0, 1)
          window.event.stopPropagation()
          // 如果关闭的是当前标签 则激活前一个标签
          // 如果关闭的是第一个标签 则激活后一个标签
          if (this.dropdownArray.length) {
            if (this.isActive(name)) {
              if (0 != 0) {
                this.gotoPage(this.dropdownArray[0 - 1].name)
              } else {
                this.gotoPage(this.dropdownArray[0].name)
              }
            }
          } else if (name != this.home) {
            // 如果没有标签则跳往首页
            this.gotoPage(this.home)
          } else {
            this.reloadPage()
          }
        }
        window.event.stopPropagation()
        // 如果关闭的是当前标签 则激活前一个标签
        // 如果关闭的是第一个标签 则激活后一个标签
        if (this.tagsArry.length) {
          if (this.isActive(name)) {
            if (i != 0) {
              this.gotoPage(this.tagsArry[i - 1].name)
            } else {
              this.gotoPage(this.tagsArry[i].name)
            }
          }
        } else if (name != this.home) {
          // 如果没有标签则跳往首页
          this.gotoPage(this.home)
        } else {
          this.reloadPage()
        }
      } else {
        let name = this.dropdownArray[i].name
        this.dropdownArray.splice(i, 1)
        window.event.stopPropagation()
        // 如果关闭的是当前标签 则激活前一个标签
        // 如果关闭的是第一个标签 则激活后一个标签
        if (this.dropdownArray.length) {
          if (this.isActive(name)) {
            if (i != 0) {
              this.gotoPage(this.dropdownArray[i - 1].name)
            } else {
              this.gotoPage(this.dropdownArray[i].name)
            }
          }
        } else if (name != this.home) {
          // 如果没有标签则跳往首页
          this.gotoPage(this.home)
        } else {
          this.reloadPage()
        }
      }
    },
    // 根据路由名称关闭页面
    closeName(name) {
      console.log('关闭页面', name)

      for (let i = 0, len = this.tagsArry.length; i < len; i++) {
        if (this.tagsArry[i].name == name) {
          this.closeTag(i)
          break
        }
      }
    },
    // 批量关闭标签
    closeTags(flag) {
      if (flag == 1) {
        // 关闭其他标签
        this.tagsArry = []
        this.dropdownArray = []
        this.gotoPage(this.$route.name)
      } else {
        // 关闭所有标签
        this.tagsArry = []
        this.dropdownArray = []
        this.gotoPage(this.home)
        this.reloadPage()
      }
    },
    // 激活标签
    activeTag(i) {
      console.log('点击激活标签', i)
      if (this.subpagecacheArray.length > 0) {
        this.subpagecacheArray.forEach((item, index) => {
          if (item.routerName == this.tagsArry[i].name) {
            this.gotoPage(this.tagsArry[i].name, item)
          } else {
            this.gotoPage(this.tagsArry[i].name)
          }
        })
      } else {
        this.gotoPage(this.tagsArry[i].name)
      }
    },
    // 菜单栏改变事件
    menuChange(data) {
      console.log('用户点击一级')
      this.stairShow = true
      this.menuCache = data
    },
    processNameToTitle(obj, data, text) {
      if (data.name) {
        obj[data.name] = data.text
        this.paths[data.name] = text ? `${text} / ${data.text}` : data.text
      }
      if (data.children) {
        data.children.forEach((e) => {
          this.processNameToTitle(
            obj,
            e,
            text ? `${text} / ${data.text}` : data.text
          )
        })
      }
    },

    // **********************************************************
    // 综合判断当前用户点击对应页面是否有无权限观看
    commonPermissions(name, items) {
      // 调用接口判断当前页面是否有无权限
      // 如果当前接口页面是没有权限的话就做暂无页面
      let params = {}

      getinfo(params).then((res) => {
        console.log('获取个人信息接口', res)

        if (res.resultStatus == true) {
          this.infoOb = res.resultData

          this.indexPermissions = false
          this.$store.commit('setPerfect', false)

          // 如果当前页面是超级管理员的话 页面权限则不存在
          if (res.resultData.isSuper == 1 || name == 'home') {
            this.indexPermissions = true
            this.$store.commit('setPerfect', true)
          } else if (
            name == 'marketOrderdetail' ||
            name == 'afterSaledetail' ||
            name == 'integralOrderdetail' ||
            name == 'secondClassify' ||
            name == 'commodityAdd' ||
            name == 'marketingFirstclassifi' ||
            name == 'marketingSecondclassifi' ||
            name == 'marketingSecondcommdityclassifi' ||
            name == 'supplierFreightset' ||
            name == 'userDetails' ||
            name == 'roleError' ||
            name == 'roleAdd'
          ) {
            this.indexPermissions = true
            this.$store.commit('setPerfect', true)
          } else {
            // 获取页面封锁权限数组
            let indexLockdownArray =
              res.resultData.resource == null
                ? []
                : res.resultData.resource.split(';')
            // vuex中路径返回数组
            let pathTotalArray = this.$store.state.pathTotal
            //--------------------------------------
            console.log('查询对应的name', name)
            console.log('数组', pathTotalArray)
            console.log('index', indexLockdownArray)
            // -----------------------------------------------------------------------
            // 临时存储当前页面功能和展示
            let temporaryArray = []

            for (let i = 0; i < pathTotalArray.length; i++) {
              if (name == pathTotalArray[i].value) {
                // 获取我点击对应的路径名称，从公共管理器中进行判断获取对应的 展示和 功能 字段
                temporaryArray.push(pathTotalArray[i])
              }
            }

            temporaryArray.forEach((item, index) => {
              if (index == 0) {
                // 页面展示
                for (let j = 0; j < indexLockdownArray.length; j++) {
                  if (item.key == indexLockdownArray[j]) {
                    // 页面存在则打开限制
                    console.log('页面查看存在')
                    this.indexPermissions = true
                  }
                }
              }

              if (index == 1) {
                console.log('页面权限开启', item.key)
                // 页面功能
                for (let j = 0; j < indexLockdownArray.length; j++) {
                  if (item.key == indexLockdownArray[j]) {
                    // 页面组权限存在则打开限制
                    this.$store.commit('setPerfect', true)
                  }
                }
              }
            })
          }
        }

        this.$router.push({ path: name, query: items })
      })
    },

    // 用户点击logo进行返回对应首页
    logoBtn() {
      this.$router.push({ name: 'home' })
    },

    // 点击触发
    tabsClose(index) {
      let name = this.dropdownArray[index].name

      this.commonPermissions(name)
    },
    // 点击首页icon 返回首页选中
    crumbsHome() {
      this.$router.push({ name: 'home' })
    },
    // 用户点击退出按钮
    quitBtn() {
      this.quitDialogVisible = true
    },
    // 用户退出弹框确认
    quitRegister() {
      let params = {}

      loginout(params).then((res) => {
        resetTokenAndClearUser()
        this.$router.push({ name: 'login' })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.index-vue {
  height: 100%;
  color: #666;
}

:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
}
/deep/ .el-input .el-input__clear {
  display: flex !important;
  align-items: center !important;
}

/deep/ .el-input__icon {
  line-height: 0;
}

/deep/ .el-range-editor.is-active {
  border-color: rgba(217, 217, 217, 1);
}

/deep/ .el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: rgba(217, 217, 217, 1);
}

/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
  background: none;
}

/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: rgba(255, 255, 255, 0) !important;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover {
  color: #36c100;
  background: none;
}

/deep/ .ivu-menu-dark {
  background: #fff;
  padding-left: 10px !important;
  box-sizing: border-box;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  color: #36c100 !important;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}

/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-opened
  .ivu-menu-submenu-title {
  height: 44px;
  background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%) !important;
  border-radius: 10px 0px 0px 10px !important;
  color: #ffffff !important;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  //   border-radius: 10px 0px 0px 10px !important;
  //   background: rgba(255, 255, 255, 0) !important;
  background: none;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: none;
}

/deep/ .ivu-menu-submenu {
  border-radius: 10px 0px 0px 10px !important;
}

/deep/ .ivu-menu-item {
  border-radius: 10px 0px 0px 10px !important;
  padding: 0 !important;
  padding-left: 15px !important;
  height: 54px !important;
  display: flex;
  align-items: center;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item {
  color: #222222;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}

/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active {
  border-radius: 10px 0px 0px 10px !important;
}

/deep/ .el-dropdown-menu {
  padding: 0;
}

/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
}

/* 11111111111111 */
/deep/ .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  border-radius: 10px 0px 0px 10px !important;
}

/deep/ .ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0 !important;
  height: 54px !important;
  display: flex;
  align-items: center;
  padding-left: 15px !important;
  box-sizing: border-box;
}

/* 侧边栏 */
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 110px;
  height: 100%;
  transition: width 0.3s;
  overflow: auto;
  background: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
}
.logo-c {
  height: 165px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: center;

  .logo-c-div {
    margin-top: 29px;
    .logo-c-div-img {
      width: 124px;
      height: 61px;
    }

    .logo-c-div-title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      margin-top: 10px;
    }
  }
}
.aside-big {
  width: 220px;
}

.aside-big::-webkit-scrollbar {
  width: 3px !important;
  height: 3px !important;
}

.aside-big::-webkit-scrollbar-thumb {
  border-radius: 10px;
  width: 1px;
  background: rgba(255, 255, 255, 0.5);
}

.aside-big::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: rgba(57, 177, 255, 0.16);
}

/* 主体页面 */
.sec-right {
  height: 100%;
  margin-left: 220px;
  transition: margin-left 0.3s;
  overflow: hidden;
  background: #f4f5f9;
}

/* 主体页面头部 */
header {
  height: 78px;
  border-bottom: none;
  background: #f4f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
  padding-left: 10px;
  font-size: 14px;
}
header .ivu-icon {
  font-size: 24px;
}
.refresh-c {
  margin: 0 20px;
  cursor: pointer;
}
.h-right {
  display: flex;
  align-items: center;
  height: 30px;

  .sec-finally {
    width: 50px;
    height: 30px;
    background: #36c100;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .sec-finally-img {
      width: 16px;
      height: 16px;
      color: #fff;
    }

    /deep/ .ivu-dropdown-rel {
      display: flex;
    }

    /deep/ .ivu-select-dropdown {
      padding: 10px 0;
      max-height: 370px;
      margin-top: 16px;
      overflow: auto;
    }

    /deep/ .ivu-dropdown-menu {
      width: 176px;
    }

    /deep/ .ivu-dropdown-item {
      padding: 0;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-bottom: 10px;
    }

    /deep/ .ivu-dropdown-item:last-child {
      margin-bottom: 0;
    }

    .more-list-block {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 0 16px;
      box-sizing: border-box;

      .more-list-block-title {
        font-size: 14px;
      }

      .more-list-block-close {
        position: absolute;
        right: 10px;
      }
    }

    .listActive {
      background: #36c100;

      .more-list-block-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }

      /deep/ .ivu-icon {
        color: #fff;
      }
    }
  }

  .h-right-title {
    margin-left: 27px;
    width: 103px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #444444;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .h-right-div {
    width: 60px;
    height: 30px;
    background: #e9edf4;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
    .h-right-div-img {
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }
    .h-right-div-text {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
    }
  }
}
.h-left {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.tag-options {
  cursor: pointer;
  position: relative;
}
.div-tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
}

/* 标签栏 */
.ul-c {
  height: 40px;
  background: #72d0f4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 140px);
  border-bottom: 1px solid #f4f5f9;
  padding: 0 10px;
  box-sizing: border-box;

  .ul-c-div {
    border: 1px solid #fff;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 160px;
    margin-right: 10px;

    .ul-c-div-title {
      color: #fff;
      font-size: 14px;
    }
  }

  .ul-c-div:last-child {
    margin-right: 0;
  }

  .active {
    color: #fff;
  }
}
/* 主要内容区域 */
.main-content {
  height: calc(100% - 100px);
  overflow: auto;
  padding: 0 24px;
  padding-right: 10px;
  box-sizing: border-box;
}
.view-c {
  position: relative;
  height: 100%;

  .view-bottom {
    height: 30px;
    width: 100%;
  }
}
.pointer {
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
}
.crumbs {
  margin-left: 10px;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;

  .crumbs-img {
    width: 18px;
    height: 18px;
  }
}

.sec-list {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 20px;

  .list {
    height: 30px;
    background: #e9edf4;
    border-radius: 15px;
    margin-right: 10px;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .list-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
    }
  }

  .listActive {
    background: #36c100;

    .list-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    /deep/ .ivu-icon {
      color: #fff;
    }
  }

  .list:last-child {
    margin-right: 0;
  }
}

.menu-level-3 .ivu-icon {
  font-size: 18px;
}
.shrink {
  text-align: center;
  display: flex;
  justify-content: center;
}
.external {
  color: rgba(255, 255, 255, 0.7);
}
.external > i {
  margin-right: 6px;
}

/deep/ .el-dropdown-menu__item {
  padding: 0;
}

.dropdown-div {
  width: 250px;
  background: #ffffff;
  padding: 0 16px;
  box-sizing: border-box;

  .dropdown-div-top {
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    .dropdown-div-top-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .dropdown-div-top-name {
      margin-left: 8px;
      font-size: 18px;
      font-family: DINAlternate-Bold, DINAlternate;
      font-weight: bold;
      color: #444444;
    }
  }

  .dropdown-div-title {
    margin-top: 27px;
    height: 48px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 20px;
    word-break: break-all;
  }

  .dropdown-div-block {
    display: flex;
    justify-content: center;
    margin-top: 21px;

    .dropdown-div-block-write {
      width: 62px;
      height: 28px;
      background: #eafbed;
      border-radius: 4px;
      border: 1px solid #29d647;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #29d647;
      text-align: center;
      line-height: 28px;
    }
    .dropdown-div-block-quit {
      width: 62px;
      height: 28px;
      background: #29d647;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      line-height: 28px;
      margin-left: 24px;
    }
  }
}

/*end */
// 退出弹出框
/deep/ .el-dialog {
  height: 248px;
  background: #ffffff;
  border-radius: 3px;
}

/deep/ .el-dialog__header {
  display: none;
}

/deep/ .el-dialog__body {
  display: none;
}

/deep/ .el-dialog__footer {
  padding: 25px 16px;
}

/*end */

.dialog-div {
  text-align: center;
  .dialog-div-img {
    width: 56px;
    height: 56px;
  }

  .dialog-div-title {
    height: 32px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 32px;
    margin-bottom: 40px;
    margin-top: 8px;
  }

  .dialog-div-button {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    .dialog-div-button-left,
    .dialog-div-button-right {
      width: 88px;
      height: 32px;
      background: linear-gradient(135deg, #36c53d 0%, #3fd747 100%);
      border-radius: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
    }

    .dialog-div-button-right {
      background: #ffffff;
      border: 1px solid #e9edf4;
      color: rgba(0, 0, 0, 0.65);
      margin-left: 8px;
    }
  }
}

.classify-layer {
  width: 100%;
  height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;

  .classify-layer-block {
    .classify-layer-block-img {
      width: 200px;
      height: 200px;
    }

    .classify-layer-block-text {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
    }
  }
}
</style>
