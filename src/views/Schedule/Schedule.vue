<template>
  <div v-if="schedule" class="main">
    <header>
      <span><van-icon name="arrow-left" size="24" @click="$router.back()" /></span>
      {{ schedule.cinema.name }}
    </header>

    <section>
      <notice :noticeMsg="schedule.noticeMsg" />
      <seating-chart ref="map" :maxSeat="maxSeat">
        <span v-if="sessions">{{ sessions[currentSession].hallName }}</span>
      </seating-chart>
    </section>

    <footer v-if="sessions">
      <tag-explain v-show="!$store.state.chosen.length" />
      <film-detail :schedule="schedule" :sessions="sessions" :currentSession="currentSession" />
      <submit :session="sessions[currentSession]" />
    </footer>
  </div>
</template>
<script>
import { Icon } from 'vant'
import http from '@/util/http.js'
import SeatingChart from './SeatingChart.vue'
import TagExplain from './TagExplain.vue'
import Notice from './Notice.vue'
import FilmDetail from './filmDetail/FilmDetail'
import Submit from './Submit.vue'
import EventBus from '@/util/eventBus'
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('userPhone')) {
      next()
    } else {
      next({
        path: '/Login',
        query: { redirect: to.fullPath }
      })
    }
  },
  data() {
    return {
      schedule: null,
      sessions: null,
      currentSession: 0,
      maxSeat: 5,
    }
  },
  components: {
    [Icon.name]: Icon,
    SeatingChart,
    TagExplain,
    Notice,
    FilmDetail,
    Submit
  },
  mounted() {
    EventBus.$on('update:currentSession', this.updateSession)
    this.getSchedule(this.$route.params.scheduleId)
  },
  beforeDestroy() {
    EventBus.$off('update:currentSession')
    this.$store.commit('emptyChoices')
  },
  methods: {
    updateSession(index) {
      this.currentSession = index
      this.$refs.map.getSeatingChart(this.sessions[index].scheduleId)
      // 刷新seats数据
    },
    getSchedule(scheduleId) {
      http({
        url: `/gateway/?scheduleId=${scheduleId}&k=4878872`,
        headers: {
          'X-Host': 'mall.film-ticket.schedule.info'
        }
      }).then((res) => {
        res = res.data.data.schedule
        this.schedule = res
        this.getSession(res.film.filmId, res.cinema.cinemaId, res.showAt)
      })
    },
    getSession(filmId, cinemaId, date) {
      http({
        url: `/gateway/?filmId=${filmId}&cinemaId=${cinemaId}&date=${date}&k=1024902`,
        headers: {
          'X-Host': 'mall.film-ticket.schedule.list',
        }
      }).then((res) => {
        this.sessions = res.data.data.schedules
        this.currentSession = this.sessions.findIndex((index) => index.showAt === date)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.main{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  section{
    flex-grow: 1;
    overflow: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
header {
  background: #fff;
  height: 44px;
  position: relative;
  text-align: center;
  line-height: 44px;
  color: #191a1b;
  font-size: 17px;

  span {
    line-height: 24px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}

footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #f6f6f6;
  width: 100%;
  // position: fixed;
  // bottom: 10px;
  z-index: 20;
  padding: 10px 0;
}
</style>
