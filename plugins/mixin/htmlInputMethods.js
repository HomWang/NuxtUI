// Html input methods
// html input的方法
const htmlInputMethods = {
  methods: {
    blur() {
      this.$el.blur()
    },
    click() {
      this.$el.click()
    },
    focus() {
      this.$el.focus()
    },
    select() {
      this.$el.select()
    },
    setSelectionRange() {
      this.$el.setSelectionRange()
    },
    setRangeText() {
      this.$el.setRangeText()
    }
  }
}

export default htmlInputMethods
