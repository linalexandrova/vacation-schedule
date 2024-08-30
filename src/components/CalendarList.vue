<template>
  <div class="calendar-list">
    <div v-for="(month, index) in daysByMonth" :key="index">
      <calendar-item>
        <template #calendar-item-header>
          <div class="calendar-list__list">
            {{ getMonthName(index) }}
          </div>
        </template>
        <template #calendar-item-body>
          <div v-if="month.days && month.days.length > 0" class="calendar-list__list">
            <div
              v-for="n in getEmptyDaysCount(month.days[0].week_day)"
              :key="'empty-' + n"
              class="calendar-list__list-item calendar-list__list-item-empty"
            ></div>
            <div v-for="day in month.days" :key="day.date" class="calendar-list__list-item">
              <div>{{ getDayFromDateString(day.date) }}</div>
            </div>
          </div>
        </template>
      </calendar-item>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import CalendarItem from '@/components/CalendarItem.vue';

// Определение интерфейсов для данных, получаемых от API
interface Day {
  date: string;
  type_id: number;
  type_text: string;
  week_day: string;
  working_hours: number;
}

interface MonthData {
  days: Day[];
}

export default defineComponent({
  name: 'CalendarList',
  components: {
    CalendarItem,
  },
  data() {
    return {
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      daysByMonth: [] as MonthData[],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      weekDay: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    };
  },
  mounted() {
    this.fetchDataForAllMonths();
  },
  methods: {
    async fetchDataForAllMonths() {
      const tempDaysByMonth: MonthData[] = [];
      for (let i = 0; i < this.months.length; i++) {
        try {
          const response = await axios.get(
            `https://production-calendar.ru/get-period/9e9ddd55d4f208e93c9e26ebeb9bd8e6/ru/${this.months[i]}.2024/json`,
          );
          tempDaysByMonth[i] = response.data as MonthData;
        } catch (error) {
          console.error(`Error fetching data for month ${this.months[i]}`, error);
        }
      }
      this.daysByMonth = tempDaysByMonth;
      console.log(this.daysByMonth);
    },
    getMonthName(index: number) {
      return this.monthNames[index];
    },
    getDayFromDateString(dateString: string) {
      if (dateString.startsWith('0')) {
        return dateString.split('.')[0].slice(1);
      } else {
        return dateString.split('.')[0];
      }
    },
    getEmptyDaysCount(firstDayWeekDay: string) {
      const dayIndex = this.weekDay.indexOf(firstDayWeekDay);
      return dayIndex === -1 ? 0 : dayIndex;
    },
  },
});
</script>

<style lang="scss" scoped>
.calendar-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  &__list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__list-item {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: aqua;
      cursor: pointer;
    }

    &-empty {
      user-select: none;
      pointer-events: none;
    }

    &-active {
      background-color: bisque;
    }
  }
}
</style>
