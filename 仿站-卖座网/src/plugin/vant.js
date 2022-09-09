import Vue from 'vue'
import {
  Divider,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  List,
  Cell,
  Lazyload,
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  IndexBar,
  IndexAnchor,
  Dialog,
  Grid,
  GridItem,
  Form,
  Field,
  Search,
  Tag
} from 'vant'
;[
  Divider,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  List,
  Cell,
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  IndexBar,
  IndexAnchor,
  Dialog,
  Grid,
  GridItem,
  Form,
  Field,
  Search,
  Tag
].forEach((component) => {
  Vue.use(component)
})

Vue.use(Lazyload, {
  loading: 'http://img.1314000.cn/icon/cookbook.png',
  error: 'http://img.1314000.cn/icon/cookbook-active.png'
})
