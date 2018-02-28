<template lang="pug">
  div#app
    h1 Калькулятор по трудовой теории стоимости
    div.container
      el-row(type="flex", :gutter="20")
        el-col(:span="10")
          el-card
            div(slot="header")
              span.card-header Исходные данные
            div.parameter-line
              p.parameter-name Период в неделях:
              el-input-number(size="mini" v-model="weeks" v-bind:min="1")
              span(v-bind:class="{ 'difference--change': weeksDif[0] === '-' || weeksDif[0] === '+' }").difference {{ weeksDif }}
            div.parameter-line
              p.parameter-name Рабочих дней в неделю:
              el-input-number(size="mini" v-model="days" v-bind:min="1" v-bind:max="7")
              span(v-bind:class="{ 'difference--change': daysDif[0] === '-' || daysDif[0] === '+' }").difference {{ daysDif }}
            div.parameter-line
              p.parameter-name Рабочих часов в день:
              el-input-number(size="mini" v-model="hours" v-bind:min="1" v-bind:max="24")
              span(v-bind:class="{ 'difference--change': hoursDif[0] === '-' || hoursDif[0] === '+' }").difference {{ hoursDif }}
            div.parameter-line
              p.parameter-name Количество работников:
              el-input-number(size="mini" v-model="workers" v-bind:min="1")
              span(v-bind:class="{ 'difference--change': workersDif[0] === '-' || workersDif[0] === '+' }").difference {{ workersDif }}
            div.parameter-line
              p.parameter-name Средняя производительность труда работника (изделий/час):
              el-input-number(size="mini" v-model="productivity" v-bind:min="0.0001")
              span(v-bind:class="{ 'difference--change': productivityDif[0] === '-' || productivityDif[0] === '+' }").difference {{ productivityDif }}
            div.parameter-line
              p.parameter-name Издержки постоянного капитала на изделие (₽):
              el-input-number(size="mini" v-model="constantPerProduct" v-bind:min="0")
              span(v-bind:class="{ 'difference--change': constantPerProductDif[0] === '-' || constantPerProductDif[0] === '+' }").difference {{ constantPerProductDif }}
            div.parameter-line
              p.parameter-name Средняя зарплата работника (₽/час):
              el-input-number(size="mini" v-model="salary" v-bind:min="1")
              span(v-bind:class="{ 'difference--change': salaryDif[0] === '-' || salaryDif[0] === '+' }").difference {{ salaryDif }}
            div.parameter-line
              p.parameter-name Средняя интенсивность труда работника (₽/час):
              el-input-number(size="mini" v-model="intensity" v-bind:min="1")
              span(v-bind:class="{ 'difference--change': intensityDif[0] === '-' || intensityDif[0] === '+' }").difference {{ intensityDif }}
        el-col(:span="14")
          el-card
            div(slot="header").button-header
              span.card-header Итого за период
              el-button(@click="compare()").button {{ memory ? 'Cбросить' : 'Сравнить' }}
            div.result.result--capitalist
              div.parameter-line
                p Всего выпущено: {{ count.toLocaleString('ru', format) }}  {{ pluralize(count, 'изделие', 'изделия', 'изделий') }}
                  span(v-bind:class="{ 'difference--good': countDif[0] === '+', 'difference--bad': countDif[0] === '-' }").difference {{ countDif }}
              div.parameter-line
                p Общая стоимость: {{ total.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': totalDif[0] === '+', 'difference--bad': totalDif[0] === '-' }").difference {{ totalDif }}
              div.parameter-line
                p Стоимость одного изделия: {{ price.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': priceDif[0] === '-', 'difference--bad': priceDif[0] === '+' }").difference {{ priceDif }}
              div.parameter-line
                p Издержки постоянного капитала: {{ constant.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': constantDif[0] === '-', 'difference--bad': constantDif[0] === '+' }").difference {{ constantDif }}
              div.parameter-line
                p Издержки переменного капитала: {{ variable.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': variableDif[0] === '-', 'difference--bad': variableDif[0] === '+' }").difference {{ variableDif }}
              div.parameter-line
                p Всего издержек: {{ costs.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': costsDif[0] === '-', 'difference--bad': costsDif[0] === '+' }").difference {{ costsDif }}
              div.parameter-line
                p Органическое строение капитала: {{ organic.toLocaleString('ru', format) }}
                  span(v-bind:class="{ 'difference--good': organicDif[0] === '+', 'difference--bad': organicDif[0] === '-' }").difference {{ organicDif }}
              div.parameter-line
                p Прибавочный продукт: {{ addedProduct.toLocaleString('ru', format) }} {{ pluralize(addedProduct, 'изделие', 'изделия', 'изделий') }}
                  span(v-bind:class="{ 'difference--good': addedProductDif[0] === '+', 'difference--bad': addedProductDif[0] === '-' }").difference {{ addedProductDif }}
              div.parameter-line
                p Прибавочная стоимость: {{ added.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': addedDif[0] === '+', 'difference--bad': addedDif[0] === '-' }").difference {{ addedDif }}
              div.parameter-line
                p Норма прибавочной стоимости: {{ addedRate.toLocaleString('ru', format) }}%
                  span(v-bind:class="{ 'difference--good': addedRateDif[0] === '+', 'difference--bad': addedRateDif[0] === '-' }").difference {{ addedRateDif }}
              div.parameter-line
                p Норма прибыли: {{ returnRate.toLocaleString('ru', format) }}%
                  span(v-bind:class="{ 'difference--good': returnRateDif[0] === '+', 'difference--bad': returnRateDif[0] === '-' }").difference {{ returnRateDif }}
            div.result.result--worker
              div.parameter-line.parameter-line
                p Рабочее время: {{ time.toLocaleString('ru', format) }} {{ pluralize(time, 'час', 'часа', 'часов') }}
                  span(v-bind:class="{ 'difference--good': timeDif[0] === '-', 'difference--bad': timeDif[0] === '+' }").difference {{ timeDif }}
              div.parameter-line
                p Cтоимость, созданная работником: {{ work.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': workDif[0] === '-', 'difference--bad': workDif[0] === '+' }").difference {{ workDif }}
              div.parameter-line
                p Доходы работника: {{ workerIncome.toLocaleString('ru', format) }} ₽
                  span(v-bind:class="{ 'difference--good': workerIncomeDif[0] === '+', 'difference--bad': workerIncomeDif[0] === '-' }").difference {{ workerIncomeDif }}
              div.parameter-line
                p Реальное содержание доходов: {{ workerIncomeReal.toLocaleString('ru', format) }} {{ pluralize(workerIncomeReal, 'изделие', 'изделия', 'изделий') }}
                  span(v-bind:class="{ 'difference--good': workerIncomeRealDif[0] === '+', 'difference--bad': workerIncomeRealDif[0] === '-' }").difference {{ workerIncomeRealDif }}

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      weeks: 4,
      days: 5,
      hours: 8,
      constantPerProduct: 20,
      workers: 100,
      salary: 100,
      productivity: 10,
      intensity: 200,
      memory: null,
      format: { maximumFractionDigits: 2 }
    };
  },
  computed: {
    weeksDif() {
      return this.getDifference('weeks');
    },
    daysDif() {
      return this.getDifference('days');
    },
    hoursDif() {
      return this.getDifference('hours');
    },
    constantPerProductDif() {
      return this.getDifference('constantPerProduct');
    },
    workersDif() {
      return this.getDifference('workers');
    },
    productivityDif() {
      return this.getDifference('productivity');
    },
    salaryDif() {
      return this.getDifference('salary');
    },
    intensityDif() {
      return this.getDifference('intensity');
    },
    totalDif() {
      return this.getDifference('total');
    },
    countDif() {
      return this.getDifference('count');
    },
    priceDif() {
      return this.getDifference('price');
    },
    constantDif() {
      return this.getDifference('constant');
    },
    variableDif() {
      return this.getDifference('variable');
    },
    costsDif() {
      return this.getDifference('costs');
    },
    organicDif() {
      return this.getDifference('organic');
    },
    addedProductDif() {
      return this.getDifference('addedProduct');
    },
    addedDif() {
      return this.getDifference('added');
    },
    addedRateDif() {
      return this.getDifference('addedRate');
    },
    returnRateDif() {
      return this.getDifference('returnRate');
    },
    timeDif() {
      return this.getDifference('time');
    },
    workerIncomeDif() {
      return this.getDifference('workerIncome');
    },
    workerIncomeRealDif() {
      return this.getDifference('workerIncomeReal');
    },
    workDif() {
      return this.getDifference('work');
    },
    time() {
      return this.weeks * this.days * this.hours;
    },
    count() {
      return this.time * this.workers * this.productivity;
    },
    variable() {
      return this.time * this.workers * this.salary;
    },
    constant() {
      return this.constantPerProduct * this.count;
    },
    costs() {
      return this.constant + this.variable;
    },
    addedProduct() {
      return this.added / this.price;
    },
    added() {
      return this.time * this.workers * this.intensity - this.variable;
    },
    total() {
      return this.costs + this.added;
    },
    price() {
      return this.total / this.count;
    },
    addedRate() {
      return 100 * this.added / this.variable;
    },
    returnRate() {
      return 100 * this.added / this.costs;
    },
    workerIncome() {
      return this.time * this.salary;
    },
    workerIncomeReal() {
      return this.workerIncome / this.price;
    },
    organic() {
      return this.constant / this.variable;
    },
    work() {
      return this.intensity * this.time;
    }
  },
  methods: {
    getDifference(key) {
      if (!this.memory) return '';
      let value = this[key] - this.memory[key];
      let percent = 100 * this[key] / this.memory[key];
      return (value > 0 ? '+' : '') +
        (value ? value.toLocaleString('ru', this.format) + ' \u00A0 ' : '') +
        percent.toLocaleString('ru', this.format) + '%';
    },
    compare() {
      if (this.memory === null) {
        this.memory = {};
        this.memory.weeks = this.weeks;
        this.memory.days = this.days;
        this.memory.hours = this.hours;
        this.memory.constantPerProduct = this.constantPerProduct;
        this.memory.workers = this.workers;
        this.memory.productivity = this.productivity;
        this.memory.intensity = this.intensity;
        this.memory.salary = this.salary;
        this.memory.price = this.price;
        this.memory.count = this.count;
        this.memory.total = this.total;
        this.memory.constant = this.constant;
        this.memory.variable = this.variable;
        this.memory.costs = this.costs;
        this.memory.organic = this.organic;
        this.memory.added = this.added;
        this.memory.addedProduct = this.addedProduct;
        this.memory.addedRate = this.addedRate;
        this.memory.returnRate = this.returnRate;
        this.memory.time = this.time;
        this.memory.workerIncome = this.workerIncome;
        this.memory.workerIncomeReal = this.workerIncomeReal;
        this.memory.work = this.work;
      } else {
        this.memory = null;
      }
    },
    pluralize(number, first, second, third) {
      let num = number % 10;

      if (num === 1) return first;
      if (num >= 0.005 && num % Math.floor(num) !== 0) return second;
      if (num > 1 && num < 5) return second;
      return third;
    }
  }
};

</script>

<style lang="stylus">
  body
    margin 0
    font-family "Helvetica Neue", Helvetica
    color #303133

  *
    box-sizing border-box
    margin 0

  #app
    padding 16px
    font-family "Helvetica Neue", Helvetica
    font-size 14px
    line-height 24px

  h1, h2, h3
    font-weight 400

  h1
    font-size 20px
    line-height 32px
    margin-top 16px
    margin-bottom 24px
    text-align center

  .container
    margin 0 auto
    max-width 1200px
    min-width 960px

  .card-header
    font-weight 700
    font-size 16px

  .parameter-line + .parameter-line
    margin-top 8px

  .parameter-name
    margin-bottom 4px

  .difference
    margin-left 16px
    font-size 14px
    line-height 24px
    color #909399
    vertical-align top

  .difference--good
    color #67C23A

  .difference--bad
    color #F56C6C

  .difference--change
    color #E6A23C

  .button-header
    position relative

  .button
    position absolute
    right 0
    top -8px

  .result
    min-height 120px
    background-size 120px 120px
    background-position top right
    background-repeat no-repeat
    &--capitalist
      background-image url('./assets/capitalist.png')
    &--worker
      background-image url('./assets/worker.png')

  .result + .result
    margin-top 36px
</style>
