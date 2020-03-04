import {
  shallowMount
} from '@vue/test-utils'
import NIcon from '@/components/NIcon.vue'

describe('NIcon', () => {
  it('it renders the icon', () => {
    const wrapper = shallowMount(NIcon)
    expect(wrapper.contains('i')).toBe(true)
  })
})
