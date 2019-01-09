import Vue from 'vue'
import Router from 'vue-router'
import Milestone from '../components/Milestone.vue'
import Receive from '../components/Receive.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Milestone',
      component: Milestone
    },
    {
      path:'/receive',
      name:'Receive',
      component:Receive
    }
  ]
})
